import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { API_DEFAULT_URL } from '../../constants/API';
import { useTheme } from '@emotion/react';
import { redirect } from 'react-router-dom';

const GoogleLoginButton = () => {
  const theme = useTheme();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await fetch(`${API_DEFAULT_URL}/auth/google/verify-token`, {
        method: 'POST',
        body: JSON.stringify({
          code: codeResponse.code,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      if (tokens && tokens.access_token) {
        localStorage.setItem('access_token', tokens.access_token);
        console.log(tokens.access_token);
        redirect('/chat');
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Button
      startIcon={<GoogleIcon />}
      variant="contained"
      size="large"
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: theme.palette.error.main,
        color: 'white',
      }}
      onClick={() => googleLogin()}
    >
      <strong>Sign in with Google 🚀</strong>
    </Button>
  );
};

export default GoogleLoginButton;
