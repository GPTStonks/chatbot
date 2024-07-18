import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Message } from '@/types/message';

const RenderFunctions = ({
  welcomeMessageRenderFunction,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  providerRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  subqueryRenderFunction,
}: {
  welcomeMessageRenderFunction?: Function;
  botMessageRenderFunction?: Function;
  userMessageRenderFunction?: Function;
  dataRenderFunction?: Function;
  providerRenderFunction?: Function;
  referenceRenderFunction?: Function;
  relatedQuestionsRenderFunction?: Function;
  subqueryRenderFunction?: Function;
  sendCustomMessage: Function;
}) => {
  const WelcomeMessageRender = useCallback(
    (sendCustomMessage: (message: string) => void) => {
      return welcomeMessageRenderFunction ? (
        welcomeMessageRenderFunction(sendCustomMessage)
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
    },
    [welcomeMessageRenderFunction],
  );

  const BotMessageRender = useCallback(
    (message: Message, input: string) => {
      return botMessageRenderFunction ? (
        botMessageRenderFunction(message, input)
      ) : (
        <Typography>{message.text}</Typography>
      );
    },
    [botMessageRenderFunction],
  );

  const UserMessageRender = useCallback(
    (text: string) => {
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
    (data: any) => {
      return dataRenderFunction ? dataRenderFunction(data) : null;
    },
    [dataRenderFunction],
  );

  const ProviderRender = useCallback(
    (providers: any) => {
      return providerRenderFunction ? providerRenderFunction(providers) : null;
    },
    [providerRenderFunction],
  );

  const ReferenceRender = useCallback(
    (reference: any) => {
      return referenceRenderFunction ? referenceRenderFunction(reference) : null;
    },
    [referenceRenderFunction],
  );

  const RelatedQuestionsRender = useCallback(
    (relatedQuestions: any, sendCustomMessage: (message: string) => void) => {
      return relatedQuestionsRenderFunction
        ? relatedQuestionsRenderFunction(relatedQuestions, sendCustomMessage)
        : null;
    },
    [relatedQuestionsRenderFunction],
  );

  const SubqueryRender = useCallback(
    (subqueryQuestion: any, subqueryResponse: any) => {
      return subqueryRenderFunction
        ? subqueryRenderFunction(subqueryQuestion, subqueryResponse)
        : null;
    },
    [subqueryRenderFunction],
  );

  return {
    WelcomeMessageRender,
    BotMessageRender,
    UserMessageRender,
    DataRender,
    ProviderRender,
    ReferenceRender,
    RelatedQuestionsRender,
    SubqueryRender,
  };
};

export default RenderFunctions;
