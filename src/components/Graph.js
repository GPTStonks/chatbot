
/* React and MUI imports */
import React, { useEffect, useState } from 'react';
import { Dialog, IconButton, Button, Menu, Card } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

/* Chart imports */
import { GoogleChartEditor, GoogleChartWrapper, GoogleViz, Chart } from "react-google-charts";

/* Theme imports */
import { gruvboxTheme } from '../theme/Theme';
import { makeStyles } from '@mui/styles';
import '../theme/table.css'

/* Icons imports */
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

/* File download imports */
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
            backgroundColor: theme.palette.background.paper + " !important",
            color: theme.palette.text.primary + " !important",
        },
        '& .google-visualization-table-tr-even': {
            backgroundColor: theme.palette.background.paper + " !important",
            color: theme.palette.text.primary + " !important",
        },
        '& .google-visualization-table-tr-odd': {
            backgroundColor: theme.palette.background.default + " !important",
            color: theme.palette.text.primary + " !important",
        },
    },
    legend: {
        color: theme.palette.text.primary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    axisText: {
        color: theme.palette.text.secondary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    label: {
        color: theme.palette.text.primary + '!important',
        fontFamily: '"Fira Code", monospace !important',
    },
    header: {
        backgroundColor: theme.table.headerBackground + " !important",
    },

    tableRow: {
        backgroundColor: theme.palette.background.paper + " !important",
        color: theme.palette.text.primary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    oddTableRow: {
        backgroundColor: theme.palette.background.default + " !important",
        color: theme.palette.text.secondary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    selectedTableRow: {
        backgroundColor: theme.palette.primary.main + " !important",
        color: theme.palette.text.primary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    hoverTableRow: {
        backgroundColor: theme.palette.primary.light + " !important",
        color: theme.palette.text.primary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    headerCell: {
        backgroundColor: theme.palette.background.paper + " !important",
        color: theme.palette.text.primary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    tableCell: {
        backgroundColor: theme.palette.background.default + " !important",
        color: theme.palette.text.secondary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
    rowNumberCell: {
        backgroundColor: theme.palette.background.paper + " !important",
        color: theme.palette.text.secondary + " !important",
        fontFamily: '"Fira Code", monospace !important',
    },
}));

const GruvboxGraph = ({ apiData }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [formattedData, setFormattedData] = useState([["Answer"]]);
    const [options, setOptions] = useState();
    const [chartType, setChartType] = useState('table');
    const [columnsInView, setColumnsInView] = useState(null);
    const [headers, setHeaders] = useState([]);

    const [anchorElExport, setAnchorElExport] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [rotated, setRotated] = useState(false);

    const [modifiedChartOptions, setModifiedChartOptions] = useState(null);
    const [chartEditor, setChartEditor] = useState();
    const [chartWrapper, setChartWrapper] = useState();
    const [google, setGoogle] = useState();

    /* CHART SETTINGS */

    const handleClickChartSettings = (event) => {
        setRotated((prev) => !prev);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseChartSettings = () => {
        setRotated(false);
        setAnchorEl(null);
    };

    /* EXPAND HANDLERS */
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* ----------------- */
    /* EXPORT OPTIONS */

    const handleExportMenuOpen = (event) => {
        setAnchorElExport(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setAnchorElExport(null);
    };

    const handleExportData = (format) => {
        exportData(format);
        handleExportMenuClose();
    };

    /* ----------------- */
    /* DATA EXPORT FUNCTIONS */

    const transformDataForExcel = (data) => {
        const columns = Object.keys(data);
        const indices = [...new Set(Object.values(data).flatMap(serieData => Object.keys(serieData)))];

        const excelData = [["Index", ...columns]];

        indices.forEach(index => {
            const row = [index];
            columns.forEach(column => {
                row.push(data[column][index] ? data[column][index] : null);
            });
            excelData.push(row);
        });

        return excelData;
    };

    const exportData = (format) => {
        let dataToExport = apiData;

        if (typeof apiData === 'string') {
            try {
                dataToExport = JSON.parse(apiData);
            } catch (error) {
                console.error('Error parsing JSON string:', error);
                return;
            }
        }
        switch (format) {
            case 'json':
                const jsonBlob = new Blob([JSON.stringify(dataToExport)], { type: 'application/json' });
                saveAs(jsonBlob, 'data.json');
                break;
            case 'raw':
                const rawBlob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'text/plain' });
                saveAs(rawBlob, 'data.txt');
                break;
            case 'excel':
                const excelData = transformDataForExcel(dataToExport);
                const worksheet = XLSX.utils.aoa_to_sheet(excelData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, 'data.xlsx');
                break;
            default:
                break;
        }
    }

    /* ----------------- */
    /* CHART OPTIONS */

    // CORE OPTIONS
    const baseOptions = {
        backgroundColor: gruvboxTheme.palette.background.default,
        fontName: gruvboxTheme.typography.fontFamily,
        fontFamily: gruvboxTheme.typography.fontFamily,
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: gruvboxTheme.palette.error.main },
            risingColor: { strokeWidth: 0, fill: gruvboxTheme.palette.success.main }
        },
        hAxis: {
            textStyle: {
                color: gruvboxTheme.palette.text.primary
            },
            baselineColor: gruvboxTheme.palette.background.paper,
            gridlines: {
                color: gruvboxTheme.palette.background.primary
            }
        },
        vAxis: {
            textStyle: {
                color: gruvboxTheme.palette.text.primary
            },
            baselineColor: gruvboxTheme.palette.background.paper,
            gridlines: {
                color: gruvboxTheme.palette.background.paper
            }
        },
        chartArea: {
            backgroundColor: gruvboxTheme.palette.background.paper
        },
        animation: {
            duration: 300,
            easing: 'inAndOut',
            startup: true
        },
        legend: { textStyle: { className: classes.legend } },
        annotations: { textStyle: { className: classes.label } },
    };

    // INHERITED OPTIONS
    const dateLineOptions = (formattedData) => {
        return {
            ...baseOptions,
            curveType: "function",
            colors: lineColors.slice(0, formattedData[0].length - 1),
            hAxis: {
                ...baseOptions.hAxis,
                format: 'y-M-d'
            }
        }
    };

    // BARCHART OPTIONS
    const barChartOptions = {
        ...baseOptions,
        isStacked: true
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

    const transformData = (data, columnsToView) => {
        let newChartType = "LineChart";
        let newOptions;

        console.log(data)
        const series = Object.keys(data);
        const pandasIndices = [...new Set(Object.values(data).flatMap(serieData => Object.keys(serieData)))];
        console.log(pandasIndices);
        const rows = pandasIndices.sort().map(pandasIndex => {
            newChartType = "Table";
            let row = [
                pandasIndex,
                ...series.map(serie => parseFloat(data[serie][pandasIndex]) || data[serie][pandasIndex])
            ];
            console.log(row);
            return row;
        });
        let newHeaders = [...series];
        if (newHeaders.length === rows[0].length - 1) {
            newHeaders = ["Index", ...newHeaders];
        }

        let newFormattedData = [];
        if (!columnsInView) {
            const newColumnsInView = [...Array(newHeaders.length).keys()];
            newFormattedData = [newHeaders, ...rows].map(row => newColumnsInView.map(colId => row[colId]));
            setColumnsInView(newColumnsInView);
        } else {
            newFormattedData = [newHeaders, ...rows].map(row => columnsInView.map(colId => row[colId]));
        }
        setHeaders(newHeaders);

        console.log(newFormattedData);

        if (newChartType === "LineChart") {
            newOptions = dateLineOptions(newFormattedData);
        } else if (newChartType === "BarChart") {
            newOptions = barChartOptions;
        } else if (newChartType === "Table") {
            newOptions = tableOptions;
        } else {
            newOptions = baseOptions;
        }

        return {
            newFormattedData,
            newOptions,
            newChartType
        };
    }
    /*-----------------*/
    /* USE EFFECTS */

    useEffect(() => {
        if (apiData) {
            const { newFormattedData, newOptions, newChartType } = transformData(apiData);
            setFormattedData(newFormattedData);
            setOptions(newOptions);
            setChartType(newChartType);
        }
    }, [apiData]);

    /* ----------------- */
    /* CHART EDITOR */

    const onEditClick = () => {
        if (!chartWrapper || !google || !chartEditor) {
            console.error('ChartWrapper, google, or ChartEditor is not defined');
            return;
        }

        chartEditor.openDialog(chartWrapper);

        google.visualization.events.addListener(chartEditor, 'ok', () => {
            const newChartWrapper = chartEditor.getChartWrapper();
            setChartWrapper(newChartWrapper);

            newChartWrapper.draw();

            const newChartOptions = newChartWrapper.getOptions();
            const newChartType = newChartWrapper.getChartType();
            console.log(newChartOptions);
            setChartType(newChartType);

        });
    };

    /* ----------------- */
    /* RENDER */

    return (

        <div style={{ overflow: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1 }}>
                <Chart
                    chartType={chartType}
                    width="100%"
                    height="400px"
                    data={formattedData || DefaultData}
                    options={modifiedChartOptions || options}
                    chartPackages={["corechart", "controls", "charteditor"]}
                    getChartEditor={({ chartEditor, chartWrapper, google }) => {
                        setChartEditor(chartEditor);
                        setChartWrapper(chartWrapper);
                        setGoogle(google);
                    }}
                    legendToggle
                />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="lg"
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 3 }}>
                        <Chart
                            chartType={chartType}
                            width="100%"
                            height="400px"
                            data={formattedData}
                            options={modifiedChartOptions || options}
                            chartPackages={["corechart", "controls", "charteditor"]}
                            getChartEditor={({ chartEditor, chartWrapper, google }) => {
                                setChartEditor(chartEditor);
                                setChartWrapper(chartWrapper);
                                setGoogle(google);
                            }}
                            legendToggle
                        />
                    </Box>
                </Dialog>
                <IconButton
                    aria-label="settings"
                    className={rotated ? classes.rotate : ''}
                    onClick={handleClickChartSettings}
                    sx={{ color: gruvboxTheme.scrollBar.main }}
                >
                    <SettingsIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseChartSettings}
                >
                    <MenuItem onClick={() => { handleCloseChartSettings(); onEditClick(); }}>
                        Customize Chart <TuneIcon style={{ marginLeft: 20 }} />
                    </MenuItem>
                    <MenuItem onClick={handleCloseChartSettings}>
                        Edit Columns <Rotate90DegreesCcwIcon style={{ marginLeft: 'auto' }} />
                    </MenuItem>
                    <MenuItem
                        onClick={handleExportMenuOpen}
                        style={{ position: 'relative' }}
                    >
                        Export Data <FileDownloadIcon style={{ marginLeft: 'auto' }} />

                        <Menu
                            id="export-menu"
                            anchorEl={anchorElExport}
                            open={Boolean(anchorElExport)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            getcontentanchorel={null}
                            onClose={(e) => { e.stopPropagation(); handleExportMenuClose() }}
                        >
                            <MenuItem onClick={(e) => { e.stopPropagation(); handleExportData('json'); }}>JSON (.json)</MenuItem>
                            <MenuItem onClick={(e) => { e.stopPropagation(); handleExportData('raw'); }}>RAW (.txt)</MenuItem>
                            <MenuItem onClick={(e) => { e.stopPropagation(); handleExportData('excel'); }}>Excel (.xlsx)</MenuItem>
                        </Menu>
                    </MenuItem>
                    <MenuItem onClick={handleOpen}>
                        Expand <OpenInFullIcon style={{ marginLeft: 'auto' }} />
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    );
}

export default GruvboxGraph;
