import React, { useState } from 'react';
import { TextField, Autocomplete, Chip, Box, Snackbar, IconButton } from '@mui/material';
import { COMMANDS, TAGS } from '../constants/commands';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  commandSearchOffsetRightPercentage,
  commandSearchZindex,
  gruvboxTheme,
  topFixedPercentage,
} from '../theme/Theme';
import { useTheme } from '@emotion/react';

const UsefulCommands = () => {
  const theme = useTheme();
  const [tagFilter, setTagFilter] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const commands = COMMANDS;

  const tags = TAGS;

  const filteredCommands = tagFilter
    ? commands.filter((command) => command.tags.includes(tagFilter))
    : commands;

  const handleCopyCommand = (event, value) => {
    if (value) {
      navigator.clipboard.writeText(value);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        width: '25vw',
        position: 'fixed',
        right: commandSearchOffsetRightPercentage,
        top: topFixedPercentage,
        zIndex: commandSearchZindex,
      }}
    >
      <Autocomplete
        freeSolo
        options={filteredCommands.map((option) => option.command)}
        onChange={handleCopyCommand}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search useful command..."
            style={{ borderRadius: 25 }}
          />
        )}
        size="small"
      />
      <Box display="flex" justifyContent="center" mt={1}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            clickable
            color={tagFilter === tag ? 'primary' : 'default'}
            onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
          />
        ))}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        sx={{ top: topFixedPercentage }}
        message={
          <span>
            <IconButton
              size="small"
              style={{ color: theme.palette.secondary.main, marginRight: 5 }}
            >
              <CheckCircleIcon />
            </IconButton>
            Command copied to clipboard!
          </span>
        }
        ContentProps={{
          style: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.secondary,
          },
        }}
      />
    </Box>
  );
};

export default UsefulCommands;
