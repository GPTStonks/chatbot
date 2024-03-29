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
    messageRender?: (message: Message, index: number) => JSX.Element;
}

interface APIConfig {
    fetchFunction: string;
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
    messageRender = () => <div />,
}: ChatbotProps) => {
    const humanUser = 'humanUser';
    const botUser = 'botUser';
    const customTheme = createTheme(themeConfig ? { palette: themeConfig.palette, typography: themeConfig.typography } : {});
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [botMessage, setBotMessage] = useState<Message | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [showEditGraphButton, setShowEditGraphButton] = useState(false);
    const [isAnyMessageLoading, setIsAnyMessageLoading] = useState(false);
    const [showLinearLoader, setShowLinearLoader] = useState(false);

    const socketUrl = 'ws://localhost:8000/chatws';
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const handleDownloadClick = () => {
        setShowEditGraphButton(true);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        sendMessage(newMessage);
        console.log('newMessage:', newMessage);
        const userMessage = { text: newMessage, user: 'humanUser', loading: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendMessage();
            event.preventDefault();
        }
    };

    useEffect(() => {

        if (lastMessage !== null) {
            let messageData = JSON.parse(lastMessage.data);
            let body = messageData.body;
            let isLoading = messageData.loading;
            setIsAnyMessageLoading(isLoading);

            if (isLoading) {
                setBotMessage(prevBotMessage => ({
                    text: body,
                    user: 'botUser',
                    loading: true
                }));
            } else if (!isLoading && !showLinearLoader) {
                setShowLinearLoader(true);
            } else {
                setShowLinearLoader(false);
                setMessages(prevMessages => [...prevMessages, { text: body, user: 'botUser', loading: false }]);
                setBotMessage(null);
            }
        }
    }, [lastMessage, showLinearLoader]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                                    }}
                                    src={message.user === botUser ? themeConfig?.components?.Avatar?.botAvatarUrl : themeConfig?.components?.Avatar?.userAvatarUrl}
                                />
                                <Box sx={themeConfig?.components?.MessageBubbleUser}>
                                    {message.text}
                                </Box>
                            </ListItem>
                        ))}
                        {botMessage && isAnyMessageLoading && !showLinearLoader && (
                            <ListItem sx={{ display: 'flex', flexDirection: 'row' }}>
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
                                        {botMessage.text}
                                    </Typography>
                                </Box>


                            </ListItem>
                        )}
                        {showLinearLoader && (
                            <LinearBuffer />
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
