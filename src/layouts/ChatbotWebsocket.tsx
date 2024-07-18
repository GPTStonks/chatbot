'use client';
import { ChatbotProps } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Dialog, Divider, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import ChatbotCore from '../components/chat/ChatbotCore';
import ChatbotInput from '../components/chat/ChatbotInput';
import useChatSocket from '../hooks/useChatSocket';

const ChatbotWebsocket: React.FC<ChatbotProps> = ({
  className,
  apiConfig,
  themeConfig,
  setDataForParent,
  onApiResponseCode,
  sendCustomMessage,
  welcomeMessageRenderFunction,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  providerRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  errorRenderFunction,
  multimodeChat,
  multimodeRenderFunction,
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

  if (!apiConfig?.queryEndpoint?.startsWith('ws')) {
    throw new Error('queryEndpoint should start with ws:// or wss:// for websocket');
  }

  const wsUrl = useMemo(() => {
    return apiConfig.queryEndpoint || '';
  }, [apiConfig.queryEndpoint]);

  const { sendMessage, lastMessage, connectionStatus, eventReason } = useChatSocket(wsUrl ?? '');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(JSON.stringify({ query: newMessage }));

    const userMessage = { text: newMessage, user: humanUser, loading: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage('');
  };

  const handleSendCustomMessage = (message: string) => {
    if (!message.trim()) return;
    sendMessage(JSON.stringify({ query: message }));

    const userMessage = { text: message, user: humanUser, loading: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
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
      /* console.log('body:', body);
      console.log('type:', type);
      console.log('data:', data);
      console.log('related:', related);
      console.log('reference:', reference); */

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
          user: botUser,
          loading: true,
        }));
      } else if (type === 'data') {
        setShowLinearLoader(true);

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: body,
              user: botUser,
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
            ErrorRender(eventReason ? eventReason : 'Connection closed unexpectedly')}
          <ChatbotCore
            messages={messages}
            apiConfig={{ ...apiConfig }}
            themeConfig={themeConfig}
            botUser={botUser}
            humanUser={humanUser}
            botMessage={botMessage}
            messagesEndRef={messagesEndRef}
            showLinearLoader={showLinearLoader}
            isAnyMessageLoading={isAnyMessageLoading}
            isMobile={isMobile}
            sendCustomMessage={handleSendCustomMessage}
            welcomeMessageRenderFunction={(sendCustomMessage: (message: string) => void) =>
              welcomeMessageRenderFunction?.(sendCustomMessage) ?? null
            }
            botMessageRenderFunction={(message: any, input: string) =>
              botMessageRenderFunction?.(message, input) ?? null
            }
            userMessageRenderFunction={(text: string) => userMessageRenderFunction?.(text) ?? null}
            dataRenderFunction={(data: any) => dataRenderFunction?.(data) ?? null}
            providerRenderFunction={(providers: string[]) =>
              providerRenderFunction?.(providers) ?? null
            }
            referenceRenderFunction={(reference: string[]) =>
              referenceRenderFunction?.(reference) ?? null
            }
            relatedQuestionsRenderFunction={(relatedQuestions: string[], sendCustomMessage: any) =>
              relatedQuestionsRenderFunction?.(relatedQuestions, sendCustomMessage) ?? null
            }
            subqueryRenderFunction={(subqueryQuestion: string[], subqueryResponse: string[]) =>
              null
            }
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
          multimodeChat={multimodeChat}
          multimodeRenderFunction={(modes: string[]) => multimodeRenderFunction?.(modes) ?? null}
        />
      </ThemeProvider>
    </div>
  );
};

export default ChatbotWebsocket;
