'use client'
import '@fontsource-variable/exo-2';
import '@fontsource-variable/fira-code';
import '@fontsource-variable/saira';
import '@fontsource/source-sans-pro';
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
import './markdown.css';


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

const Chatbot: React.FC<ChatbotProps> = ({
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showEditGraphButton, setShowEditGraphButton] = useState(false);
  const [isAnyMessageLoading, setIsAnyMessageLoading] = useState(false);

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
  useEffect(() => {
    scrollToBottom();
    setIsAnyMessageLoading(messages.some((message: Message) => message.loading));
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isAnyMessageLoading) {
      sendMessage();
      event.preventDefault();
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = { text: newMessage, user: humanUser };
    const loadingMessage: Message = { loading: true, text: 'Asking the server...', user: botUser };

    setMessages((prevMessages: Message[]) => [...prevMessages, userMessage, loadingMessage]);
    setNewMessage('');

    try {
      const response = await fetch(apiConfig?.apiQueryEndpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `${newMessage}` }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const botMessageData = await response.json();

      const botMessage: Message = {
        text: botMessageData.body,
        user: botUser,
        graphData: botMessageData.result_data,
      };

      setMessages((prevMessages: Message[]) => {
        const newMessages = [...prevMessages];
        newMessages.pop();
        newMessages.push(botMessage);
        return newMessages;
      });
    } catch (error) {
      const message = (error as Error).message;
      setMessages((prevMessages: Message[]) => {
        const newMessages = prevMessages.slice(0, -1);
        const errorMessage: Message = { text: message, user: botUser };
        return [...newMessages, errorMessage];
      });
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
          <List sx={{
            maxWidth: '70%',
            margin: '0 auto',
          }}>
            {messages.map((message: Message, index: number) => (
              <ListItem key={index} sx={{ display: 'flex', flexDirection: message.user === botUser ? 'row' : 'row-reverse', marginBottom: '1rem' }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Avatar
                    sx={{
                      marginRight: message.user === botUser ? '1rem' : '0',
                      marginLeft: message.user === humanUser ? '1rem' : '0',
                      ...themeConfig?.components?.Avatar?.style,
                    }}
                    src={message.user === botUser ? themeConfig?.components?.Avatar?.botAvatarUrl : themeConfig?.components?.Avatar?.userAvatarUrl}
                  />
                  {message.user == botUser ?
                    <Box sx={{
                      display: 'flex',
                      overflow: 'auto',
                    }}>
                      <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#090909',
                            alignItems: 'center',
                            overflow: 'hidden',
                            margin: '1rem',
                            borderRadius: '1rem',
                          }}
                        >
                          <IconButton
                            sx={{
                              position: 'fixed',
                              top: '1rem',
                              right: '2rem',
                              color: '#ebdbb2',
                              '&:hover': {
                                color: 'red',
                              },
                            }}
                          >
                            <Close onClick={handleCloseDialog} />
                          </IconButton>
                          <Box
                            sx={{
                              display: 'flex',
                              margin: '1rem',
                            }}
                          >
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>Raw data (table)</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <MuiTable data={message.graphData} />
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              height: '90%',
                              width: '90%',
                            }}
                          >
                            <TradingViewChart data={message.graphData} />
                          </Box>
                        </Box>
                      </Dialog>
                      <Card
                        sx={{
                          width: 'fit-content',
                          height: 'fit-content',
                          p: '0.8rem',
                          borderRadius: '0.8rem',
                        }}
                      >
                        <CardContent
                          sx={{
                            padding: 0,
                            '&:last-child': { paddingBottom: 0 },
                          }}
                        >
                          <ApiTextParser text={message.text} />
                          {message.graphData &&
                            <MuiTable data={message.graphData} />
                          }
                        </CardContent>
                      </Card>
                      {message.graphData && (
                        <Button
                          onClick={handleOpenDialog}
                        >
                          <Brush fontSize="small" sx={{
                            color: '#ebdbb2',
                            borderColor: '#ebdbb2',
                          }} />
                        </Button>
                      )}
                    </Box>
                    :
                    <Box
                      sx={themeConfig?.components?.MessageBubbleUser}
                    >
                      {message.text}
                    </Box>
                  }
                </Suspense>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
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
              onClick={sendMessage}
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

export default Chatbot;
