import { APIConfig, ThemeConfig } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Avatar, Box, List, ListItem, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { DNA } from 'react-loader-spinner';
import LinearBuffer from './LinearBuffer';
import RenderFunctions from '../renderers/RenderFunctions';

const ChatbotCore = ({
  messages,
  themeConfig,
  apiConfig,
  isMobile,
  botUser,
  humanUser,
  botMessage,
  messagesEndRef,
  isAnyMessageLoading,
  showLinearLoader,
  sendCustomMessage,
  welcomeMessageRenderFunction,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  providerRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  subqueryRenderFunction,
}: {
  messages: Message[];
  themeConfig: ThemeConfig;
  isMobile: boolean;
  apiConfig: APIConfig;
  botUser: string;
  humanUser: string;
  botMessage: any;
  messagesEndRef: any;
  isAnyMessageLoading: boolean;
  showLinearLoader: boolean;
  setDataForParent?: (data: any) => void;
  onApiResponseCode?: (bool: boolean) => void;
  multimodeRenderFunction?: (modes: string[]) => JSX.Element;
  errorRenderFunction?: (error: any) => JSX.Element;
  sendCustomMessage: (message: string) => void;
  welcomeMessageRenderFunction: (
    sendCustomMessage: (message: string) => void,
  ) => JSX.Element | null;
  botMessageRenderFunction: (message: any, input: string) => JSX.Element | null;
  userMessageRenderFunction: (text: string) => JSX.Element | null;
  dataRenderFunction: (data: any) => JSX.Element | null;
  providerRenderFunction: (providers: string[]) => JSX.Element | null;
  referenceRenderFunction: (reference: any) => JSX.Element | null;
  relatedQuestionsRenderFunction: (
    relatedQuestions: any,
    sendCustomMessage: (message: string) => void,
  ) => JSX.Element | null;
  subqueryRenderFunction: (
    subqueryQuestion: string[],
    subqueryResponse: string[],
  ) => JSX.Element | null;
}) => {
  const {
    WelcomeMessageRender,
    BotMessageRender,
    UserMessageRender,
    DataRender,
    ProviderRender,
    ReferenceRender,
    RelatedQuestionsRender,
    SubqueryRender,
  } = RenderFunctions({
    welcomeMessageRenderFunction,
    botMessageRenderFunction,
    userMessageRenderFunction,
    dataRenderFunction,
    providerRenderFunction,
    referenceRenderFunction,
    relatedQuestionsRenderFunction,
    subqueryRenderFunction,
    sendCustomMessage,
  });

  const getMessage = (text: string) => {
    if (apiConfig?.modelStepTypes) {
      const modelStepTypes = apiConfig.modelStepTypes;

      if (modelStepTypes.hasOwnProperty(text)) {
        return modelStepTypes[text];
      }
    }

    return `Preparing content from ${text}...`;
  };

  return (
    <Box
      sx={{
        ...themeConfig.components?.ChatBox?.style,
      }}
    >
      {messages.length === 0 && WelcomeMessageRender(sendCustomMessage)}
      <List>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              flexDirection:
                message.user === botUser
                  ? 'row'
                  : themeConfig?.components?.MessageBubbleUser?.style?.flexDirection ||
                    'row-reverse',
            }}
          >
            {!isMobile &&
              ((themeConfig?.components?.Avatar?.showSideUserAvatar &&
                message.user === humanUser) ||
                (themeConfig?.components?.Avatar?.showSideBotAvatar &&
                  message.user === botUser)) && (
                <Avatar // Side avatar (outside of message bubble)
                  sx={{
                    ...themeConfig?.components?.Avatar?.style,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                  src={
                    message.user === botUser
                      ? themeConfig?.components?.Avatar?.botAvatarUrl
                      : themeConfig?.components?.Avatar?.userAvatarUrl
                  }
                />
              )}
            {isMobile &&
              ((themeConfig?.components?.Avatar?.showSideUserAvatar &&
                message.user === humanUser) ||
                (themeConfig?.components?.Avatar?.showSideBotAvatar &&
                  message.user === botUser)) && (
                <Avatar // Side avatar (outside of message bubble) for mobile
                  sx={{
                    ...themeConfig?.components?.Avatar?.style,
                    width: '20px',
                    height: '20px',
                    position: 'absolute',
                    top: '0',
                    outline: '1px solid #b8bb26',
                  }}
                  src={
                    message.user === botUser
                      ? themeConfig?.components?.Avatar?.botAvatarUrl
                      : themeConfig?.components?.Avatar?.userAvatarUrl
                  }
                />
              )}
            {message.user === botUser ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection:
                    themeConfig?.chatLayoutConfig?.botMessageStackDirection || 'column',
                }}
              >
                {themeConfig.chatLayoutConfig?.responseHeader && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1em',
                      marginTop: '15px',
                    }}
                  >
                    <Avatar
                      sx={{
                        ...themeConfig?.components?.Avatar?.style,
                      }}
                      src={themeConfig?.components?.Avatar?.botAvatarUrl}
                    />
                    <Typography
                      variant="h6"
                      color={themeConfig?.components?.MessageBubbleBot?.style?.color}
                    >
                      {' '}
                      Response{' '}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ...themeConfig?.components?.MessageBubbleBot?.style,
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    {message.text && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: message.stream ? 'column' : 'row',
                          justifyContent: message.stream ? 'center' : 'flex-start',
                          alignItems: message.stream ? 'center' : 'flex-start',
                          maxWidth: '100%',
                        }}
                      >
                        {BotMessageRender(message, messages[index - 1]?.text)}
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    {message.subqueryQuestion &&
                      message.subqueryResponse &&
                      SubqueryRender(message.subqueryQuestion, message.subqueryResponse)}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    {message.providers && ProviderRender(message.providers)}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    {message.reference && ReferenceRender(message.reference)}
                  </Box>
                  {(message.streamCompleted || message.stream) && DataRender(message.graphData)}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  {message.related && RelatedQuestionsRender(message.related, sendCustomMessage)}
                </Box>
              </Box>
            ) : (
              <Box sx={themeConfig?.components?.MessageBubbleUser?.style}>
                {UserMessageRender(message.text)}
              </Box>
            )}
          </ListItem>
        ))}
        {botMessage && isAnyMessageLoading && !showLinearLoader && (
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'row',
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <Avatar
              sx={{
                marginRight: '1rem',
                ...themeConfig?.components?.Avatar?.style,
              }}
              src={themeConfig?.components?.Avatar?.botAvatarUrl}
            />
            <Box sx={{ ...themeConfig?.components?.LoaderBot?.style }}>
              {/*TODO: Add a custom model_step loader*/}
              <DNA
                visible={true}
                height="60"
                width="60"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
              <Typography
                sx={{
                  marginLeft: '1rem',
                }}
              >
                {getMessage(botMessage.text)}
              </Typography>
            </Box>
          </ListItem>
        )}
        {showLinearLoader && (
          <ListItem
            sx={{ display: 'flex', flexDirection: 'row', maxWidth: isMobile ? '70vw' : '40vw' }}
          >
            {/*TODO: Add a custom pre-render loader (when data is retrieved)*/}
            <Avatar
              sx={{
                marginRight: '1rem',
                ...themeConfig?.components?.Avatar?.style,
              }}
              src={themeConfig?.components?.Avatar?.botAvatarUrl}
            />
            <LinearBuffer />
          </ListItem>
        )}
      </List>

      <div ref={messagesEndRef} />
      <div
        style={{
          height: '100px',
        }}
      />
    </Box>
  );
};

export default ChatbotCore;