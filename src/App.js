import React from 'react';

// React Router imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// MUI imports
import { ThemeProvider } from '@mui/material';

// Custom components imports
import ApikeyList from './components/ApikeyList';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

// Icons & Themes
import { gruvboxTheme } from './theme/Theme';
// App styles
import './App.css';
import LLMSelector from './components/LLMSelector';
import { TradingViewChart } from './components/TradingViewChart';
import SSOLoginView from './components/auth/SSOLoginView';

/**
 * Main App component that renders the overall layout and routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
function App() {
  const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2019-12-31', value: 22.67 },
  ];

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
            <Route path="/" element={<SSOLoginView />} />
            <Route path="/login" element={<SSOLoginView />} />
            <Route path="/home" element={<Chatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apiKeyList" element={<ApikeyList />} />
            <Route path="/llmSelector" element={<LLMSelector />} />
            <Route path="/aboutus" element={<Footer />} />
            <Route path="/graph" element={<TradingViewChart data={initialData} />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
