import React, { useCallback } from 'react';
import { Box, List, ListItem, Avatar, Typography, Divider } from '@mui/material';
import { DNA } from 'react-loader-spinner';
import LinearBuffer from './LinearBuffer';

const ChatbotCore = ({
  messages,
  themeConfig,
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
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
}) => {
  const WelcomeMessageRender = useCallback(() => {
    return welcomeMessageRenderFunction ? (
      welcomeMessageRenderFunction
    ) : (
      <Box
        sx={{
          position: 'fixed',
          width: '100vw',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
          }}
        >
          Welcome! How can I help you today?
        </Typography>
      </Box>
    );
  }, [welcomeMessageRenderFunction]);

  const BotMessageRender = useCallback(
    (message, input) => {
      return botMessageRenderFunction ? (
        botMessageRenderFunction(message, input)
      ) : (
        <Typography>{message.text}</Typography>
      );
    },
    [botMessageRenderFunction],
  );

  const UserMessageRender = useCallback(
    (text) => {
      return userMessageRenderFunction ? (
        userMessageRenderFunction(text)
      ) : (
        <Typography
          variant="h4"
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          }}
        >
          {text}
        </Typography>
      );
    },
    [userMessageRenderFunction],
  );

  const DataRender = useCallback(
    (data) => {
      return dataRenderFunction ? dataRenderFunction(data) : null;
    },
    [dataRenderFunction],
  );

  const ReferenceRender = useCallback(
    (reference) => {
      return referenceRenderFunction ? referenceRenderFunction(reference) : null;
    },
    [referenceRenderFunction],
  );

  const RelatedQuestionsRender = useCallback(
    (relatedQuestions, sendCustomMessage) => {
      return relatedQuestionsRenderFunction
        ? relatedQuestionsRenderFunction(relatedQuestions, sendCustomMessage)
        : null;
    },
    [relatedQuestionsRenderFunction],
  );

  return (
    <Box
      sx={{
        ...themeConfig.components?.ChatBox?.style,
      }}
    >
      {messages.length === 0 && WelcomeMessageRender()}
      <List>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              flexDirection:
                message.user === botUser
                  ? 'row'
                  : themeConfig?.components.MessageBubbleUser?.style?.flexDirection ||
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
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  {(message.streamCompleted || message.stream) &&
                    ReferenceRender(message.reference)}
                </Box>
                {themeConfig.chatLayoutConfig?.responseHeader && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1em',
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
                    {message.text &&
                      (message.streamCompleted || !message.stream) &&
                      BotMessageRender(message, messages[index - 1]?.text)}
                    {message.stream && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          maxWidth: '100%',
                        }}
                      >
                        <Typography>
                          {message.text.replace(/\\n/g, '  \n').replace(/\\/g, '')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  {(message.streamCompleted || message.stream) && DataRender(message.graphData)}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  {(message.streamCompleted || message.stream) &&
                    RelatedQuestionsRender(message.related, sendCustomMessage)}
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
                {botMessage.text == 'world_knowledge' && '🧭 Navigating the Internet...'}

                {botMessage.text == 'simple_reflection' && 'Wrapping up...'}

                {botMessage.text != 'world_knowledge' && botMessage.text != 'simple_reflection' && (
                  <Typography> Preparing content from {botMessage.text}...</Typography>
                )}
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
