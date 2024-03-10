import React from 'react';

// React Router imports
import { BrowserRouter } from 'react-router-dom';

// MUI imports
import { Grid, ThemeProvider } from '@mui/material';

// Custom components imports
import Chatbot from './components/chat/Chatbot';

// Icons & Themes
import { gruvboxTheme } from './theme/Theme';
// App styles
import './App.css';

/**
 * Main App component that renders the overall layout and routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
function App( { background_image_url}) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={gruvboxTheme}>
        <div
          className="App"
          style={{
            backgroundColor: gruvboxTheme.palette.background.default,
            backgroundImage: `url(${background_image_url})`,
            inset: '0',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/*Grid with two narrow colums and one central big column*/}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={10} md={7}>
              <Chatbot />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
