import { Box, Grid } from '@mui/material';
import React from 'react';
import { MARKDOWN_CONTENTS } from '../constants/llms';
import MarkdownStack from './MarkdownStack';
import { Navbar } from './NavBar';
import Sidebar from './Sidebar';

const LLMSelector = () => {
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
      </Grid>
    </>
  );
};

export default LLMSelector;
