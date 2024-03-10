import { useTheme } from '@emotion/react';
import { Brush, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  IconButton,
  List,
  ListItem,
  useMediaQuery
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { NOTHING_RETURNED } from '../../constants/API';
import MuiTable from '../MuiTable';
import { CustomAvatar } from '../custom/CustomAvatar';
import '../loaders/loader.css';
import ApiTextParser from './ApiTextParser';
import CommandTextfield from './CommandTextfield';
import './markdown.css';

/* CONSTANTS */

const botUser = 'Bot';
const humanUser = 'Me';

/* COMPONENT */

const Chatbot = ({ chat_background_color, bot_avatar, user_avatar, chat_text_color, api_query_endpoint = "" }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isAnyMessageLoading, setIsAnyMessageLoading] = useState(false);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault();
    }
  }

  useEffect(() => {
    scrollToBottom();
    const loading = messages.some((message) => message.loading);
    setIsAnyMessageLoading(loading);
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = { text: newMessage, user: humanUser };
      const loadingMessage = { loading: true };

      setMessages((prevMessages) => [...prevMessages, userMessage, loadingMessage]);

      setNewMessage('');

      try {
        let response = await fetch(`${api_query_endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: newMessage, use_agent: true }),
        });

        if (response.status === 429) {
          throw new Error('Exceeded the allowed number of queries. Please wait and try again.');
        }

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

          newMessages.pop();
          newMessages.push(botMessage);

          return newMessages;
        });
      } catch (error) {
        const errorMessage = error.message.includes('Exceeded the allowed number of queries')
          ? '⚠️ Exceeded the allowed number of queries ⚠️\n\n Wait some minutes and try again. We do our best, sorry!'
          : "Couldn't process the request. Try again.";

        setMessages((prevMessages) => {
          const newMessages = prevMessages.slice(0, -1);
          return [...newMessages, { text: errorMessage, user: botUser }];
        });
      }
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          alignContent: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          display="flex"
          flexDirection="column-reverse"
          sx={{
            height: '80vh',
            overflowY: 'scroll',
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
                <CustomAvatar message={message} humanUser={humanUser} theme={theme} />

                {message.loading ? (
                  <span className="loader"></span>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    {message.user === botUser && message.graphData && (
                      <>
                        <Button
                          sx={{
                            position: 'absolute',
                            transform: 'translate(100%, -50%)',
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.success.main,
                            [theme.breakpoints.down('sm')]: {
                              right: 0,
                              top: '0.8rem',
                              width: '1.5rem',
                              height: '1.5rem',
                              minWidth: '1.5rem',
                              minHeight: '1.5rem',
                              fontSize: '0.5rem',
                            },
                            [theme.breakpoints.up('md')]: {
                              right: 0,
                              top: '1rem',
                              width: '2rem',
                              minWidth: '2rem',
                              fontSize: '0.7rem',
                            },
                            [theme.breakpoints.up('lg')]: {
                              right: '0.3rem',
                              top: '1rem',
                              width: '2.5rem',
                              minWidth: '2.5rem',
                              fontSize: '1rem',
                            },
                          }}
                          onClick={handleOpenDialog}
                        >
                          <Brush fontSize="small" />
                        </Button>
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
                              backgroundColor: theme.palette.background.darker,
                              alignItems: 'center',
                              overflowY: 'scroll',
                              overflowX: 'hidden',
                              margin: '1rem',
                            }}
                          >
                            <IconButton
                              sx={{
                                position: 'fixed',
                                top: '1rem',
                                right: '1rem',
                                color: theme.palette.success.main,
                              }}
                            >
                              <Close onClick={handleCloseDialog} />
                            </IconButton>
                          </Box>
                        </Dialog>
                      </>
                    )}
                    <Card
                      sx={{
                        color: theme.palette.text.primary,
                        width: 'fit-content',

                        height: 'fit-content',
                        [theme.breakpoints.down('sm')]: {
                          maxWidth: '70vw',
                          margin: '0 0.25rem 0 0.25rem',
                          padding: '0 0.5rem 0 0.5rem',
                        },
                        [theme.breakpoints.up('md')]: {
                          maxWidth: '50vw',
                          margin: '0 0.5rem 0 0.5rem',
                          padding: '0 0.7rem 0 0.7rem',
                        },
                        [theme.breakpoints.up('lg')]: {
                          maxWidth: '50vw',
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
                        <ApiTextParser text={message.text} />
                        {message.user === botUser && message.graphData && (
                          <MuiTable data={message.graphData} />
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                )}
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        <CommandTextfield
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
          isMobile={isMobile}
          disableButtonClick={isAnyMessageLoading}
        />
      </Box>
    </>
  );
};

export default Chatbot;
