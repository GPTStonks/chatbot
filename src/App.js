import React, { useState } from 'react';
import { Box, Card, Divider, ThemeProvider, IconButton, Tooltip } from '@mui/material';
import Chatbot from './components/Chatbot';
import GruvboxGraph from './components/Graph';
import Dashboard from './components/Dashboard'; // Importa el componente Dashboard
import { gruvboxTheme } from './theme/Theme';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './App.css';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: gruvboxTheme.palette.background.default, height: '100vh' }}
    >
      <ThemeProvider theme={gruvboxTheme}>
        <img
          src="/logo.png"
          alt="logo"
          style={{ position: 'absolute', left: '1.5%', top: '2%', width: '200px' }}
        />
        <Divider
          orientation="vertical"
          style={{ backgroundColor: '#ebdbb2' }}
          sx={{ position: 'absolute', left: '17vw', height: '95vh', m: 3 }}
        />
        <Box sx={{ position: 'absolute', width: '78vw', right: 0 }}>
          {showDashboard ? <Dashboard /> : <Chatbot />}
          <Tooltip title="Dashboard" placement="top">
            <IconButton
              onClick={toggleDashboard}
              sx={{
                position: 'fixed',
                bottom: '3.5%',
                right: '1.5%',
                backgroundColor: gruvboxTheme.table.headerBackground,
                color: gruvboxTheme.palette.text.primary,
              }}
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
