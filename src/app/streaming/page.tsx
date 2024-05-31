'use client';
import useChatbotDefaultTheme from '@/components/chat/ChatbotDefaultTheme';
import ChatbotWebsocketStreaming from '@/layouts/ChatbotWebsocketStreaming';
import { Message } from '@/types/message';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MultimodeChat } from '@/types/chatbot';

export default function Home() {
  const [initializedChat, setInitializedChat] = React.useState(false);
  const [chatData, setChatData] = React.useState<any>(null);
  const [multimodeChat, setMultimodeChat] = useState<MultimodeChat>({
    mode1: { url_param: 'agent_mode', value: 'speed', isActivated: true },
    mode2: { url_param: 'agent_mode', value: 'quality', isActivated: false },
  });

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

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    setToken(storedToken);
  }, []);

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
          multimodeChat={multimodeChat}
          multimodeRenderFunction={(modes: string[]) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {modes.map((mode, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    const newMultimodeChat = { ...multimodeChat };
                    Object.keys(newMultimodeChat).forEach((key) => {
                      newMultimodeChat[key].isActivated = false;
                    });
                    newMultimodeChat[`mode${index + 1}`].isActivated = true;
                    setMultimodeChat(newMultimodeChat);
                    console.log('Multimode chat:', newMultimodeChat);
                  }}
                >
                  {mode}
                </Button>
              ))}
            </Box>
          )}
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
