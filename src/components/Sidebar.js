import { useTheme } from '@emotion/react';
import { Dashboard, Home, Key, NavigateBefore } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LogoWithLoader from './LogoWithLoader';

function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {!drawerOpen ? (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'absolute',
            left: theme.spacing(1),
            top: '50%',
            ':hover': { backgroundColor: theme.hoverBackgroundColor },
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <NavigateNextIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'absolute',
            left: theme.spacing(1),
            top: '50%',
            ':hover': { backgroundColor: theme.hoverBackgroundColor },
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <NavigateBefore color="primary" />
        </IconButton>
      )}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '40vw',
            [theme.breakpoints.down('sm')]: {
              width: '80vw',
            },
            [theme.breakpoints.up('md')]: {
              width: '40vw',
            },
            [theme.breakpoints.up('lg')]: {
              width: '20vw',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <LogoWithLoader />

            <List>
              {/* Lista de items con iconos */}
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/home"
                  sx={{ '&:hover': { backgroundColor: theme.hoverBackgroundColor } }}
                >
                  <ListItemIcon>
                    <Home color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/apiKeyList"
                  sx={{ '&:hover': { backgroundColor: theme.hoverBackgroundColor } }}
                >
                  <ListItemIcon>
                    <Key color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="API Keys" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/llmSelector"
                  sx={{ '&:hover': { backgroundColor: theme.hoverBackgroundColor } }}
                >
                  <ListItemIcon>
                    <SettingsSuggestIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="LLM Selector" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/aboutus"
                  sx={{ '&:hover': { backgroundColor: theme.hoverBackgroundColor } }}
                >
                  <ListItemIcon>
                    <InfoIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="About Us" />
                </ListItemButton>
              </ListItem>

              <Divider />
            </List>
          </Box>

          <Box sx={{ p: 2, textAlign: 'center', mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' } }}
            >
              @GPTStonks. 2023
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
