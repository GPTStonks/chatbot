import { useTheme } from '@emotion/react';
import Send from '@mui/icons-material/Send';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';
import { SendButton } from './SendButton';

function CommandTextfield({
  newMessage,
  setNewMessage,
  isMobile,
  sendMessage,
  handleKeyDown,
  disableButtonClick,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        right: 0,
        bottom: '3%',
        left: 0,
        alignItems: 'center',
      }}
    >
      <TextField
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        label="Write your message here"
        size={isMobile ? 'small' : 'medium'}
        sx={{
          [theme.breakpoints.down('sm')]: {
            width: '75%',
            fontSize: '0.4rem',
          },
          [theme.breakpoints.up('md')]: {
            width: '75%',
          },
          [theme.breakpoints.up('lg')]: {
            width: '50%',
          },
        }}
        onKeyDown={handleKeyDown}
      />
      {!isMobile ? (
        <SendButton handleClick={sendMessage} isDisabled={disableButtonClick} />
      ) : (
        <IconButton
          onClick={sendMessage}
          size="small"
          sx={{
            ml: 1,
            backgroundColor: 'primary.main',
            color: theme.palette.primary.contrastText,
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          <Send />
        </IconButton>
      )}
    </Box>
  );
}

export default CommandTextfield;
