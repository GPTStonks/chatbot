/* useEffect(() => {

        fetch(`${API_DEFAULT_URL}:${API_DEFAULT_PORT}/get_all_available_models`)
            .then(response => response.json())
            .then(data => {
                setModels(data.models);
            });

        fetch(`${API_DEFAULT_URL}:${API_DEFAULT_PORT}/get_current_model`)
            .then(response => response.json())
            .then(data => {
                setCurrentModel(data.currentModel);
            });
    }, []);

    const handleSetLLM = () => {
        fetch(`${API_DEFAULT_URL}:${API_DEFAULT_PORT}/set_current_model`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: selectedModel }),
        })
    };
    */
import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { API_DEFAULT_PORT, API_DEFAULT_URL } from '../constants/API';
import { MODELS } from '../constants/models';
import { useTheme } from '@emotion/react';
import LLMMarkdown from './LLMMarkdown';
import { MARKDOWN_CONTENTS } from '../constants/llms';
import MarkdownStack from './MarkdownStack';
import Sidebar from './Sidebar';
import { Navbar } from './NavBar';

const LLMSelector = () => {
  const theme = useTheme();
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleSetLLM = () => {
    MODELS.get_current_model.currentModel = selectedModel;
  };

  useEffect(() => {
    setModels(MODELS.get_all_available_models.models);
    setCurrentModel(MODELS.get_current_model.currentModel);
  }, []);

  return (
    <>
      <Sidebar />
      <Navbar />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <MarkdownStack markdowns={MARKDOWN_CONTENTS} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="94.5vh"
          >
            <strong>
              <Typography variant="h4" mb={5} color={theme.palette.text.secondary}>
                LLM Selector
              </Typography>
            </strong>
            <Typography variant="h7" color={theme.palette.text.secondary} mb={5}>
              Current LLM: <strong>{currentModel}</strong>
            </Typography>
            <Autocomplete
              value={selectedModel}
              onChange={(event, newValue) => setSelectedModel(newValue)}
              options={models}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Select a Model" variant="outlined" />
              )}
              style={{ width: 300 }}
            />
            <Button
              onClick={() => setConfirmationOpen(true)}
              disabled={!selectedModel || selectedModel === currentModel}
              style={{ marginTop: 20 }}
              variant="outlined"
            >
              Set LLM
            </Button>

            <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
              <DialogTitle>Confirm Selection</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to set {selectedModel} as the current LLM?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setConfirmationOpen(false)} color="primary">
                  No
                </Button>
                <Button onClick={handleSetLLM} color="primary">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LLMSelector;
