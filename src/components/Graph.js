/* React and MUI imports */
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';

/* Chart imports */
import { Chart } from 'react-google-charts';

/* Theme imports */
import { makeStyles } from '@mui/styles';
import { gruvboxTheme } from '../theme/Theme';
import '../theme/table.css';

/* Icons imports */

/* File download imports */
import { useTheme } from '@emotion/react';

/* Columns Editor */

const lineColors = [gruvboxTheme.palette.info.main, '#FF5733', '#33FF57', '#3357FF'];

const useStyles = makeStyles((theme) => ({
  rotate: {
    transform: 'rotate(270deg)',
    transition: theme.transitions.create('transform', {
      duration: 500,
    }),
  },
  table: {
    backgroundColor: theme.palette.background.default,
    '& .google-visualization-table-tr-head, & .google-visualization-table-th': {
      backgroundColor: theme.palette.background.paper + ' !important',
      color: theme.palette.text.primary + ' !important',
    },
    '& .google-visualization-table-tr-even': {
      backgroundColor: theme.palette.background.paper + ' !important',
      color: theme.palette.text.primary + ' !important',
    },
    '& .google-visualization-table-tr-odd': {
      backgroundColor: theme.palette.background.default + ' !important',
      color: theme.palette.text.primary + ' !important',
    },
  },
  legend: {
    color: theme.palette.text.primary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  axisText: {
    color: theme.palette.text.secondary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  label: {
    color: theme.palette.text.primary + '!important',
    fontFamily: '"Fira Code", monospace !important',
  },
  header: {
    backgroundColor: theme.table.headerBackground + ' !important',
  },

  tableRow: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.primary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  oddTableRow: {
    backgroundColor: theme.palette.background.default + ' !important',
    color: theme.palette.text.secondary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  selectedTableRow: {
    backgroundColor: theme.palette.primary.main + ' !important',
    color: theme.palette.text.primary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  hoverTableRow: {
    backgroundColor: theme.palette.primary.light + ' !important',
    color: theme.palette.text.primary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  headerCell: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.primary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  tableCell: {
    backgroundColor: theme.palette.background.default + ' !important',
    color: theme.palette.text.secondary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
  rowNumberCell: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.secondary + ' !important',
    fontFamily: '"Fira Code", monospace !important',
  },
}));

const GruvboxGraph = ({ apiData }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [formattedData, setFormattedData] = useState();
  const [options, setOptions] = useState();
  const [chartType, setChartType] = useState('table');

  const [modifiedChartOptions, setModifiedChartOptions] = useState(null);
  const [chartEditor, setChartEditor] = useState();
  const [chartWrapper, setChartWrapper] = useState();
  const [google, setGoogle] = useState();

  const [isColumnEditorOpen, setIsColumnEditorOpen] = useState(false);
  const [columnsInView, setColumnsInView] = useState(null);
  const [originalHeaders, setOriginalHeaders] = useState(null);
  const [headers, setHeaders] = useState([]);

  /* ----------------- */
  /* CHART OPTIONS */

  // CORE OPTIONS
  const baseOptions = {
    backgroundColor: gruvboxTheme.palette.background.default,
    fontName: gruvboxTheme.typography.fontFamily,
    fontFamily: gruvboxTheme.typography.fontFamily,
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: gruvboxTheme.palette.error.main },
      risingColor: { strokeWidth: 0, fill: gruvboxTheme.palette.success.main },
    },
    hAxis: {
      textStyle: {
        color: gruvboxTheme.palette.text.primary,
      },
      baselineColor: gruvboxTheme.palette.background.paper,
      gridlines: {
        color: gruvboxTheme.palette.background.primary,
      },
    },
    vAxis: {
      textStyle: {
        color: gruvboxTheme.palette.text.primary,
      },
      baselineColor: gruvboxTheme.palette.background.paper,
      gridlines: {
        color: gruvboxTheme.palette.background.paper,
      },
    },
    chartArea: {
      backgroundColor: gruvboxTheme.palette.background.paper,
    },
    animation: {
      duration: 300,
      easing: 'inAndOut',
      startup: true,
    },
    legend: { textStyle: { className: classes.legend } },
    annotations: { textStyle: { className: classes.label } },
  };

  // TABLE OPTIONS
  const tableOptions = {
    ...baseOptions,
    allowHtml: true,
    showRowNumber: true,
    cssClassNames: {
      headerRow: classes.header,
      tableRow: classes.tableRow,
      oddTableRow: classes.oddTableRow,
      selectedTableRow: classes.selectedTableRow,
      hoverTableRow: classes.hoverTableRow,
      headerCell: classes.headerCell,
      tableCell: classes.tableCell,
      rowNumberCell: classes.rowNumberCell,
    },
  };

  /* ----------------- */
  /* TRANSFORMATION FUNCTION TO APIDATA */

  const transformData = (data) => {
    let newChartType = 'LineChart';
    let newOptions;

    const timeSeries = Object.keys(data).map((key) => {
      if (!isNaN(key)) {
        return new Date(parseInt(key)).toISOString().split('T')[0];
      }
      return key;
    });

    console.log(timeSeries);

    const pandasIndices = [
      ...new Set(Object.values(data).flatMap((serieData) => Object.keys(serieData))),
    ];
    //console.log(pandasIndices);
    //console.log(Object.values(data));

    const directValues = Object.values(data).map((row) => {
      return pandasIndices.map((index) => {
        return row[index] ?? null;
      });
    });

    const rows = timeSeries.map((time, i) => {
      newChartType = 'Table';

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

    let newFormattedData = [];
    if (!columnsInView) {
      const newColumnsInView = [...Array(newHeaders.length).keys()];
      newFormattedData = [newHeaders, ...rows].map((row) =>
        newColumnsInView.map((colId) => row[colId]),
      );
      setColumnsInView(newColumnsInView);
    } else {
      newFormattedData = [newHeaders, ...rows].map((row) =>
        columnsInView.map((colId) => row[colId]),
      );
    }
    setHeaders(newHeaders);

    newChartType = 'Table';
    newOptions = tableOptions;

    console.log(newFormattedData);
    //console.log(newHeaders);

    return {
      newFormattedData,
      newOptions,
      newChartType,
      newHeaders,
    };
  };

  /*-----------------*/
  /* USE EFFECTS */

  const updateFormattedData = () => {
    if (apiData) {
      const { newFormattedData, newOptions, newChartType, newHeaders } = transformData(apiData);
      setFormattedData(newFormattedData);
      setOptions(newOptions);
      setChartType(newChartType);
      setOriginalHeaders(newHeaders);
    }
  };

  useEffect(() => {
    updateFormattedData();
  }, [apiData]);

  /* ----------------- */
  /* RENDER */

  return (
    <div style={{ overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          paddingBottom: '1rem',
        }}
      >
        <Chart
          chartType={chartType}
          data={formattedData}
          options={modifiedChartOptions || options}
          chartPackages={['corechart', 'controls', 'charteditor']}
          legendToggle
          width="fit-content"
        />
      </Box>
    </div>
  );
};

export default GruvboxGraph;
