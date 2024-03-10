import { Button, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';

export const SendButton = ({ isDisabled, handleClick }) => {
  useEffect(() => {}, [isDisabled]);
  return (
    <>
      {isDisabled ? (
        <Tooltip title="Wait till query is completed..." color="primary">
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              ml: 1,
              textDecoration: 'line-through',
              '&:hover': {
                textDecoration: 'line-through',
              },
            }}
          >
            Send
          </Button>
        </Tooltip>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleClick} sx={{ ml: 1 }}>
          Send
        </Button>
      )}
    </>
  );
};
