import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Dialog, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import { gruvboxTheme } from '../theme/Theme';

const GruvboxGraph = ({ apiData }) => {

    const [open, setOpen] = useState(false);
    const [chartType, setChartType] = useState('LineChart');
    const [chartOptions, setChartOptions] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* LINE CHART DATA */

    const transformData = (data) => {

        // TODO: identify data type to avoid errors and render the correct Chart type with proper options

        if (!data) {
            return [['Date']];
        }

        const headers = ['Date', ...Object.keys(data)];
        const dates = new Set(Object.values(data).flatMap(metric => Object.keys(metric)));
        const rows = Array.from(dates).sort().map(date => {
            const row = [new Date(date), ...headers.slice(1).map(header => parseFloat(data[header][date] || 0))];
            return row;
        });
        return [headers, ...rows];
    }

    const formattedData = apiData ? transformData(apiData) : [['Date']];

    // TODO: unify base options

    /* LINE CHART OPTIONS */

    const lineColors = [gruvboxTheme.palette.info.main, '#FF5733', '#33FF57', '#3357FF'];

    const lineOptions = {
        legend: 'none',
        curveType: "function",
        backgroundColor: gruvboxTheme.palette.background.default,
        fontName: gruvboxTheme.typography.fontFamily,
        colors: lineColors.slice(0, formattedData[0].length - 1),
        hAxis: {
            textStyle: {
                color: gruvboxTheme.palette.text.primary
            },
            baselineColor: gruvboxTheme.palette.background.paper,
            gridlines: {
                color: gruvboxTheme.palette.background.paper
            },
            format: 'MMM d'
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

    /* CORE OPTIONS */

    const options = {
        legend: 'none',
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
                color: gruvboxTheme.palette.background.paper
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

    return (
        <div style={{ position: 'relative'}}>
            <Chart
                chartType={chartType}
                width="100%"
                height="400px"
                data={formattedData}
                options={lineOptions}
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
                <Chart
                    chartType={chartType}
                    width="100%"
                    height="400px"
                    data={formattedData}
                    options={lineOptions}
                />
            </Dialog>
        </div>
    );
}

export default GruvboxGraph;
