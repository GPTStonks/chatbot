import { Box, Card, CardContent, Divider, ThemeProvider } from '@mui/material';

import Chatbot from './components/Chatbot';
import GruvboxGraph from './components/Graph';
import { gruvboxTheme } from './theme/Theme';

import './App.css';

function App() {
  const test = true;
  return (
    <div className="App" style={{ backgroundColor: gruvboxTheme.palette.background.default, height: "100vh" }}>
      <ThemeProvider theme={gruvboxTheme}>
        <Divider orientation='vertical' style={{ backgroundColor: '#ebdbb2' }} sx={{ position: "absolute", left: "17vw", height: "95vh", m: 3 }} />
        <Box sx={{ position: "absolute", width: "78vw", right: 0 }}>
          {test ? <Card sx={{width: "30%"}}>
              <GruvboxGraph />
          </Card> : <Chatbot />}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
