// MarkdownStack.js
import styled from '@emotion/styled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import LLMMarkdown from './LLMMarkdown';

const MarkdownPaper = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 50%;
  transition:
    transform 1s,
    z-index 1s,
    opacity 0.8s;
  transform: translateY(${(props) => props.offset * props.index * 0.1}px)
    rotate(${(props) => (props.isActive ? '0deg' : '-4deg')});
  opacity: ${(props) => (props.isActive ? '1' : '0.3')};
  z-index: ${(props) => (props.isActive ? props.total : props.total - props.index)};
`;

const MarkdownStack = ({ markdowns }) => {
  //const theme = useTheme();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev < markdowns.length - 1 ? prev + 1 : 0));
  };

  return (
    <Box>
      {markdowns.map((markdown, index) => (
        <MarkdownPaper
          key={index}
          index={index}
          total={markdowns.length}
          offset={1}
          isActive={index === current}
        >
          <LLMMarkdown markdown={markdown} />
        </MarkdownPaper>
      ))}
      <IconButton
        onClick={handleNext}
        color="info"
        size="small"
        style={{ position: 'fixed', marginTop: 10, zIndex: 10, top: '14%', left: '50%' }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default MarkdownStack;
