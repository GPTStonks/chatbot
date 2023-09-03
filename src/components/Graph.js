import React, { useEffect, useState } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Dialog, IconButton, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chart from "react-google-charts";
import { gruvboxTheme } from '../theme/Theme';

const GruvboxGraph = ({ apiData }) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    // TODO: unify base options
    
    /* CORE OPTIONS */

    const baseOptions = {
        backgroundColor: gruvboxTheme.palette.background.default,
        fontName: gruvboxTheme.typography.fontFamily,
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
        }
    };

    /* INHERITED OPTIONS */

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

    const barChartOptions = {
        ...baseOptions,
        isStacked: true
    };

    const tableOptions = {
        ...baseOptions,
        allowHtml: true,
        showRowNumber: true
    };

    const [open, setOpen] = useState(false);
    const [formattedData, setFormattedData] = useState([["Answer"]]);
    const [chartEditor, setChartEditor] = useState();
    const [chartWrapper, setChartWrapper] = useState();
    const [google, setGoogle] = useState();
    const [options, setOptions] = useState();
    const [chartType, setChartType] = useState();
    const [columnsInView, setColumnsInView] = useState(null);
    const [headers, setHeaders] = useState([]);

    const onEditClick = () => {
        if (!chartWrapper || !google || !chartEditor) {
          return;
        }
    
        chartEditor.openDialog(chartWrapper);
    
        google.visualization.events.addListener(chartEditor, "ok", () => {
          const newChartWrapper = chartEditor.getChartWrapper();
    
          newChartWrapper.draw();
    
          const newChartOptions = newChartWrapper.getOptions();
          const newChartType = newChartWrapper.getChartType();
    
          console.log("Chart type changed to ", newChartType);
          console.log("Chart options changed to ", newChartOptions);
        });
    };

    const onTransposeClick = () => {
        const transposedFormattedData = formattedData[0].map(
            (_, colIndex) => formattedData.map(row => row[colIndex])
        );
        console.log(transposedFormattedData);
        setFormattedData(transposedFormattedData);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const lineColors = [gruvboxTheme.palette.info.main, '#FF5733', '#33FF57', '#3357FF'];

    /* LINE CHART DATA */
    const transformData = (data, columnsToView) => {
        // TODO: identify data type to avoid errors and render the correct Chart type with proper options
        let newChartType = "LineChart";
        let newOptions;

        console.log(data)
        const series = Object.keys(data);
        const pandasIndices = [...new Set(Object.values(data).flatMap(serieData => Object.keys(serieData)))];
        console.log(pandasIndices);
        const rows = pandasIndices.sort().map(pandasIndex => {
            let row = [];
            if (typeof pandasIndex === "string" && pandasIndex.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/) !== null) {
                row = [
                    new Date(pandasIndex),
                    ...series.map(serie => parseFloat(data[serie][pandasIndex]) || data[serie][pandasIndex])
                ];
            } else {
                newChartType = "Table";
                row = [
                    pandasIndex,
                    ...series.map(serie => parseFloat(data[serie][pandasIndex]) || data[serie][pandasIndex])
                ];
            }
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

    useEffect(() => {
        const { newFormattedData, newOptions, newChartType } = apiData ? transformData(apiData, columnsInView) : {
            newFormattedData: [["Answer"]],
            newOptions: dateLineOptions([['Answer']]),
            newChartType: "LineChart"
        };
        setFormattedData(newFormattedData);
        setOptions(newOptions);
        setChartType(newChartType);
    }, [apiData, columnsInView]);

    const handleSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        // On autofill we get a stringified value.
        setColumnsInView(typeof value === 'string' ? value.split(',') : value);
        console.log(columnsInView);
    };

    return (
        <div style={{ position: 'relative'}}>
            <Button variant="outlined" color="secondary" onClick={onEditClick}>Edit Chart</Button>
            <Button variant="outlined" color="secondary" onClick={onTransposeClick}>Transpose Data</Button>
            <Select
                multiple
                value={columnsInView || []}
                onChange={handleSelectChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={headers[value]} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {[...Array(headers.length).keys()].map((colId) => (
                    <MenuItem
                        key={colId}
                        value={colId}
                    >
                        {headers[colId]}
                    </MenuItem>
                ))}
            </Select>
            <Chart
                chartType={chartType}
                width="100%"
                height="400px"
                data={formattedData}
                options={options}
                chartPackages={["corechart", "controls", "charteditor"]}
                getChartEditor={({ chartEditor, chartWrapper, google }) => {
                    setChartEditor(chartEditor);
                    setChartWrapper(chartWrapper);
                    setGoogle(google);
                }}
                legendToggle
            />
            <IconButton
                style={{ position: 'absolute', top: "1.5%", right: "1.5%", color: gruvboxTheme.palette.info.main }}
                onClick={handleOpen}
            >
                <OpenInFullIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
            >
                { /* TODO: plot exactly same graph as above */ }
                <Chart
                    chartType={chartWrapper?.getChartType() || chartType}
                    width="100%"
                    height="400px"
                    data={formattedData}
                    options={chartWrapper?.getOptions() || options}
                    formatters={chartType === "Table" ? [
                        {
                          type: "BarFormat",
                          column: 1,
                          options: {
                            width: 120,
                          },
                        },
                      ] : null}
                    legendToggle
                />
            </Dialog>
        </div>
    );
}

export default GruvboxGraph;
