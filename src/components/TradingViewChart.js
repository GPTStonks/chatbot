import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useTheme, Box, Button } from '@mui/material';
import { Draw } from '@mui/icons-material';

export const TradingViewChart = ({ data, colors = {} }) => {
  const theme = useTheme();
  const {
    backgroundColor = theme.palette.background.darker,
    lineColor = '#2962FF',
    textColor = 'white',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
  } = colors;

  const handleEditClick = () => {
    console.log('Edit button clicked');
  };

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid', color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      [theme.breakpoints.down('sm')]: {
        width: '80vw',
        height: '60vh',
      },
      [theme.breakpoints.down('md')]: {
        width: '40vw',
        height: '40vh',
      },
      [theme.breakpoints.up('lg')]: {
        width: '40vw',
        height: '40vh',
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  return (
    <Box
      ref={chartContainerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          width: '80vw',
          height: '60vh',
        },
        [theme.breakpoints.down('md')]: {
          width: '40vw',
          height: '40vh',
        },
        [theme.breakpoints.up('lg')]: {
          width: '40vw',
          height: '40vh',
        },
        backgroundColor: theme.palette.background.darker,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={handleEditClick}
          sx={{ position: 'relative', top: 0, right: 0, color: theme.palette.success.main }}
        >
          <Draw
            sx={{
              position: 'relative',
              top: 0,
              right: 0,
              color: theme.palette.success.main,
              mr: '0.2rem',
            }}
          />
          Edit
        </Button>
      </Box>
    </Box>
  );
};
