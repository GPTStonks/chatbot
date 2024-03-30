'use client'
import '@fontsource-variable/exo-2';
import '@fontsource-variable/fira-code';
import '@fontsource-variable/saira';
import '@fontsource/source-sans-pro';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    List,
    ListItem,
    TextField,
    Typography
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import MuiTable from '../MuiTable';
import LinearBuffer from './LinearBuffer';
import './markdown.css';


interface ChatbotProps {
    className?: string;
    style?: React.CSSProperties;
    apiConfig: APIConfig;
    themeConfig: ThemeConfig;
    messageRenderFunction?: (text: string) => JSX.Element;
    dataRenderFunction?: (data: any) => JSX.Element;
}

interface APIConfig {
    isWebsocket: boolean;
    auth?: boolean;
    tokenName?: string;
    fetchFunction?: string;
    apiQueryEndpoint: string;
    queryParams?: Record<string, any>;
}

interface PaletteColor {
    main: string;
}

interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    background: { default: string; paper: string };
    text: { primary: string; secondary: string };
}

interface Typography {
    fontFamily: string;
}

interface ComponentStyle extends React.CSSProperties {
    '& img'?: React.CSSProperties;
    '& label'?: React.CSSProperties;
    '& label.Mui-focused'?: React.CSSProperties;
    '& .MuiInput-underline:after'?: React.CSSProperties;
    '& .MuiOutlinedInput-root'?: {
        '& fieldset'?: React.CSSProperties;
        '&:hover fieldset'?: React.CSSProperties;
        '&.Mui-focused fieldset'?: React.CSSProperties;
    };
    '&::-webkit-scrollbar'?: React.CSSProperties;
    '&::-webkit-scrollbar-track'?: React.CSSProperties;
    '&::-webkit-scrollbar-thumb'?: React.CSSProperties;
}

interface LoaderConfig {
    color: string;
    backgroundColor: string;
}

interface ComponentConfig {
    style?: ComponentStyle;
    label?: string;
    fullWidth?: boolean;
    hoverBackgroundColor?: string;
    appears?: boolean;
    text?: string;
    botAvatarUrl?: string;
    userAvatarUrl?: string;
    loader?: LoaderConfig;
}

interface Components {
    ChatBox?: ComponentConfig;
    LowPartBox?: ComponentConfig;
    TextField?: ComponentConfig;
    Button?: ComponentConfig;
    Disclaimer?: ComponentConfig;
    MessageBubbleBot?: ComponentConfig;
    MessageBubbleUser?: ComponentConfig;
    Avatar?: ComponentConfig;
    Divider?: ComponentConfig;
}

interface ThemeConfig {
    style: React.CSSProperties;
    palette: Palette;
    typography: Typography;
    components: Components;
}

interface Message {
    text: string;
    user: string;
    loading?: boolean;
    graphData?: any;
}

