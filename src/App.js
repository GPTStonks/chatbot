import { Box, Divider, ThemeProvider } from '@mui/material';

import Chatbot from './components/Chatbot';
import { gruvboxTheme } from './theme/Theme';

import './App.css';

function App() {
  return (
    <div className="App" style={{ backgroundColor: gruvboxTheme.palette.background.default, height: "100vh" }}>
      <ThemeProvider theme={gruvboxTheme}>
        <Divider orientation='vertical' style={{ backgroundColor: '#ebdbb2' }} sx={{ position: "absolute", left: "17vw", height: "95vh", m: 3 }} />
        <Box sx={{ position: "absolute", width: "78vw", right: 0 }}>
          <Chatbot />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
