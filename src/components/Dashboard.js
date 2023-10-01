import { Box, Card, Divider, Grid, ThemeProvider } from '@mui/material';

import { sentimentData } from '../const';
import GruvboxGraph from './Graph';

import { useTheme } from '@emotion/react';

function Dashboard() {
  const theme = useTheme();
  return (
    <div
      className="Dashboard"
      style={{ backgroundColor: theme.palette.background.default, height: '100vh' }}
    >
      <Box sx={{ p: 3 }}>
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
    </div>
  );
}

export default Dashboard;
