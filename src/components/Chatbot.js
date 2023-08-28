import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, List, ListItem, Card, CardContent, Typography, CircularProgress, Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BsRobot, BsTerminal } from 'react-icons/bs';

import { gruvboxTheme } from '../theme/Theme';
import GruvboxGraph from './Graph';
import { sentimentData } from '../const';

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

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = { text: newMessage, user: 'Me' };
      const loadingMessage = { loading: true };

      setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

      setNewMessage('');

      try {
        let response = await fetch('http://localhost:8000/process_query_async', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: newMessage })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const jobId = data.job_id;
        console.log(data);
        console.log(jobId);

        let botMessageText;

        while (true) {
          response = await fetch(`http://localhost:8000/get_processing_result/${jobId}`);
          const resultData = await response.json();

          console.log(`Status: ${resultData.status}`);
          console.log(`Result: ${JSON.stringify(resultData.result)}`);

          if (resultData.status === "completed") {
            botMessageText = JSON.stringify(resultData.result.result) || resultData.result.error;
            break;
          }

          await new Promise(resolve => setTimeout(resolve, 5000));
        }

        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const botMessage = { text: botMessageText, user: 'Bot' };

          newMessages.pop();
          newMessages.push(botMessage);

          return newMessages;
        });

      } catch (error) {
        setMessages(prevMessages => {
          const newMessages = prevMessages.slice(0, -1); // remove loading message
          return [...newMessages, { text: "Couldn't process the request. Try again.", user: 'Bot' }];
        });
      }
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
                  <Typography variant="body2" component="p" sx={{p:1}}>
                    {message.text}
                  </Typography>
                  {message.user === 'Bot' ? <GruvboxGraph someData={sentimentData} /> : <></>}
                  </CardContent>
                </Card>
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box sx={{ position: "fixed", right: "0", bottom: "3%", left: "0" }} >
        <TextField
          value={newMessage}
          onChange={event => setNewMessage(event.target.value)}
          label="Specify your message here"
          sx={{ width: "50%" }}
        />
        <Button variant="contained" color="primary" onClick={sendMessage} sx={{ m: 1 }}>Send</Button>
        {/* <Button variant="contained" color="primary" onClick={sendMessage} sx={{ m: 1 }}>
          <BsTerminal size={24}/>
        </Button> */}
      </Box>
    </div >
  );
}

export default Chatbot;
