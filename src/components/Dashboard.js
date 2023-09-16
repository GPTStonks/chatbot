import { Box, Card, Divider, Grid, ThemeProvider } from '@mui/material';

import { sentimentData } from '../const';
import { gruvboxTheme } from '../theme/Theme';
import GruvboxGraph from './Graph';

function Dashboard() {
  return (
    <div
      className="Dashboard"
      style={{ backgroundColor: gruvboxTheme.palette.background.default, height: '100vh' }}
    >
      <ThemeProvider theme={gruvboxTheme}>
        <Divider
          orientation="vertical"
          style={{ backgroundColor: '#ebdbb2' }}
          sx={{ position: 'absolute', left: '17vw', height: '95vh', m: 3 }}
        />
        <Box sx={{ position: 'absolute', width: '78vw', right: 0, p: 3 }}>
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Card>
                  <GruvboxGraph someData={sentimentData} />
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