const ChatbotWebsocket: React.FC<ChatbotProps> = ({
    className,
    apiConfig,
    themeConfig,
    messageRenderFunction,
    dataRenderFunction,
}: ChatbotProps) => {

    const MessageRender = useCallback((text: string) => {
        return messageRenderFunction ? messageRenderFunction(text) : <Typography>{text}</Typography>;
    }, [messageRenderFunction]);

    const DataRender = useCallback((data: any) => {
        return dataRenderFunction ? dataRenderFunction(data) : <MuiTable data={data} />;
    }, [dataRenderFunction]);

    const humanUser = 'humanUser';
    const botUser = 'botUser';
    const customTheme = createTheme(themeConfig ? { palette: themeConfig.palette, typography: themeConfig.typography } : {});
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [botMessage, setBotMessage] = useState<Message | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isAnyMessageLoading, setIsAnyMessageLoading] = useState(false);
    const [showLinearLoader, setShowLinearLoader] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [graphData, setGraphData] = useState<any>(null);


    if (apiConfig.isWebsocket && !apiConfig.apiQueryEndpoint.startsWith('ws')) {
        throw new Error('apiQueryEndpoint should start with ws:// or wss:// for websocket');
    } else if (!apiConfig.isWebsocket && !apiConfig.apiQueryEndpoint.startsWith('http')) {
        throw new Error('apiQueryEndpoint should start with http:// or https:// for fetch');
    }

    useEffect(() => {
        if (apiConfig.auth) {
            if (!apiConfig.tokenName) {
                throw new Error('tokenName should be provided for auth');
            }
            const fetchedToken = localStorage.getItem(apiConfig.tokenName);
            setToken(fetchedToken);
        }
    }, []);

    // If it is not Websocket
    const customFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof apiConfig.fetchFunction === 'function' ? apiConfig.fetchFunction : fetch;

    const handleFetchMessage = async () => {
        if (apiConfig.auth && token) {
            const response = await customFetch(apiConfig.apiQueryEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query: newMessage }),
            } as RequestInit);

            const lastMessage = JSON.parse(await response.text());

            const botMessage = { text: lastMessage.text, user: 'botUser', loading: false };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
            const response = await customFetch(apiConfig.apiQueryEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: newMessage }),
            } as RequestInit);

            const lastMessage = JSON.parse(await response.text());

            const botMessage = { text: lastMessage.text, user: 'botUser', loading: false };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    }

    // Is Websocket
    const wsUrl = useMemo(() => {
        if (apiConfig.auth && token) {
            return `${apiConfig.apiQueryEndpoint}?token=${token}`;
        }
        return apiConfig.apiQueryEndpoint;
    }, [apiConfig.apiQueryEndpoint, apiConfig.auth, token]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(
        wsUrl,
        );

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        if (apiConfig.isWebsocket) {
            sendMessage(JSON.stringify({ query: newMessage }));
        } else {
            handleFetchMessage();
        }

        console.log('newMessage:', newMessage);
        const userMessage = { text: newMessage, user: 'humanUser', loading: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');
    };

    useEffect(() => {

        if (lastMessage !== null) {

            let messageData = JSON.parse(lastMessage.data);
            let mappedData: { [key: string]: any } = {};

            if (apiConfig.queryParams) {
                Object.entries(apiConfig.queryParams).forEach(([key, value]) => {
                    mappedData[key] = messageData[value];
                });
            }

            let body = mappedData.text;
            let type = mappedData.type;
            let data = mappedData.data;
            console.log('body:', body);
            console.log('type:', type);
            console.log('data:', data);

            if (type === 'data' && data) {
                setGraphData(data);
            }

            let queryLoading = type !== 'data';
            setIsAnyMessageLoading(queryLoading);

            if (queryLoading && type === 'model_step') {
                setBotMessage(prevBotMessage => ({
                    text: body,
                    user: 'botUser',
                    graphData: graphData,
                    loading: true
                }));
            } else if (type === 'data') {
                setShowLinearLoader(true);

                setTimeout(() => {
                    setMessages(prevMessages => [...prevMessages, { text: body, user: 'botUser', graphData: graphData, loading: false }]);
                    setShowLinearLoader(false);
                    setBotMessage(null);
                }, 3000);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, lastMessage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendMessage();
            event.preventDefault();
        }
    };

    return (
        <div className={`chatbot-default ${className}`} style={{
            ...themeConfig.style,
            //scrollbar width and color
            scrollbarWidth: 'thin',
            scrollbarColor: 'yellow',
        }}>
            <ThemeProvider theme={customTheme}>
                <Box className={`chatbot-default ${className}`}
                    sx={{
                        ...themeConfig.components?.ChatBox?.style,

                    }}>
                    <List sx={{ maxWidth: '70%', margin: '0 auto' }}>
                        {messages.map((message, index) => (
                            <ListItem key={index} sx={{ display: 'flex', flexDirection: message.user === botUser ? 'row' : 'row-reverse', marginBottom: '1rem' }}>
                                <Avatar
                                    sx={{
                                        marginRight: message.user === botUser ? '1rem' : '0',
                                        marginLeft: message.user === humanUser ? '1rem' : '0',
                                        ...themeConfig?.components?.Avatar?.style,
                                        transition: 'opacity 0.5s ease-in-out',
                                    }}
                                    src={message.user === botUser ? themeConfig?.components?.Avatar?.botAvatarUrl : themeConfig?.components?.Avatar?.userAvatarUrl}
                                />
                                <Box sx={themeConfig?.components?.MessageBubbleUser?.style}>
                                    {MessageRender(message.text)}
                                    {message.graphData && DataRender(message.graphData)}
                                </Box>

                            </ListItem>
                        ))}
                        {botMessage && isAnyMessageLoading && !showLinearLoader && (
                            <ListItem sx={{ display: 'flex', flexDirection: 'row', transition: 'opacity 0.5s ease-in-out' }}>
                                <Avatar
                                    sx={{
                                        marginRight: '1rem',
                                        ...themeConfig?.components?.Avatar?.style,
                                    }}
                                    src={themeConfig?.components?.Avatar?.botAvatarUrl}
                                />
                                <Box sx={{ ...themeConfig?.components?.MessageBubbleBot?.style }}>
                                    <DNA
                                        visible={true}
                                        height="60"
                                        width="60"
                                        ariaLabel="dna-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="dna-wrapper"
                                    />
                                    <Typography sx={{
                                        marginLeft: '1rem',
                                    }}>
                                        {botMessage.text === 'world_knowledge' ? 'Retrieving information...' : botMessage.text}
                                    </Typography>
                                </Box>

                            </ListItem>
                        )}
                        {showLinearLoader && (
                            <ListItem sx={{ display: 'flex', flexDirection: 'row', maxWidth: '30vw' }}>
                                <Avatar
                                    sx={{
                                        marginRight: '1rem',
                                        ...themeConfig?.components?.Avatar?.style,
                                    }}
                                    src={themeConfig?.components?.Avatar?.botAvatarUrl}
                                />
                                <LinearBuffer />
                            </ListItem>
                        )}
                    </List>

                    <div ref={messagesEndRef} />

                </Box>

                {themeConfig?.components?.Divider?.appears && <Divider sx={themeConfig?.components?.Divider?.style} />}

                <Box sx={themeConfig.components?.LowPartBox?.style}>
                    <TextField
                        fullWidth={themeConfig?.components?.TextField?.fullWidth || true}
                        value={newMessage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        variant="outlined"
                        size="small"
                        label={themeConfig?.components?.TextField?.label || 'Ask our chatbot!'}
                        sx={{
                            ...themeConfig?.components?.TextField?.style,
                        }}
                    />
                    {isAnyMessageLoading ? <CircularProgress sx={{ marginLeft: '1rem' }} /> :
                        <Button
                            variant="outlined"
                            onClick={handleSendMessage}
                            disabled={isAnyMessageLoading}
                            sx={{
                                marginLeft: '1rem',
                                ...themeConfig?.components?.Button?.style,
                                '&:hover': {
                                    backgroundColor: themeConfig?.components?.Button?.hoverBackgroundColor || '#b8bb26',
                                },
                            }}
                        >
                            Send
                        </Button>
                    }
                </Box>
                {themeConfig?.components?.Disclaimer?.appears && (
                    <Typography sx={themeConfig.components.Disclaimer.style}>
                        {themeConfig?.components?.Disclaimer?.text || 'This is an open-source chatbot. Have some fun and enjoy! 🚀'}
                    </Typography>
                )}

            </ThemeProvider>
        </div >
    );

};

export default ChatbotWebsocket;
