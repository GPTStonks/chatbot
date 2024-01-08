import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TOKEN_ENDPOINT } from '../constants/API';
import Sidebar from './Sidebar';
import { Navbar } from './NavBar';

export default function ApiTokens() {
  const theme = useTheme();
  const [token, setToken] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchToken = async () => {
    try {
      const response = await fetch(`${TOKEN_ENDPOINT}`);
      const data = await response.json();
      if (data.openbb) {
        setToken(data.openbb);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const updateToken = async (newToken) => {
    try {
      await fetch(`${TOKEN_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ openbb: newToken }),
      });
      setSnackbarMessage('Token updated successfully!');
      setOpenSnackbar(true);
      fetchToken();
    } catch (error) {
      console.error('Error updating token:', error);
      setSnackbarMessage('Failed to update token.');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          pt: 3,
          pb: 3,
          px: 3,
        }}
      >
        <Typography variant="h4" mb={5} color="textSecondary">
          API Tokens
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1" mb={3} color="textSecondary">
            If you want to use <strong>OpenBB</strong> API, provide here your OpenBB PAT (Personal
            Access Token).
          </Typography>
          <TextField
            id="outlined-basic"
            label="API Token"
            variant="outlined"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" onClick={() => updateToken(token)}>
            Update Token
          </Button>
        </Paper>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
