import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, List, ListItem, Card, CardContent, Typography, CircularProgress, Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BsRobot, BsTerminal } from 'react-icons/bs';

import { gruvboxTheme } from '../theme/Theme';

/* STYLES */

const useStyles = makeStyles({
  userCard: {
    margin: '10px',
    textAlign: 'right'
  },
  progress: {
    alignSelf: 'flex-start'
  },
  chatArea: {
    height: 'calc(100vh - 100px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '10px'
    },
    '&::-webkit-scrollbar-track': {
      background: gruvboxTheme.palette.background.paper,
    },
    '&::-webkit-scrollbar-thumb': {
      background: gruvboxTheme.palette.text.primary,
      borderRadius: '5px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: gruvboxTheme.palette.text.secondary,
    }
  },
  avatar: {
    backgroundColor: '#c3c3c3',
    margin: '5px'
  },
});

/* COMPONENT */

const Chatbot = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { text: newMessage, user: 'Me' }, { loading: true }]);
      setNewMessage('');

      const botResponse = `You said: ${newMessage}`;

      let botMessageIndex = messages.length + 1;
      let i = 0;

      const typingInterval = setInterval(() => {
        if (i < botResponse.length) {
          let newMessages = [...messages, { text: newMessage, user: 'Me' }, { text: botResponse.slice(0, i+1), user: 'Bot' }];
          setMessages(newMessages);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 10);
    }
  };

  return (
    <div>
      <Box display="flex" flexDirection="column-reverse" className={classes.chatArea}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} style={{ flexDirection: message.user === 'Me' ? 'row-reverse' : 'row' }}>
              {message.user === 'Bot' && (
                <Avatar className={classes.avatar}>
                  <BsRobot />
                </Avatar>
              )}
              {message.loading ? (
                <CircularProgress className={classes.progress} />
              ) : (
                <Card className={message.user === 'Me' ? classes.userCard : classes.botCard}>
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {message.text}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box sx={{ position: "fixed", right: "0", bottom: "3%", left: "0"}} >
        <TextField
          value={newMessage}
          onChange={event => setNewMessage(event.target.value)}
          label="Specify your message here"
          sx={{ width: "50%"}}
        />
        <Button variant="contained" color="primary" onClick={sendMessage} sx={{ m: 1 }}>Send</Button>
        <Button variant="contained" color="primary" onClick={sendMessage} sx={{ m: 1 }}>
          <BsTerminal size={24}/>
        </Button>
      </Box>
    </div>
  );
}

export default Chatbot;
