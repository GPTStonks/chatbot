import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { DNA } from 'react-loader-spinner';

const defaultWelcomeMessageRenderFunction = (sendCustomMessage: (message: string) => void) => (
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

const defaultBotMessageRenderFunction = (message: any, input: string) => (
  <Box
    sx={{
      maxWidth: '100%',
      overflowWrap: 'break-word',
    }}
  >
    <Typography>{message.text}</Typography>
  </Box>
);

const defaultUserMessageRenderFunction = (text: string) => (
  <Box>
    <Typography>{text}</Typography>
  </Box>
);

const defaultSubqueryRenderFunction = (subqueryQuestion: string[], subqueryResponse: string[]) => (
  <Box>
    <Typography variant="h5">{subqueryQuestion.join(', ')}</Typography>
    <Typography variant="h6">{subqueryResponse.join(', ')}</Typography>
  </Box>
);

const defaultLoadingRenderFunction = (
  text: string,
  themeConfig: any,
  subquery_arrays: any,
  type: number = 1,
) => {
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
};

const DefaultRenderFunctions = {
  defaultWelcomeMessageRenderFunction,
  defaultBotMessageRenderFunction,
  defaultUserMessageRenderFunction,
  defaultSubqueryRenderFunction,
  defaultLoadingRenderFunction,
};

export default DefaultRenderFunctions;
