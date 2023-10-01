import React, { useState, useRef, useEffect } from 'react';

// React Router imports
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// MUI imports
import { Box, Card, Divider, ThemeProvider, IconButton, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyIcon from '@mui/icons-material/Key';

// Custom components imports
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import ApikeyList from './components/ApikeyList';

// Icons & Themes
import { gruvboxTheme } from './theme/Theme';
import { BsQuestion } from 'react-icons/bs';

// App styles
import './App.css';
import { Home } from '@mui/icons-material';

/**
 * Main App component that renders the overall layout and routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
function App() {
  const [showFooter, setShowFooter] = useState(false);
  const footerRef = useRef(null);

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={gruvboxTheme}>
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
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apiKeyList" element={<ApikeyList />} />
          </Routes>

          <Link to="/dashboard">
            <Tooltip title="Dashboard" placement="top">
              <IconButton
                sx={{
                  position: 'fixed',
                  bottom: '8.5%',
                  right: '1.5%',
                  backgroundColor: gruvboxTheme.table.headerBackground,
                  color: gruvboxTheme.palette.text.primary,
                }}
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link to="/">
            <Tooltip title="Home" placement="bottom">
              <IconButton
                sx={{
                  position: 'fixed',
                  bottom: '3.5%',
                  right: '1.5%',
                  backgroundColor: gruvboxTheme.table.headerBackground,
                  color: gruvboxTheme.palette.text.primary,
                }}
              >
                <Home />
              </IconButton>
            </Tooltip>
          </Link>
          <Link to="/apiKeyList">
            <Tooltip title="API Settings" placement="top">
              <IconButton
                sx={{
                  position: 'fixed',
                  top: '3.5%',
                  right: '1.5%',
                  backgroundColor: gruvboxTheme.table.headerBackground,
                  color: gruvboxTheme.palette.text.primary,
                }}
              >
                <KeyIcon />
              </IconButton>
            </Tooltip>
          </Link>
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
              <Footer closeFooter={toggleFooter} />
            </Card>
          )}
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
