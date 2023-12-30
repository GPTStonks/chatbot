import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gruvboxTheme } from '../../theme/Theme';
import GoogleLoginButton from './GoogleLoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function SSOLoginView() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    console.log(username, password);
    navigate('/chat');
  };

  useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: gruvboxTheme.palette.secondaryBackground.main,
      }}
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '10px',
          boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5)',
          backgroundColor: gruvboxTheme.palette.secondaryBackground.main,
          width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' },
        }}
      >
        <CardContent>
          <img
            src="logo.png"
            alt="logo"
            style={{
              width: '90%',
              marginBottom: '5%',
              padding: '0.5rem',
              justifyContent: 'center',
            }}
          />
          {/* <Typography variant="h4" style={{ color: gruvboxTheme.palette.text.primary, marginBottom: '5%' }}>
                        <strong>Login</strong>
                    </Typography> */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: '5%' }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '5%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button size="large" variant="contained" color="primary" fullWidth onClick={handleLogin}>
            <strong>Login</strong>
          </Button>
          <Typography align="center" variant="body1" style={{ margin: '10px 0' }}>
            Or
          </Typography>
          <GoogleLoginButton />
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <Typography align="center" variant="caption">
              <Link to="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
                Privacy Policy
              </Link>
              {" | "}
              <Link to="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>
                Terms of Service
              </Link>
            </Typography>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}
