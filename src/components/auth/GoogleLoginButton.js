import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { gruvboxTheme } from '../../theme/Theme';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const renderButton = (renderProps) => (
    <Button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      startIcon={<GoogleIcon />}
      variant="contained"
      size="large"
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: gruvboxTheme.palette.error.main,
        color: 'white',
      }}
    >
      <strong>Log in with Google</strong>
    </Button>
  );

  return (
    <GoogleLogin
      clientId="<GOOGLE_CLIENT_ID>"
      buttonText="Log in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={renderButton}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
