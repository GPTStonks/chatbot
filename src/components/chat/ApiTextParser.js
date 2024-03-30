import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import Lightbulb from '@mui/icons-material/Lightbulb';
import Warning from '@mui/icons-material/Warning';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '@mui/material/styles';
import './markdown.css';

const ApiTextParser = ({ text }) => {
  const theme = useTheme();

  const parseText = (inputText) => {
    if (!inputText) return null;
    let text_ = inputText.toString().replace(/"/g, '').replace(/\\n/g, '  \n').replace(/\\/g, '');
    const splitIndex = text_.indexOf('\n');
    let firstPart = text_.substring(0, splitIndex);
    let secondPart = text_.substring(splitIndex + 2);

    if (text_.includes('`openbb`')) {
      firstPart = secondPart;
      secondPart = '';
    }

    if (
      text_.startsWith('> ') &&
      !text_.includes('OpenBBError') &&
      text_.includes("OpenBB's functions called:")
    ) {
      return renderInfoBox(text_);
    } else if (text_.startsWith('> ') && !text_.includes('OpenBBError')) {
      return renderInfoBox(firstPart, secondPart);
    } else if (text_.includes('OpenBBError')) {
      return renderErrorBox();
    } else {
      return renderDefaultBox(text_);
    }
  };

  const renderInfoBox = (firstPart, secondPart = '') => (
    <Box sx={{ m: '0.5em 0 0.5em 0' }}>
      <Box sx={getBoxStyle()}>
        <Box sx={getFlexRowStyle()}>
          <Lightbulb color="success" sx={{ fontSize: '1rem' }} />
          <Typography variant="body2" color="success" sx={{ ml: 1 }}>
            Info
          </Typography>
        </Box>
        <Box sx={{ ml: 1 }}>
          <ReactMarkdown>
            {firstPart.replace('>', '').replace('Use with caution.', '')}
          </ReactMarkdown>
        </Box>
      </Box>
      {secondPart && <ReactMarkdown className="markdown-content">{secondPart}</ReactMarkdown>}
    </Box>
  );

  const renderErrorBox = () => (
    <Box sx={{ m: '0.5em 0 0.5em 0' }}>
      <Box sx={getBoxStyle()}>
        <Box sx={getFlexRowStyle()}>
          <Warning color="warning" sx={{ fontSize: '1rem' }} />
          <Typography variant="body2" color="success" sx={{ ml: 1 }}>
            Warning
          </Typography>
        </Box>
        <ReactMarkdown>Some internal OpenBB error ocurred. Try again later. Sorry!</ReactMarkdown>
      </Box>
    </Box>
  );

  const renderDefaultBox = (text_) => (
    <Box sx={{ m: 1 }}>
      <ReactMarkdown components={{ p: Typography, a: ({ node, ...props }) => <Link {...props} /> }}>
        {text_}
      </ReactMarkdown>
    </Box>
  );

  const getBoxStyle = () => ({
    borderLeft: '4px solid #ffa726',
    padding: '0.5em',
    margin: '0.5em 0',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '0.85rem',
    },
  });

  const getFlexRowStyle = () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });

  return parseText(text);
};

export default ApiTextParser;
