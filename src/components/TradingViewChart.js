import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useTheme, Box, Button } from '@mui/material';
import { Draw } from '@mui/icons-material';

export const TradingViewChart = ({ data, colors = {} }) => {
  const [graphData, setGraphData] = useState([]);
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

  const transformDataToGraph = (data) => {
    try {
      const timeSeries = Object.keys(data).map((key) => {
        if (!isNaN(key)) {
          return new Date(parseInt(key)).toISOString().split('T')[0];
        }
        return key;
      });

      const pandasIndices = [
        ...new Set(Object.values(data).flatMap((serieData) => Object.keys(serieData))),
      ];

      const directValues = Object.values(data).map((row) => {
        return pandasIndices.map((index) => {
          return row[index] ?? null;
        });
      });

      const rows = timeSeries.map((time, i) => {

        let valuesForRow = directValues[i]
          ? directValues[i]
          : new Array(pandasIndices.length).fill(null);

        let row = [time, ...valuesForRow];

        return row;
      });

      let newHeaders = [];

      if (typeof timeSeries[0] === Date) {
        newHeaders = ['Time', ...pandasIndices];
      } else {
        newHeaders = ['Key', ...pandasIndices];
      }
      console.log(newHeaders);

      let newFormattedData = rows.map(row => {
        let obj = {};
        newHeaders.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      // Do this to test the graph
      newFormattedData = rows.map(row => {
        return {
          time: row[0],
          value: row[1]
        };
      });

      // Order the data by time
      newFormattedData.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      }
      );

      console.log(newFormattedData);

      return newFormattedData;
    } catch (error) {
      console.log(error);
    }

  };

  const chartContainerRef = useRef();

  useEffect(() => {
    try {
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
      console.log(data);
      newSeries.setData(transformDataToGraph(data));

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    } catch (error) {
      console.log(error);
    }
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  return (
    <Box
      ref={chartContainerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
          width: '80vw',
          height: '60vh',
        },
        [theme.breakpoints.down('md')]: {
          width: '40vw',
          height: '40vh',
        },
        [theme.breakpoints.up('lg')]: {
          width: '100vw',
          height: '50vh',
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
        {/* <Button
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
        </Button> */}
      </Box>
    </Box>
  );
};
