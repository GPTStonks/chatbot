import React from 'react';

// React Router imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// MUI imports
import { ThemeProvider } from '@mui/material';

// Custom components imports
import ApikeyList from './components/ApikeyList';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

// Icons & Themes
import { gruvboxTheme } from './theme/Theme';
// App styles
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import LLMSelector from './components/LLMSelector';
import SSOLoginView from './components/auth/SSOLoginView';
import JoinWaitlist from './components/waitlist/JoinWaitlist';
import { GOOGLE_CLIENT_ID } from './constants/env';

/**
 * Main App component that renders the overall layout and routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={gruvboxTheme}>
          <div
            className="App"
            style={{
              backgroundColor: gruvboxTheme.palette.background.default,
            }}
          >
            <Routes>
              <Route path="/" element={<SSOLoginView />} />
              <Route path="/joinwaitlist" element={<JoinWaitlist />} />
              <Route path="/login" element={<SSOLoginView />} />
              <Route path="/home" element={<Chatbot />} />
              <Route path="/apiKeyList" element={<ApikeyList />} />
              <Route path="/llmSelector" element={<LLMSelector />} />
              <Route path="/aboutus" element={<Footer />} />
            </Routes>
          </div>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
