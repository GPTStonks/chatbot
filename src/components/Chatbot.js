import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { BsPersonCircle, BsRobot } from 'react-icons/bs';

import ReactMarkdown from 'react-markdown';
import { API_DEFAULT_PORT, API_DEFAULT_URL, NOTHING_RETURNED } from '../constants/API';
import { chatbotZIndex, gruvboxTheme } from '../theme/Theme';
import GruvboxGraph from './Graph';
import UsefulCommands from './UsefulCommands';

/* STYLES */

const useStyles = makeStyles({
  userCard: {
    margin: '10px',
    textAlign: 'right',
    width: 'fit-content',
  },
  botCard: {
    width: 'fit-content',
    height: 'fit-content',
    maxWidth: '40vw',
    margin: '10px',
  },
  progress: {
    alignSelf: 'flex-start',
    marginTop: 5,
    scale: 0.75,
  },
  chatArea: {
    height: 'calc(100vh - 100px)',
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
  },
  avatar: {
    margin: '5px',
  },
});

/* CONSTANTS */

const botUser = 'Bot';
const humanUser = 'Me';

/* COMPONENT */

const Chatbot = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const parseNewsText = (text) => {
    const formattedText = text.replace(/\n/g, '<br>');
    const formattedTextWithQuotes = formattedText.replace(/'/g, '"');

    const formattedTextWithLinks = formattedTextWithQuotes.replace(
      /\[link\]\((.*?)\)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
    );

    return <div dangerouslySetInnerHTML={{ __html: formattedTextWithLinks }} />;
  };

  const parseApiText = (text) => {
    const apiMessage = text;

    const apiMessageLines = apiMessage.split('\n');

    const customLinkStyle = {
      color: gruvboxTheme.palette.success.main,
      textDecoration: 'none',
    };
    return (
      <div>
        {apiMessageLines.map((line, index) => (
          <ReactMarkdown
            key={index}
            components={{
              a: ({ node, ...props }) => (
                <a
                  href={props.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-link"
                  style={customLinkStyle}
                >
                  {props.children}
                </a>
              ),
            }}
          >
            {line.replace(/\\n/g, '\n').replace(/"/g, '')}
          </ReactMarkdown>
        ))}
      </div>
    );
  };

  return (
    <>
      <img
        src="/logo.png"
        alt="logo"
        style={{ position: 'absolute', left: '1.5%', top: '2%', width: '200px' }}
      />
      <Divider
        orientation="vertical"
        style={{ backgroundColor: '#ebdbb2' }}
        sx={{ position: 'absolute', left: '17vw', height: '95vh', m: 3 }}
      />

      <UsefulCommands />
      <Box
        sx={{
          position: 'absolute',
          width: '78vw',
          right: 0,
          zIndex: chatbotZIndex,
          backgroundColor: gruvboxTheme.palette.background.default,
        }}
      >
        <Box display="flex" flexDirection="column-reverse" className={classes.chatArea}>
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                style={{ flexDirection: message.user === humanUser ? 'row-reverse' : 'row' }}
              >
                <Avatar
                  className={classes.avatar}
                  sx={{
                    color: gruvboxTheme.palette.background.default,
                    backgroundColor: gruvboxTheme.scrollBar.main,
                  }}
                >
                  {message.user === humanUser ? (
                    <BsPersonCircle size={24} />
                  ) : (
                    <BsRobot size={24} />
                  )}
                </Avatar>
                {message.loading ? (
                  <CircularProgress className={classes.progress} />
                ) : (
                  <Card className={message.user === humanUser ? classes.userCard : classes.botCard}>
                    <CardContent>
                      <Typography variant="body2" component="p">
                        {parseApiText(message.text)}
                      </Typography>
                      {message.user === botUser && message.graphData && (
                        <GruvboxGraph apiData={message.graphData} />
                      )}
                    </CardContent>
                  </Card>
                )}
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Box sx={{ position: 'fixed', right: '0', bottom: '3%', left: '0' }}>
          <TextField
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            label="Specify your message here"
            sx={{ width: '50%' }}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" color="primary" onClick={sendMessage} sx={{ m: 1 }}>
            Send
          </Button>
          {/* <Button variant="contained" color="primary" onClick={sendMessage} sx={{ m: 1 }}>
          <BsTerminal size={24}/>
        </Button> */}
        </Box>
      </Box>
    </>
  );
};

export default Chatbot;
