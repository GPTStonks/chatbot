'use client';
import useChatbotDefaultTheme from '@/components/chat/ChatbotDefaultTheme';
import ChatbotWebsocketStreaming from '@/layouts/ChatbotWebsocketStreaming';
import { MultimodeChat } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  BotMessageRender,
  ErrorRenderFunction,
  LoadingMessageRender,
  ProviderRender,
  SubqueryRender,
  UserMessageRender,
  WelcomeMessageRender,
} from './CustomRenderers';

export default function Home() {
  const [initializedChat, setInitializedChat] = React.useState(false);
  const [chatData, setChatData] = React.useState<any>(null);
  const [multimodeChat, setMultimodeChat] = useState<MultimodeChat>({
    mode1: { url_param: 'agent_mode', value: 'speed', isActivated: false },
    mode2: { url_param: 'agent_mode', value: 'quality', isActivated: true },
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
              subqueryQuestion: 'subqueries_answered',
              subqueryResponse: 'subqueries_responses',
            },
            modelStepTypes: {
              world_knowledge: '📈 Navigating Economic Currents...',
              simple_reflection: 'Wrapping up...',
              other: 'Preparing content from...',
            },
          }}
          themeConfig={themeConfig}
          setDataForParent={(data: any) => {
            setChatData(data);
          }}
          onApiResponseCode={(bool: boolean) => {
            setInitializedChat(bool);
          }}
          errorRenderFunction={ErrorRenderFunction}
          userMessageRenderFunction={UserMessageRender}
          botMessageRenderFunction={BotMessageRender}
          providerRenderFunction={ProviderRender}
          subqueryRenderFunction={SubqueryRender}
          welcomeMessageRenderFunction={WelcomeMessageRender}
          loaderType={3}
          loadingRenderFunction={LoadingMessageRender}
        />
      </div>
      <div style={{ width: '20vw', height: '100%' }}></div>
    </main>
  );
}
