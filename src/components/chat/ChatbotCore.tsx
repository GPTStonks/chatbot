import { APIConfig, ThemeConfig } from '@/types/chatbot';
import { Message } from '@/types/message';
import { Avatar, Box, List, ListItem, Typography } from '@mui/material';
import {
  defaultBotMessageRenderFunction,
  defaultLoadingRenderFunction,
  defaultSubqueryRenderFunction,
  defaultUserMessageRenderFunction,
  defaultWelcomeMessageRenderFunction,
} from '../renderers/DefaultRenderers';
import LinearBuffer from './LinearBuffer';

const ChatbotCore = ({
  messages,
  themeConfig,
  loaderType = 1,
  apiConfig,
  isMobile,
  botUser,
  humanUser,
  botMessage,
  messagesEndRef,
  isAnyMessageLoading,
  showLinearLoader,
  sendCustomMessage,
  welcomeMessageRenderFunction = defaultWelcomeMessageRenderFunction,
  botMessageRenderFunction = defaultBotMessageRenderFunction,
  userMessageRenderFunction = defaultUserMessageRenderFunction,
  dataRenderFunction = (data: any) => null,
  providerRenderFunction = (providers: string[]) => null,
  referenceRenderFunction = (reference: any) => null,
  relatedQuestionsRenderFunction = (
    relatedQuestions: any,
    sendCustomMessage: (message: string) => void,
  ) => null,
  subqueryRenderFunction = defaultSubqueryRenderFunction,
  loadingRenderFunction = defaultLoadingRenderFunction,
}: {
  messages: Message[];
  themeConfig: ThemeConfig;
  loaderType?: number;
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
  welcomeMessageRenderFunction?: (
    sendCustomMessage: (message: string) => void,
  ) => JSX.Element | null;
  botMessageRenderFunction?: (message: any, input: string) => JSX.Element | null;
  userMessageRenderFunction?: (text: string) => JSX.Element | null;
  dataRenderFunction?: (data: any) => JSX.Element | null;
  providerRenderFunction?: (providers: string[]) => JSX.Element | null;
  referenceRenderFunction?: (reference: any) => JSX.Element | null;
  relatedQuestionsRenderFunction?: (
    relatedQuestions: any,
    sendCustomMessage: (message: string) => void,
  ) => JSX.Element | null;
  subqueryRenderFunction?: (
    subqueryQuestion: string[],
    subqueryResponse: string[],
  ) => JSX.Element | null;
  loadingRenderFunction?: (
    text: string,
    themeConfig: ThemeConfig,
    subquery_arrays: any,
    type: number,
  ) => JSX.Element | null;
}) => {
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
      {messages.length === 0 && welcomeMessageRenderFunction(sendCustomMessage)}
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
                <Avatar
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
                <Avatar
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
                      Response
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
                        {botMessageRenderFunction(message, messages[index - 1]?.text)}
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    {message.subqueryQuestion &&
                      message.subqueryResponse &&
                      subqueryRenderFunction(message.subqueryQuestion, message.subqueryResponse)}
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    {message.providers && providerRenderFunction(message.providers)}
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    {message.reference && referenceRenderFunction(message.reference)}
                  </Box>
                  {(message.streamCompleted || message.stream) &&
                    dataRenderFunction(message.graphData)}
                </Box>
                <Box sx={{ display: 'flex' }}>
                  {message.related &&
                    relatedQuestionsRenderFunction(message.related, sendCustomMessage)}
                </Box>
              </Box>
            ) : (
              <Box sx={themeConfig?.components?.MessageBubbleUser?.style}>
                {userMessageRenderFunction(message.text)}
              </Box>
            )}
          </ListItem>
        ))}
        {botMessage && isAnyMessageLoading && !showLinearLoader && (
          <ListItem sx={{ display: 'flex', flexDirection: 'row' }}>
            {loadingRenderFunction(
              getMessage(botMessage.text),
              themeConfig,
              botMessage.subqueryQuestion,
              loaderType,
            )}
          </ListItem>
        )}
        {showLinearLoader && (
          <ListItem
            sx={{ display: 'flex', flexDirection: 'row', maxWidth: isMobile ? '70vw' : '40vw' }}
          >
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
      <div style={{ height: '100px' }} />
    </Box>
  );
};

export default ChatbotCore;
