'use client';
import { useChatbotDefaultTheme, ChatbotWebsocket } from '../chatbot';
import React from 'react';

export default function Home() {
  const [initializedChat, setInitializedChat] = React.useState(false);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        position: 'absolute',
        bottom: '0',
        height: '100vh',
        backgroundColor: '#080808',
      }}
    >
      <ChatbotWebsocket
        apiConfig={{
          isWebsocket: true,
          auth: false,
          tokenName: 'userToken',
          fetchFunction: '',
          apiQueryEndpoint: 'ws://localhost:8000/chatws',
          queryParams: {
            type: 'type',
            data: 'result_data',
            text: 'body',
          },
        }}
        themeConfig={useChatbotDefaultTheme}
        onApiResponseCode={(bool: boolean) => {
          setInitializedChat(bool);
        }}
        dataRenderFunction={(data: any) => <div>{data}</div>}
        graphicalDataRenderFunction={(data: any) => <div>{data}</div>}
        referenceRenderFunction={(reference: string) => <div>{reference}</div>}
        relatedQuestionsRenderFunction={(relatedQuestions: string[]) => (
          <div>{relatedQuestions}</div>
        )}
        errorRenderFunction={(error: string) => <div>{error}</div>}
      />
    </main>
  );
}
