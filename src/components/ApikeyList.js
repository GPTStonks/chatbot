import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';

import { useTheme } from '@emotion/react';
import SaveIcon from '@mui/icons-material/Save';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { API_DEFAULT_PORT, API_DEFAULT_URL } from '../constants/API';

function ApikeyList() {
  const theme = useTheme();
  const [apiKeys, setApiKeys] = useState({});
  const [availableAPIs, setAvailableAPIs] = useState({});
  const [filter, setFilter] = useState('all'); // 'all', 'configured', 'notConfigured'
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    async function fetchAPIKeys() {
      try {
        const response = await fetch(`${API_DEFAULT_URL}:${API_DEFAULT_PORT}/get_api_keys`);
        const data = await response.json();
        setAvailableAPIs(data.result);
      } catch (error) {
        console.error('Error al obtener las API keys:', error);
      }
    }

    fetchAPIKeys();
  }, []);

  const handleInputChange = (api, key) => (event) => {
    setApiKeys((prevState) => ({
      ...prevState,
      [api]: {
        ...(prevState[api] || {}),
        [key]: event.target.value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_DEFAULT_PORT}:${API_DEFAULT_PORT}/set_api_keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keys_dict: apiKeys }),
      });
      const responseData = await response.json();

      if (responseData.status === 'Keys set correctly') {
        setAlert({
          open: true,
          message: 'Configuration saved successfully',
          severity: 'success',
        });
      } else {
        setAlert({
          open: true,
          message: responseData.status,
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error saving API keys:', error);
      setAlert({
        open: true,
        message: 'Error saving API keys.',
        severity: 'error',
      });
    }
  };

  const isConfigured = (api) => {
    return Object.keys(apiKeys).includes(api) && Object.values(apiKeys[api]).some((v) => !!v);
  };
  const anyConfigured = () => {
    return Object.keys(availableAPIs).some((api) => isConfigured(api));
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          severity={alert.severity}
          icon={
            alert.severity === 'success' ? (
              <CheckCircleIcon fontSize="inherit" />
            ) : (
              <ErrorIcon fontSize="inherit" />
            )
          }
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
      >
        <DialogTitle id="info-dialog-title">Information</DialogTitle>
        <DialogContent>
          <DialogContentText id="info-dialog-description">
            More information on how to find and set API keys can be found at{' '}
            <strong>https://docs.openbb.co/terminal/usage/guides/api-keys</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {Object.keys(availableAPIs).length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <CircularProgress color="info" />
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 5, mb: 3, color: theme.palette.text.primary }}
          >
            Loading APIs...
          </Typography>
        </Box>
      ) : (
        <Paper
          style={{
            marginTop: 20,
            marginBot: 20,
            padding: 16,
            margin: 'auto',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px',
          }}
        >
          <Box display="flex" alignItems={'center'} justifyContent={'space-between'} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<InfoIcon />}
              onClick={handleOpenDialog}
              color="info"
              sx={{ zIndex: 1000 }}
            >
              Info
            </Button>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mt: 5, mb: 3, fontWeight: 'bold', position: 'absolute', right: 0, left: 0 }}
            >
              API Keys Settings
            </Typography>

            <FormControl
              sx={{
                width: '8vw',
                mt: 2,
              }}
            >
              <InputLabel id="filter-label">Filter</InputLabel>
              <Select
                labelId="filter-label"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="configured">Configured</MenuItem>
                <MenuItem value="notConfigured">Not Configured</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="caption" display="flex" width="30vw" marginTop={3}>
            In this section you can set the API keys for the APIs you want to use.
          </Typography>

          <List sx={{ bgcolor: 'background.paper' }}>
            {Object.entries(availableAPIs).length === 0 && filter === 'all' ? (
              <Typography variant="h6" align="center" sx={{ mt: 5, mb: 3 }}>
                Loading APIs...
              </Typography>
            ) : (
              <>
                {Object.entries(availableAPIs).map(([api, keys]) => {
                  if (
                    (filter === 'configured' && !isConfigured(api)) ||
                    (filter === 'notConfigured' && isConfigured(api))
                  ) {
                    return null;
                  }
                  return (
                    <Box key={api}>
                      <ListItem
                        sx={{ alignItems: 'flex-start', flexDirection: 'row' }}
                        disablePadding
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={keys.some((key) => apiKeys[api] && apiKeys[api][key])}
                            tabIndex={-1}
                            disableRipple
                            disabled
                            sx={{
                              mt: 1,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={<strong>{api.toUpperCase()}</strong>}
                          sx={{ mt: 2, mr: 2 }}
                        />

                        {keys.map((key) => (
                          <TextField
                            key={`${api}-${key}`}
                            label={key}
                            variant="outlined"
                            value={apiKeys[api]?.[key] || ''}
                            onChange={handleInputChange(api, key)}
                            placeholder="API Key"
                            size="small"
                            sx={{ mt: 1, ml: 2, maxWidth: '7.5vw', fontStyle: 'italic' }}
                          />
                        ))}
                      </ListItem>
                      <Divider orientation="horizontal" sx={{ flexDirection: 'column', m: 2 }} />
                    </Box>
                  );
                })}

                {filter === 'configured' && !anyConfigured() && (
                  <Typography variant="h7" align="center" sx={{ mt: 5, mb: 3 }}>
                    Not found any configured API keys. Make sure to set some and save!
                  </Typography>
                )}

                {filter === 'notConfigured' &&
                  anyConfigured() &&
                  Object.keys(availableAPIs).length === Object.keys(apiKeys).length && (
                    <Typography variant="h6" align="center" sx={{ mt: 5, mb: 3 }}>
                      All APIs are configured.
                    </Typography>
                  )}
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ mt: 3, position: 'fixed', bottom: '5%', width: '5vw' }}
            >
              Save
            </Button>
          </List>
        </Paper>
      )}
    </>
  );
}

export default ApikeyList;
