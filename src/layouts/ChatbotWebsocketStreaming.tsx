'use client';
import useChatSocket from '../hooks/useChatSocket';
import { ChatbotProps } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Dialog, Divider, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ChatbotCore from '../components/chat/ChatbotCore';
import ChatbotInput from '../components/chat/ChatbotInput';

const ChatbotWebsocketStreaming: React.FC<ChatbotProps> = ({
  className,
  apiConfig,
  themeConfig,
  preloadedMessages,
  welcomeMessageRenderFunction,
  setDataForParent,
  onApiResponseCode,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
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
  const [messages, setMessages] = useState<Message[]>(preloadedMessages ?? []);
  const [newMessage, setNewMessage] = useState<string>('');
  const [botMessage, setBotMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isAnyMessageLoading, setIsAnyMessageLoading] = useState(false);
  const [showLinearLoader, setShowLinearLoader] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const [streamData, setStreamData] = useState<string>('');

  const wsUrl = useMemo(() => {
    return apiConfig?.queryEndpoint?.startsWith('ws://') || apiConfig?.queryEndpoint?.startsWith('wss://') ?
      apiConfig.queryEndpoint : 'wss://localhost:8000/websocket';
  }, [apiConfig?.queryEndpoint]);

  const { sendMessage, lastMessage, connectionStatus, eventReason } = useChatSocket(wsUrl ?? '');

  const handleSendMessage = () => {
    if (!isAnyMessageLoading && messages.length % 2 == 0 && connectionStatus === 'connected') {
      if (!newMessage.trim()) return;
      sendMessage(JSON.stringify({ query: newMessage }));

      const userMessage = { text: newMessage, user: humanUser, loading: false };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');
    } else {
      console.log('Some message is still loading or connection is not established.');
    }
  };

  const handleSendCustomMessage = (message: string) => {
    if (!isAnyMessageLoading && messages.length % 2 == 0) {
      if (!message.trim()) return;
      sendMessage(JSON.stringify({ query: message }));

      const userMessage = { text: message, user: humanUser, loading: false };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');
    } else {
      console.log('Some message is still loading or connection is not established.');
    }
  };

  useEffect(() => {
    if (onApiResponseCode && messages.length > 0) {
      onApiResponseCode(true);
    }
  }, [messages]);

  useEffect(() => {
    if (!wsUrl.startsWith('ws://') && !wsUrl.startsWith('wss://')) {
      throw new Error('queryEndpoint should start with ws:// or wss:// for websocket');
    }
    if (lastMessage !== null) {
      let messageData = lastMessage;
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
      //console.log('data:', mappedData);

      if (setDataForParent) {
        setDataForParent(mappedData);
      }

      if (type === 'data' && data) {
        setGraphData(data);
      }

      let queryLoading = type !== 'data';
      setIsAnyMessageLoading(queryLoading);

      if (type === 'error') {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages.push({
            text: body,
            user: botUser,
            loading: false,
          });
          return updatedMessages;
        });
        setIsAnyMessageLoading(false);
      }
      if (queryLoading && type === 'model_step') {
        setBotMessage(() => ({
          text: body,
          user: 'botUser',
          loading: true,
        }));
      } else if (type === 'data') {
        setStreamData('');
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastIndex = updatedMessages.length - 1;
          if (lastIndex >= 0 && updatedMessages[lastIndex].loading) {
            //After streaming
            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              text: body,
              related: related,
              reference: reference,
              graphData: data,
              loading: false,
              stream: false,
              streamCompleted: true,
            };
          } else {
            //Not streaming
            updatedMessages.push({
              text: body,
              user: botUser,
              related: related,
              reference: reference,
              graphData: data,
              loading: false,
              stream: false,
            });
          }

          return updatedMessages;
        });
        setBotMessage(null);
      } else if (type === 'stream_step') {
        const accumulatedStreamData = body;

        setStreamData(accumulatedStreamData);

        if (
          accumulatedStreamData.includes('"response": "') &&
          !accumulatedStreamData.includes('",')
        ) {
          const copyMessages = [...messages];
          if (copyMessages.length % 2 != 0) {
            copyMessages.push({
              text: ' ',
              user: botUser,
              loading: true,
              stream: true,
            });
          }
          copyMessages[copyMessages.length - 1].text = accumulatedStreamData
            .replace('{', '')
            .replace('}', '')
            .replace('"response": "', '');
          setMessages(() => [...copyMessages]);
          setBotMessage(null);
        }
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
    if (event.key === 'Enter' && !event.shiftKey && !isAnyMessageLoading) {
      if (messages.length == 0 || (messages.length > 0 && messages.length % 2 == 0)) {
        handleSendMessage();
        event.preventDefault();
      }
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
          {connectionStatus === 'disconnected' &&
            ErrorRender(
              eventReason ? eventReason : 'Connection is closed. Please refresh the page.',
            )}
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
            sendCustomMessage={handleSendCustomMessage}
            welcomeMessageRenderFunction={welcomeMessageRenderFunction}
            botMessageRenderFunction={botMessageRenderFunction}
            userMessageRenderFunction={userMessageRenderFunction}
            dataRenderFunction={dataRenderFunction}
            referenceRenderFunction={referenceRenderFunction}
            relatedQuestionsRenderFunction={relatedQuestionsRenderFunction}
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

export default ChatbotWebsocketStreaming;
