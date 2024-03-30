'use client'
import '@fontsource-variable/exo-2';
import '@fontsource-variable/fira-code';
import '@fontsource-variable/saira';
import '@fontsource/source-sans-pro';
import { useCallback } from 'react';
import { Brush, Close } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    TextField,
    Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import MuiTable from '../MuiTable';
import ApiTextParser from './ApiTextParser';
import { TradingViewChart } from './TradingViewChart';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './markdown.css';
import { DNA } from 'react-loader-spinner';
import LinearBuffer from './LinearBuffer';


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
    fetchFunction?: string;
    apiQueryEndpoint: string;
    queryParams?: Record<string, any>;
}

interface ThemeConfig {
    style?: React.CSSProperties;
    palette?: {
        primary?: { main: string };
        secondary?: { main: string };
        error: { main: string };
        warning: { main: string };
        info: { main: string };
        success: { main: string };
        background: { default: string; paper: string };
        text: { primary: string; secondary: string };
    };
    typography?: { fontFamily?: string };
    components?: {
        ChatBox?: React.CSSProperties;
        LowPartBox?: React.CSSProperties;
        TextField?: { label?: string, fullWidth?: boolean, style?: React.CSSProperties };
        Button?: { style: React.CSSProperties, hoverBackgroundColor: string };
        Disclaimer?: { appears?: boolean, text: string, style: React.CSSProperties };
        Avatar?: { botAvatarUrl?: string; userAvatarUrl?: string, style?: React.CSSProperties };
        MessageBubbleBot?: React.CSSProperties;
        MessageBubbleUser?: React.CSSProperties;
        Divider?: { appears?: boolean; style?: React.CSSProperties };
    };
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


    if (apiConfig.isWebsocket && !apiConfig.apiQueryEndpoint.startsWith('ws')) {
        throw new Error('apiQueryEndpoint should start with ws:// or wss:// for websocket');
    } else if (!apiConfig.isWebsocket && !apiConfig.apiQueryEndpoint.startsWith('http')) {
        throw new Error('apiQueryEndpoint should start with http:// or https:// for fetch');
    }

    useEffect(() => {
        const fetchedToken = localStorage.getItem('token');
        setToken(fetchedToken);
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
    let wsUrl = '';
    if (apiConfig.auth && token) {
        wsUrl = `${apiConfig.apiQueryEndpoint}?token=${token}`;
    } else {
        wsUrl = apiConfig.apiQueryEndpoint;
    }
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        wsUrl,
        {
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 10,
            reconnectInterval: 1000,
        });
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

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
            let queryLoading = type !== 'data';
            setIsAnyMessageLoading(queryLoading);

            if (queryLoading && type === 'model_step') {
                setBotMessage(prevBotMessage => ({
                    text: body,
                    user: 'botUser',
                    loading: true
                }));
            } else if (type === 'data') {
                setShowLinearLoader(true);

                setTimeout(() => {
                    setMessages(prevMessages => [...prevMessages, { text: body, user: 'botUser', loading: false }]);
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
                        ...themeConfig.components?.ChatBox,

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
                                <Box sx={themeConfig?.components?.MessageBubbleUser}>
                                    {MessageRender(message.text)}
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
                                <Box sx={{ ...themeConfig?.components?.MessageBubbleBot }}>
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

                <Box sx={themeConfig.components?.LowPartBox}>
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
