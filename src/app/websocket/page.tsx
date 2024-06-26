'use client';
import useChatbotDefaultTheme from '@/components/chat/ChatbotDefaultTheme';
import ChatbotWebsocket from '@/layouts/ChatbotWebsocket';
import { Message } from '@/types/message';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Home() {
  const [initializedChat, setInitializedChat] = React.useState(false);
  const [chatData, setChatData] = React.useState<any>(null);

  const themeConfig = useChatbotDefaultTheme;

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
        <ChatbotWebsocket
          apiConfig={{
            queryEndpoint: 'ws://localhost:8000/chatws',
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
              <Typography
                sx={{
                  wordWrap: 'break-word',
                }}
              >
                {message.text}
              </Typography>
            </Box>
          )}
        />
      </div>
      <div style={{ width: '20vw', height: '100%' }}></div>
    </main>
  );
}
