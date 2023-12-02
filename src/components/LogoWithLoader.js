import React, { useState } from 'react';
import { CircularProgress, Box } from '@mui/material';

function LogoWithLoader() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
      {!loaded && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0.5rem',
          }}
        />
      )}
      <img
        src="logo.png"
        alt="logo"
        style={{
          width: '80%',
          objectFit: 'contain',
          margin: '0.5rem',
          display: loaded ? 'block' : 'none',
        }}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
}

export default LogoWithLoader;
