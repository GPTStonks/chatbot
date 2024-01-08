import React, { useState } from 'react';
import {
  Avatar,
  TextField,
  Autocomplete,
  Chip,
  Box,
  Snackbar,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import { COMMANDS, TAGS } from '../constants/commands';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@emotion/react';
import StyleIcon from '@mui/icons-material/Style';

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [showTags, setShowTags] = useState(false);

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleTags = () => {
    setShowTags(!showTags);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.darker,
        height: '5.5vh',
        width: '100vw',
      }}
    >
      {isMobile || isTablet ? (
        <Avatar
          src="/favicon.ico"
          alt="logo"
          sx={{
            marginLeft: '1vw',
            maxHeight: '5vh',
            maxWidth: '5vh',
            [theme.breakpoints.down('sm')]: {
              width: '10vw',
              height: '10vw',
            },
            [theme.breakpoints.up('md')]: {
              width: '3vw',
              height: '3vw',
            },
            [theme.breakpoints.up('lg')]: {
              width: '2vw',
              height: '2vw',
            },
          }}
        />
      ) : (
        <img
          src="/logo.png"
          alt="logo"
          style={{
            marginLeft: '0.5vh',
            maxHeight: '5.5vh',
            marginTop: '0.5vh',
          }}
        />
      )}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Autocomplete
                freeSolo
                options={filteredCommands.map((option) => option.command)}
                onChange={handleCopyCommand}
                size="small"
                sx={{
                  height: '100%',
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Search useful command..."
                    style={{ borderRadius: 25, width: '25vw' }}
                  />
                )}
              />
              <Box>
                <IconButton onClick={toggleTags}>
                  <StyleIcon color="secondary" />
                </IconButton>
                {showTags &&
                  tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      clickable
                      color={tagFilter === tag ? 'primary' : 'default'}
                      onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                    />
                  ))}
              </Box>
            </Box>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={1500}
              onClose={() => setSnackbarOpen(false)}
              sx={{ top: theme.topFixedPercentage }}
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
        </Box>
      )}

      <Box>
        <IconButton onClick={handleClickAvatar}>
          <Avatar
            src="/favicon.ico"
            alt="logo"
            sx={{
              marginLeft: '1vw',
              maxHeight: '5vh',
              maxWidth: '5vh',
              [theme.breakpoints.down('sm')]: {
                width: '10vw',
                height: '10vw',
              },
              [theme.breakpoints.up('md')]: {
                width: '3vw',
                height: '3vw',
              },
              [theme.breakpoints.up('lg')]: {
                width: '2vw',
                height: '2vw',
              },
            }}
          />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
