'use client';
import useChatbotDefaultTheme from '@/components/chat/ChatbotDefaultTheme';
import ChatbotHttp from '@/layouts/ChatbotHttp';
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
        backgroundColor: '#080808',
        position: 'relative',
      }}
    >
      <div style={{ width: '13vw', height: '100%' }}></div>
      <div style={{ width: '74vw', height: '100%' }}>
        <ChatbotHttp
          apiConfig={{
            auth: false,
            tokenName: 'userToken',
            fetchFunction: '',
            apiQueryEndpoint: 'http://localhost:5000/ask',
            queryParams: {
              type: 'type',
              data: 'result_data',
              text: 'body',
              reference: 'reference',
              related: 'related',
            },
          }}
          themeConfig={themeConfig}
          setDataForParent={(data: any) => {
            setChatData(data);
          }}
          onApiResponseCode={(bool: boolean) => {
            setInitializedChat(bool);
          }}
          botMessageRenderFunction={(text: string) => (
            <Box>
              <Typography>{text}</Typography>
            </Box>
          )}
          //dataRenderFunction={(data: any) => <div>{data}</div>}
          //graphicalDataRenderFunction={(data: any) => <div>{data}</div>}
          errorRenderFunction={(error: string) => <div>{error}</div>}
        />
      </div>
      <div style={{ width: '13vw', height: '100%' }}></div>
    </main>
  );
}