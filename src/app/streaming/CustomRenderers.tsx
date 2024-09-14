import React from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import { DNA, MutatingDots } from 'react-loader-spinner';
import SubqueryComponent from './test/Loading';

const WelcomeMessageRender = (sendCustomMessage: (message: string) => void) => (
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
    <Typography variant="h4" sx={{ color: 'white' }}>
      Welcome! How can I help you today?
    </Typography>
  </Box>
);

const BotMessageRender = (message: any, input?: string) => (
  <Box
    sx={{
      maxWidth: '100%',
      overflowWrap: 'break-word',
    }}
  >
    <Typography>{message.text}</Typography>
  </Box>
);

const UserMessageRender = (text: string) => (
  <Box>
    <Typography>{text}</Typography>
  </Box>
);

const SubqueryRender = (subqueryQuestion: string[], subqueryResponse: string[]) => (
  <Box>
    <Typography>{subqueryQuestion.join(', ')}</Typography>
    <Typography>{subqueryResponse.join(', ')}</Typography>
  </Box>
);

const ProviderRender = (providers: string[]) => (
  <Box>
    <Typography>{providers.join(', ')}</Typography>
  </Box>
);

const ErrorRenderFunction = (error: any) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '3px 15px',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }}
  >
    <Typography>{error}</Typography>
  </Box>
);

const LoadingMessageRender = (
  text: string,
  themeConfig: any,
  subquery_arrays: any,
  type: number = 1,
) => {
  if (type === 1) {
    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar
          sx={{
            marginRight: '1rem',
            ...themeConfig?.components?.Avatar?.style,
          }}
          src={themeConfig?.components?.Avatar?.botAvatarUrl}
        />
        <Box sx={{ ...themeConfig?.components?.LoaderBot?.style }}>
          <DNA
            visible={true}
            height="60"
            width="60"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <Typography sx={{ marginLeft: '1rem' }}>{text}</Typography>
        </Box>
      </Box>
    );
  } else if (type === 2) {
    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar
          sx={{
            marginRight: '1rem',
            ...themeConfig?.components?.Avatar?.style,
          }}
          src={themeConfig?.components?.Avatar?.botAvatarUrl}
        />
        <Box sx={{ ...themeConfig?.components?.LoaderBot?.style }}>
          <MutatingDots
            visible={true}
            height="60"
            width="60"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <Typography sx={{ marginLeft: '1rem' }}>{text}</Typography>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar
          sx={{
            marginRight: '1rem',
            ...themeConfig?.components?.Avatar?.style,
          }}
          src={themeConfig?.components?.Avatar?.botAvatarUrl}
        />
        <Box sx={{ ...themeConfig?.components?.LoaderBot?.style }}>
          <SubqueryComponent />
        </Box>
      </Box>
    );
  }
};

export {
  WelcomeMessageRender,
  BotMessageRender,
  UserMessageRender,
  SubqueryRender,
  ProviderRender,
  ErrorRenderFunction,
  LoadingMessageRender,
};
