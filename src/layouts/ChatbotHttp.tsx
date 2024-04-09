'use client';
import { ChatbotProps } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Divider, Typography, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatbotCore from '../components/chat/ChatbotCore';
import ChatbotInput from '../components/chat/ChatbotInput';

const ChatbotHttp: React.FC<ChatbotProps> = ({
  className,
  apiConfig,
  themeConfig,
  setDataForParent,
  onApiResponseCode,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  graphicalDataRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  errorRenderFunction,
}: ChatbotProps) => {
  const humanUser = 'humanUser';
  const botUser = 'botUser';
  const isMobile = useMediaQuery('(max-width:750px)');
  const customTheme = createTheme(
    themeConfig ? { palette: themeConfig.palette, typography: themeConfig.typography } : {},
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [botMessage, setBotMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isAnyMessageLoading, setIsAnyMessageLoading] = useState(false);
  const [showLinearLoader, setShowLinearLoader] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<any>(null);

  if (!apiConfig.apiQueryEndpoint.startsWith('http')) {
    throw new Error('apiQueryEndpoint should start with http:// or https:// for fetch');
  }

  useEffect(() => {
    if (apiConfig.auth) {
      if (!apiConfig.tokenName) {
        throw new Error('tokenName should be provided for auth');
      }
      const fetchedToken = localStorage.getItem(apiConfig.tokenName);
      setToken(fetchedToken);
    }
  }, []);

  const customFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> =
    typeof apiConfig.fetchFunction === 'function' ? apiConfig.fetchFunction : fetch;

  const handleFetchMessage = async () => {
    if (apiConfig.auth && token) {
      const response = await customFetch(apiConfig.apiQueryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: newMessage }),
      } as RequestInit);

      let messageData = await response.json();
      let mappedData: { [key: string]: any } = {};

      if (apiConfig.queryParams) {
        Object.entries(apiConfig.queryParams).forEach(([key, value]) => {
          mappedData[key] = messageData[value];
        });
      }

      let body = mappedData.text;
      let type = mappedData.type;
      let data = mappedData.data;
      let related = mappedData.related;
      let reference = mappedData.reference;
      console.log('body:', body);
      console.log('type:', type);
      console.log('data:', data);
      console.log('related:', related);
      console.log('reference:', reference);

      if (setDataForParent) {
        setDataForParent(mappedData);
      }

      const botMessage = {
        text: body,
        user: 'botUser',
        data: data,
        reference: reference,
        related: related,
        loading: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      const response = await customFetch(apiConfig.apiQueryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: newMessage }),
      } as RequestInit);

      let messageData = await response.json();
      let mappedData: { [key: string]: any } = {};

      if (apiConfig.queryParams) {
        Object.entries(apiConfig.queryParams).forEach(([key, value]) => {
          mappedData[key] = messageData[value];
        });
      }

      let body = mappedData.text;
      let type = mappedData.type;
      let data = mappedData.data;
      let related = mappedData.related;
      let reference = mappedData.reference;
      console.log('body:', body);
      console.log('type:', type);
      console.log('data:', data);
      console.log('related:', related);
      console.log('reference:', reference);

      if (setDataForParent) {
        setDataForParent(mappedData);
      }

      const botMessage = {
        text: body,
        user: 'botUser',
        data: data,
        reference: reference,
        related: related,
        loading: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  const handleSendMessage = () => {
    handleFetchMessage();

    console.log('newMessage:', newMessage);
    const userMessage = { text: newMessage, user: 'humanUser', loading: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnyMessageLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
      event.preventDefault();
    }
  };

  return (
    <div
      className={`chatbot-default ${className}`}
      style={{
        ...themeConfig.style,
      }}
    >
      <ThemeProvider theme={customTheme}>
        <ChatbotCore
          messages={messages}
          themeConfig={themeConfig}
          botUser={botUser}
          humanUser={humanUser}
          botMessage={botMessage}
          messagesEndRef={messagesEndRef}
          showLinearLoader={showLinearLoader}
          isAnyMessageLoading={isAnyMessageLoading}
          isMobile={isMobile}
          botMessageRenderFunction={botMessageRenderFunction}
          userMessageRenderFunction={userMessageRenderFunction}
          dataRenderFunction={dataRenderFunction}
          graphicalDataRenderFunction={graphicalDataRenderFunction}
          referenceRenderFunction={referenceRenderFunction}
          relatedQuestionsRenderFunction={relatedQuestionsRenderFunction}
          errorRenderFunction={errorRenderFunction}
        />
        {themeConfig?.components?.Divider?.appears && (
          <Divider sx={themeConfig?.components?.Divider?.style} />
        )}

        <ChatbotInput
          isMobile={isMobile}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
          themeConfig={themeConfig}
          isAnyMessageLoading={isAnyMessageLoading}
        />
      </ThemeProvider>
    </div>
  );
};

export default ChatbotHttp;
