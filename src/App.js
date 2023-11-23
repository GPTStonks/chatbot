import React, { useRef, useState } from 'react';

// React Router imports
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// MUI imports
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyIcon from '@mui/icons-material/Key';
import { Card, IconButton, ThemeProvider, Tooltip } from '@mui/material';
import { GiArtificialIntelligence } from 'react-icons/gi';

// Custom components imports
import ApikeyList from './components/ApikeyList';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

// Icons & Themes
import { BsQuestion } from 'react-icons/bs';
import {
  bottomFixedPercentage,
  dashboardOffsetBotPercentage,
  fixedButtonsZIndex,
  gruvboxTheme,
  leftFixedPercentage,
  rightFixedPercentage,
  topFixedPercentage,
} from './theme/Theme';
// App styles
import { Home } from '@mui/icons-material';
import './App.css';
import LLMSelector from './components/LLMSelector';
import SSOLoginView from './components/auth/SSOLoginView';

/**
 * Main App component that renders the overall layout and routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
function App() {
  const [showFooter, setShowFooter] = useState(false);
  const [shouldShowIcons, setShouldShowIcons] = useState(false);
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
            minHeight: '100%',
            minWidth: '100%',
          }}
        >
          <Routes>
            <Route path="/" element={<SSOLoginView setShouldShowIcons={setShouldShowIcons} />} />
            <Route
              path="/login"
              element={<SSOLoginView setShouldShowIcons={setShouldShowIcons} />}
            />
            <Route path="/home" element={<Chatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apiKeyList" element={<ApikeyList />} />
            <Route path="/llmSelector" element={<LLMSelector />} />
          </Routes>

          {shouldShowIcons && (
            <>
              <Link to="/dashboard">
                <Tooltip title="Dashboard" placement="top">
                  <IconButton
                    sx={{
                      position: 'fixed',
                      bottom: dashboardOffsetBotPercentage,
                      right: rightFixedPercentage,
                      backgroundColor: gruvboxTheme.table.headerBackground,
                      color: gruvboxTheme.palette.text.primary,
                      zIndex: fixedButtonsZIndex,
                    }}
                  >
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
              </Link>

              <Link to="/home">
                <Tooltip title="Home" placement="bottom">
                  <IconButton
                    sx={{
                      position: 'fixed',
                      bottom: bottomFixedPercentage,
                      right: rightFixedPercentage,
                      backgroundColor: gruvboxTheme.table.headerBackground,
                      color: gruvboxTheme.palette.text.primary,
                      zIndex: fixedButtonsZIndex,
                    }}
                  >
                    <Home />
                  </IconButton>
                </Tooltip>
              </Link>

              <Link to="/llmSelector">
                <Tooltip title="LLM Selector" placement="bottom">
                  <IconButton
                    sx={{
                      position: 'fixed',
                      top: '8%',
                      right: rightFixedPercentage,
                      backgroundColor: gruvboxTheme.table.headerBackground,
                      color: gruvboxTheme.palette.text.primary,
                      zIndex: fixedButtonsZIndex,
                    }}
                  >
                    <GiArtificialIntelligence />
                  </IconButton>
                </Tooltip>
              </Link>

              <Link to="/apiKeyList">
                <Tooltip title="API Settings" placement="top">
                  <IconButton
                    sx={{
                      position: 'fixed',
                      top: topFixedPercentage,
                      right: rightFixedPercentage,
                      backgroundColor: gruvboxTheme.table.headerBackground,
                      color: gruvboxTheme.palette.text.primary,
                      zIndex: fixedButtonsZIndex,
                    }}
                  >
                    <KeyIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </>
          )}

          <Tooltip title="Information" placement="top">
            <IconButton
              onClick={toggleFooter}
              sx={{
                position: 'fixed',
                bottom: bottomFixedPercentage,
                left: leftFixedPercentage,
                backgroundColor: gruvboxTheme.table.headerBackground,
                color: gruvboxTheme.palette.text.primary,
                zIndex: fixedButtonsZIndex,
              }}
            >
              <BsQuestion />
            </IconButton>
          </Tooltip>
          {showFooter && (
            <Card
              ref={footerRef}
              sx={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: fixedButtonsZIndex + 1,
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
