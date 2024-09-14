'use client';
import { ChatbotProps } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Dialog, Divider, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import ChatbotCore from '../components/chat/ChatbotCore';
import ChatbotInput from '../components/chat/ChatbotInput';
import useChatSocket from '../hooks/useChatSocket';

const ChatbotWebsocketStreaming = forwardRef<
  {
    handleSendCustomMessage: (message: string) => void;
  },
  ChatbotProps
>(
  (
    {
      className,
      apiConfig,
      loaderType,
      themeConfig,
      preloadedMessages,
      multimodeChat,
      multimodeRenderFunction,
      welcomeMessageRenderFunction,
      setDataForParent,
      onApiResponseCode,
      botMessageRenderFunction,
      userMessageRenderFunction,
      dataRenderFunction,
      providerRenderFunction,
      referenceRenderFunction,
      relatedQuestionsRenderFunction,
      subqueryRenderFunction,
      errorRenderFunction,
      loadingRenderFunction,
    },
    ref,
  ) => {
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
    const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
    const [lastBotMessage, setLastBotMessage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isAnyMessageLoading, setIsAnyMessageLoading] = useState(false);
    const [showLinearLoader, setShowLinearLoader] = useState(false);
    const [graphData, setGraphData] = useState<any>(null);
    const [streamData, setStreamData] = useState<string>('');

    const constructWsUrl = useCallback(() => {
      const baseUrl =
        apiConfig?.queryEndpoint?.startsWith('ws://') ||
        apiConfig?.queryEndpoint?.startsWith('wss://')
          ? apiConfig.queryEndpoint
          : 'wss://localhost:8000/websocket';

      const url = new URL(baseUrl);

      if (multimodeChat) {
        Object.values(multimodeChat).forEach((mode) => {
          if (mode.isActivated) {
            url.searchParams.append(mode.url_param, mode.value);
          }
        });
      }

      return url.toString();
    }, [apiConfig?.queryEndpoint, multimodeChat]);

    const wsUrl = useMemo(() => constructWsUrl(), [constructWsUrl]);

    const { sendMessage, lastMessage, connectionStatus, eventReason } = useChatSocket(wsUrl ?? '');

    const handleSendMessage = () => {
      if (!isAnyMessageLoading && messages.length % 2 === 0 && connectionStatus === 'connected') {
        if (!newMessage.trim()) return;
        sendMessage(JSON.stringify({ query: newMessage }));

        const userMessage = { text: newMessage, user: humanUser, loading: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setLastUserMessage(newMessage);
        setNewMessage('');
      } else {
        console.log('Some message is still loading or connection is not established.');
      }
    };

    const handleSendCustomMessage = (message: string) => {
      if (!isAnyMessageLoading && messages.length % 2 === 0) {
        if (!message.trim()) return;
        sendMessage(JSON.stringify({ query: message }));

        const userMessage = { text: message, user: humanUser, loading: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setLastUserMessage(message);
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
        let providers = mappedData.providers;
        let subqueryQuestion = mappedData.subqueryQuestion;
        let subqueryResponse = mappedData.subqueryResponse;

        if (setDataForParent) {
          setDataForParent({
            ...mappedData,
            isAnyMessageLoading,
            lastUserMessage,
            lastBotMessage: body,
          });
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
            subqueryQuestion: subqueryQuestion ? subqueryQuestion : [],
            subqueryResponse: subqueryResponse ? subqueryResponse : [],
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
                providers: providers,
                subqueryQuestion: subqueryQuestion,
                subqueryResponse: subqueryResponse,
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
                providers: providers,
                subqueryQuestion: subqueryQuestion,
                subqueryResponse: subqueryResponse,
                loading: false,
                stream: false,
              });
            }

            return updatedMessages;
          });
          setBotMessage(null);
          setLastBotMessage(body);
        } else if (type === 'stream_step') {
          const accumulatedStreamData = body;

          setStreamData(accumulatedStreamData);

          if (accumulatedStreamData) {
            const copyMessages = [...messages];
            if (copyMessages.length % 2 !== 0) {
              copyMessages.push({
                text: ' ',
                user: botUser,
                loading: true,
                stream: true,
              });
            }
            copyMessages[copyMessages.length - 1].text = accumulatedStreamData;
            setMessages(() => [...copyMessages]);
            setBotMessage(null);
          }
        }
      }
    }, [lastMessage]);

    useEffect(() => {
      scrollToBottom();
    }, [messages, lastMessage, isAnyMessageLoading]);

    useImperativeHandle(ref, () => ({
      sendMessage: handleSendMessage,
      handleSendCustomMessage,
    }));

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey && !isAnyMessageLoading) {
        if (messages.length === 0 || (messages.length > 0 && messages.length % 2 === 0)) {
          handleSendMessage();
          event.preventDefault();
        }
      }
    };

    return (
      <div
        className={`gptstonks-chatbot ${className}`}
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
              apiConfig={{ ...apiConfig }}
              themeConfig={themeConfig}
              loaderType={loaderType ? loaderType : 1}
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
              providerRenderFunction={providerRenderFunction}
              referenceRenderFunction={referenceRenderFunction}
              relatedQuestionsRenderFunction={relatedQuestionsRenderFunction}
              subqueryRenderFunction={subqueryRenderFunction}
              loadingRenderFunction={loadingRenderFunction}
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
  },
);

export default ChatbotWebsocketStreaming;
