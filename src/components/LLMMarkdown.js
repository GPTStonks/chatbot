// Markdown component for LLMS

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Paper } from '@mui/material';

const LLMMarkdown = ({ markdown }) => {
  return (
    <Paper sx={{ textAlign: 'left', padding: 5, marginTop: 5, marginLeft: 5, maxHeight: '100vh' }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Paper>
  );
};
export default LLMMarkdown;
