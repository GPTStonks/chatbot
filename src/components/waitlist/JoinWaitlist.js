import { useTheme } from '@emotion/react';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BsDiscord } from 'react-icons/bs';
import { redirect } from 'react-router-dom';
import { API_DEFAULT_PORT, API_DEFAULT_URL, DISCORD_LINK, GITHUB_LINK } from '../../constants/API';
import './background.css';

export default function JoinWaitlist() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleJoinWaitlist = async () => {
    const response = await fetch(`${API_DEFAULT_URL}:${API_DEFAULT_PORT}/join-waitlist`, {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setSnackbarMessage('Successfully joined the waitlist!');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage('Failed to join the waitlist.');
      setSnackbarSeverity('error');
    }
    setOpenSnackbar(true);
    redirect('/login');
  };

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'absolute',
          zIndex: 9999,
        }}
      >
        {/* <img src="tview.png" alt="tview" style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '30%',
        padding: '0.5rem',
        justifyContent: 'center',
        borderRadius: '10px',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5)',
      }} /> */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: theme.palette.secondaryBackground.main,
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5)',
            [theme.breakpoints.down('md')]: {
              width: '80%',
            },
            [theme.breakpoints.up('md')]: {
              width: '40%',
            },
            [theme.breakpoints.up('lg')]: {
              width: '40%',
            },
            [theme.breakpoints.up('xl')]: {
              width: '30%',
            },
            [theme.breakpoints.up('sm')]: {
              height: '50%',
              width: '30%',
            },
          }}
        >
          <img
            src="logo.png"
            alt="logo"
            style={{
              width: '80%',
              padding: '0.5rem',
              justifyContent: 'center',
            }}
          />
          <Typography
            sx={{
              color: theme.palette.text.primary,
              marginBottom: '5%',
              [theme.breakpoints.down('md')]: {
                fontSize: '1.2rem',
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '1.5rem',
              },
              [theme.breakpoints.up('lg')]: {
                fontSize: '1.5rem',
              },
            }}
          >
            <strong>Join the Waitlist</strong>
          </Typography>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            size="medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: '5%',
            }}
          />
          <Button
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleJoinWaitlist}
          >
            <strong>Join</strong>
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <IconButton href={GITHUB_LINK} target="_blank" color="info">
              <GitHub />
            </IconButton>
            <IconButton href={DISCORD_LINK} target="_blank" color="info">
              <BsDiscord />
            </IconButton>
            <IconButton href="" target="_blank" color="info">
              <Twitter />
            </IconButton>
            <IconButton href="" target="_blank" color="info">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <div class="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}
