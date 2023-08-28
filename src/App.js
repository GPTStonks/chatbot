import { Box, Card, CardContent, Divider, ThemeProvider } from '@mui/material';

import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import GruvboxGraph from './components/Graph';
import { gruvboxTheme } from './theme/Theme';

import './App.css';

function App() {
  const test = false;
  return (
    <div className="App" style={{ backgroundColor: gruvboxTheme.palette.background.default, height: "100vh" }}>
      <ThemeProvider theme={gruvboxTheme}>
        <Divider orientation='vertical' style={{ backgroundColor: '#ebdbb2' }} sx={{ position: "absolute", left: "17vw", height: "95vh", m: 3 }} />
        <Box sx={{ position: "absolute", width: "78vw", right: 0 }}>
          {test ? <Card sx={{width: "30%"}}>
              <GruvboxGraph />
          </Card> : <Chatbot />}
{/*           <Dashboard/> */}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
