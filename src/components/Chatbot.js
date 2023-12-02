import { useTheme } from '@emotion/react';
import { Lightbulb, Send } from '@mui/icons-material';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { BsPersonCircle, BsRobot } from 'react-icons/bs';

import ReactMarkdown from 'react-markdown';
import { API_DEFAULT_PORT, API_DEFAULT_URL, NOTHING_RETURNED } from '../constants/API';
import { chatbotZIndex, gruvboxTheme } from '../theme/Theme';
import GruvboxGraph from './Graph';
import { Navbar } from './NavBar';
import Sidebar from './Sidebar';
import './loaders/loader.css';
import { EditGraphButton } from './EditGraphButton';

/* CONSTANTS */

const botUser = 'Bot';
const humanUser = 'Me';

/* COMPONENT */

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault();
    }
  }

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = { text: newMessage, user: humanUser };
      const loadingMessage = { loading: true };

      setMessages((prevMessages) => [...prevMessages, userMessage, loadingMessage]);

      setNewMessage('');

      try {
        let response = await fetch(`${API_DEFAULT_URL}:${API_DEFAULT_PORT}/process_query_async`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: newMessage, use_agent: true }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let botMessageText = await response.json();

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          let plotData = null;
          if (
            botMessageText.result_data != null &&
            Object.keys(botMessageText.result_data).length > 0 &&
            botMessageText.result_data !== NOTHING_RETURNED
          ) {
            plotData = botMessageText.result_data;
          }
          const botMessage = {
            text: JSON.stringify(botMessageText.body),
            user: botUser,
            graphData: plotData,
          };

          console.log(botMessage.graphData);

          newMessages.pop();
          newMessages.push(botMessage);

          return newMessages;
        });
      } catch (error) {
        setMessages((prevMessages) => {
          const newMessages = prevMessages.slice(0, -1);
          return [
            ...newMessages,
            { text: "Couldn't process the request. Try again.", user: botUser },
          ];
        });
      }
    }
  };
  const parseApiText = (text) => {
    const text_ = text.toString().replace(/"/g, '').replace(/\\n/g, '  \n').replace(/\\/g, '');

    if (text_.startsWith('> ')) {
      return (
        <Box
          sx={{
            backgroundColor: '#282828',
            borderLeft: '3px solid #ffa726',
            padding: '0.5em',
            margin: '0.5em 0',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('sm')]: {
              fontSize: '0.7rem',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '0.8rem',
            },
            [theme.breakpoints.up('lg')]: {
              fontSize: '0.85rem',
              maxHeight: '6vh',
            },
          }}
        >
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Lightbulb
                color="success"
                sx={{
                  fontSize: '1rem',
                }}
              ></Lightbulb>
              <Typography
                variant="body2"
                color="success"
                sx={{
                  ml: 1,
                }}
              >
                Info
              </Typography>
            </Box>
            <ReactMarkdown>{text_.replace('>', '')}</ReactMarkdown>
          </>
        </Box>
      );
    } else if (text_.startsWith('\\u001b[31m')) {
      return (
        <Box
          sx={{
            backgroundColor: '#282828',
            borderLeft: '3px solid #ffa726',
            padding: '0.5em',
            margin: '0.5em 0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <WarningIcon
                color="warning"
                sx={{
                  fontSize: '1.2rem',
                }}
              ></WarningIcon>
              <Typography
                variant="body1"
                color="success"
                sx={{
                  ml: 1,
                }}
              >
                Warning
              </Typography>
            </Box>
            <ReactMarkdown
              sx={{
                m: 0,
              }}
            >
              {text_.replace('\\u001b[31m', '').replace('\\u001b[0m', '').replace('\\nNone\\n', '')}
            </ReactMarkdown>
          </>
        </Box>
      );
    } else {
      console.log(text_);
      return (
        <Box
          sx={{
            m: 1,
          }}
        >
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
              a: ({ node, ...props }) => (
                <Link
                  {...props}
                  sx={{
                    color: theme.palette.success.main,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                />
              ),
            }}
          >
            {text_}
          </ReactMarkdown>
        </Box>
      );
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          zIndex: chatbotZIndex,
          backgroundColor: gruvboxTheme.palette.background.default,
          [theme.breakpoints.down('sm')]: {
            width: '100vw',
          },
          [theme.breakpoints.up('md')]: {
            width: '100vw',
          },
          [theme.breakpoints.up('lg')]: {
            width: '80vw',
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column-reverse"
          sx={{
            height: '80vh',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: gruvboxTheme.palette.background.paper,
            },
            '&::-webkit-scrollbar-thumb': {
              background: gruvboxTheme.palette.text.primary,
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: gruvboxTheme.palette.text.secondary,
            },
          }}
        >
          <List
            sx={{
              m: 0,
              p: 0,
            }}
          >
            {messages.map((message, index) => (
              <ListItem
                key={index}
                style={{ flexDirection: message.user === humanUser ? 'row-reverse' : 'row' }}
              >
                <Avatar
                  sx={{
                    backgroundColor:
                      message.user === humanUser ? theme.scrollBar.main : 'primary.main',
                    color: theme.palette.background.paper,
                    [theme.breakpoints.down('sm')]: {
                      width: 24,
                      height: 24,
                    },
                    [theme.breakpoints.up('md')]: {
                      width: 24,
                      height: 24,
                    },
                    [theme.breakpoints.up('lg')]: {
                      width: 34,
                      height: 34,
                    },
                  }}
                >
                  {message.user === humanUser ? <BsPersonCircle /> : <BsRobot />}
                </Avatar>

                {/* TODO: Implement loading features */}
                {message.loading ? (
                  <span className="loader"></span>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Card
                      sx={{
                        color: theme.palette.text.primary,
                        width: 'fit-content',
                        height: 'fit-content',
                        [theme.breakpoints.down('sm')]: {
                          margin: '0 0.25rem 0 0.25rem',
                          padding: '0 0.5rem 0 0.5rem',
                        },
                        [theme.breakpoints.up('md')]: {
                          margin: '0 0.5rem 0 0.5rem',
                          padding: '0 0.7rem 0 0.7rem',
                        },
                        [theme.breakpoints.up('lg')]: {
                          margin: '0 1rem 0 1rem',
                          padding: '0 1rem 0 1rem',
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          padding: 0,
                          '&:last-child': { paddingBottom: 0 },
                        }}
                      >
                        <Typography
                          sx={{
                            [theme.breakpoints.down('sm')]: {
                              fontSize: '0.7rem',
                            },
                            [theme.breakpoints.up('md')]: {
                              fontSize: '0.8rem',
                            },
                            [theme.breakpoints.up('lg')]: {
                              fontSize: '1rem',
                            },
                          }}
                        >
                          {parseApiText(message.text)}
                        </Typography>
                        {message.user === botUser && message.graphData && (
                          <GruvboxGraph apiData={message.graphData} />
                        )}
                      </CardContent>
                    </Card>
                    {/*                     <EditGraphButton data={message.graphData} headers={''} columnsInView={''} setColumnsInView={''}/> */}
                  </Box>
                )}
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            right: 0,
            bottom: '3%',
            left: 0,
            alignItems: 'center',
            maxHeight: '8vh',
          }}
        >
          <TextField
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            label="Write your message here"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              [theme.breakpoints.down('sm')]: {
                width: '75%',
                fontSize: '0.4rem',
              },
              [theme.breakpoints.up('md')]: {
                width: '75%',
              },
              [theme.breakpoints.up('lg')]: {
                width: '50%',
              },
            }}
            onKeyDown={handleKeyDown}
          />
          {!isMobile ? (
            <Button variant="contained" color="primary" onClick={sendMessage} sx={{ ml: 1 }}>
              Send
            </Button>
          ) : (
            <IconButton
              onClick={sendMessage}
              size="small"
              sx={{
                ml: 1,
                backgroundColor: 'primary',
                color: theme.scrollBar.main,
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              <Send />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Chatbot;
