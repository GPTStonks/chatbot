import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, Divider, ThemeProvider, IconButton, Tooltip } from '@mui/material';
import Chatbot from './components/Chatbot';
import GruvboxGraph from './components/Graph';
import Dashboard from './components/Dashboard'; // Importa el componente Dashboard
import { gruvboxTheme } from './theme/Theme';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './App.css';
import Footer from './components/Footer';
import { BsQuestion } from 'react-icons/bs';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const footerRef = useRef(null);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (showFooter && footerRef.current && !footerRef.current.contains(event.target)) {
        setShowFooter(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [showFooter]);

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: gruvboxTheme.palette.background.default,
        position: 'relative',
      }}
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
        <IconButton
          onClick={toggleFooter}
          sx={{
            position: 'fixed',
            bottom: '3.5%',
            left: '1.5%',
            backgroundColor: gruvboxTheme.table.headerBackground,
            color: gruvboxTheme.palette.text.primary,
          }}
        >
          <BsQuestion />
        </IconButton>

        {showFooter && (
          <Card
            ref={footerRef}
            sx={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60vw',
              zIndex: 2,
            }}
          >
            <Footer />
          </Card>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
