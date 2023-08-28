import { Box, Card, CardContent, Divider, ThemeProvider, Grid } from '@mui/material';

import Chatbot from './Chatbot';
import GruvboxGraph from './Graph';
import { gruvboxTheme } from '../theme/Theme';
import { mockData, sentimentData } from '../const';


function Dashboard() {
  return (
    <div className="Dashboard" style={{ backgroundColor: gruvboxTheme.palette.background.default, height: "100vh" }}>
      <ThemeProvider theme={gruvboxTheme}>
        <Divider orientation='vertical' style={{ backgroundColor: '#ebdbb2' }} sx={{ position: "absolute", left: "17vw", height: "95vh", m: 3 }} />
        <Box sx={{ position: "absolute", width: "78vw", right: 0, p: 3 }}>
          <Grid container spacing={3}>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Card>
                  <GruvboxGraph someData={sentimentData}/>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <GruvboxGraph />
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <GruvboxGraph />
                </Card>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Card>
                  <GruvboxGraph />
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <GruvboxGraph />
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <GruvboxGraph />
                </Card>
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Dashboard;
