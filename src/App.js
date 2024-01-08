import React from 'react';

// React Router imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// MUI imports
import { ThemeProvider } from '@mui/material';

// Custom components imports
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

// Icons & Themes
import { gruvboxTheme } from './theme/Theme';
// App styles
import './App.css';
import ApiTokens from './components/ApiTokens';
import LLMSelector from './components/LLMSelector';

/**
 * Main App component that renders the overall layout and routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={gruvboxTheme}>
        <div
          className="App"
          style={{
            backgroundColor: gruvboxTheme.palette.background.default,
          }}
        >
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/apiKeyList" element={<ApiTokens />} />
            <Route path="/llmSelector" element={<LLMSelector />} />
            <Route path="/aboutus" element={<Footer />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
