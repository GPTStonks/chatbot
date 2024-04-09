'use client';
import { ChatbotProps } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Dialog, Divider, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import ChatbotCore from '../components/chat/ChatbotCore';
import ChatbotInput from '../components/chat/ChatbotInput';

const ChatbotWebsocket: React.FC<ChatbotProps> = ({
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
  const ErrorRender = useCallback(
    (error: any) => {
      return errorRenderFunction ? (
        errorRenderFunction(error)
      ) : (
        <Dialog open>
          <div
            style={{
              padding: '20px',
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            ⚠️ {error}
          </div>
        </Dialog>
      );
    },
    [errorRenderFunction],
  );

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

  if (!apiConfig.apiQueryEndpoint.startsWith('ws')) {
    throw new Error('apiQueryEndpoint should start with ws:// or wss:// for websocket');
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

  const wsUrl = useMemo(() => {
    if (apiConfig.auth && token) {
      return `${apiConfig.apiQueryEndpoint}?token=${token}`;
    }
    return apiConfig.apiQueryEndpoint;
  }, [apiConfig.apiQueryEndpoint, apiConfig.auth, token]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(JSON.stringify({ query: newMessage }));

    console.log('newMessage:', newMessage);
    const userMessage = { text: newMessage, user: 'humanUser', loading: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage('');
  };

  useEffect(() => {
    if (onApiResponseCode && messages.length > 0) {
      onApiResponseCode(true);
    }
  }, [messages]);

  useEffect(() => {
    if (lastMessage !== null) {
      let messageData = JSON.parse(lastMessage.data);
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

      if (type === 'data' && data) {
        setGraphData(data);
      }

      let queryLoading = type !== 'data';
      setIsAnyMessageLoading(queryLoading);

      if (queryLoading && type === 'model_step') {
        setBotMessage((prevBotMessage) => ({
          text: body,
          user: 'botUser',
          loading: true,
        }));
      } else if (type === 'data') {
        setShowLinearLoader(true);

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: body,
              user: 'botUser',
              graphData: data,
              related: related,
              reference: reference,
              loading: false,
            },
          ]);
          setShowLinearLoader(false);
          setBotMessage(null);
        }, 3000);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, lastMessage, isAnyMessageLoading]);

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
        <React.Fragment>
          {connectionStatus === 'Closed' &&
            ErrorRender('Connection is closed. Please refresh the page.')}
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
        </React.Fragment>

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

export default ChatbotWebsocket;
