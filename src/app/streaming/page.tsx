'use client';
import useChatbotDefaultTheme from '@/components/chat/ChatbotDefaultTheme';
import ChatbotWebsocketStreaming from '@/layouts/ChatbotWebsocketStreaming';
import { Message } from '@/types/message';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Home() {
  const [initializedChat, setInitializedChat] = React.useState(false);
  const [chatData, setChatData] = React.useState<any>(null);

  const themeConfig = useChatbotDefaultTheme;

  const preloadedMessages: Message[] = [
    {
      text: 'Hello! How can I help you today?',
      user: 'humanUser',
    },
    {
      text: 'Hello!',
      user: 'botUser',
    },
  ];

  const token = localStorage.getItem('userToken');

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#080808',
      }}
    >
      <div style={{ width: '20vw', height: '100%' }}></div>
      <div style={{ width: '100%', height: '100%' }}>
        <ChatbotWebsocketStreaming
          preloadedMessages={preloadedMessages}
          apiConfig={{
            queryEndpoint: 'ws://localhost:8000/chatws?token=' + token,
            queryParams: {
              type: 'type',
              data: 'result_data',
              text: 'body',
              reference: 'reference',
              related: 'related',
              stream: 'stream_step',
            },
          }}
          themeConfig={themeConfig}
          errorRenderFunction={(error: any) => (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '3px 15px',
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <Typography>{error}</Typography>
            </Box>
          )}
          setDataForParent={(data: any) => {
            setChatData(data);
          }}
          onApiResponseCode={(bool: boolean) => {
            setInitializedChat(bool);
          }}
          userMessageRenderFunction={(text: string) => (
            <Box>
              <Typography>{text}</Typography>
            </Box>
          )}
          botMessageRenderFunction={(message: Message) => (
            <Box
              sx={{
                maxWidth: '100%',
                overflowWrap: 'break-word',
              }}
            >
              <Typography>{message.text}</Typography>
            </Box>
          )}
        />
      </div>
      <div style={{ width: '20vw', height: '100%' }}></div>
    </main>
  );
}
