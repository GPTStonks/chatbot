import { Box, Typography, useTheme } from '@mui/material';
import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const TradingViewChart = ({ data, colors = {} }) => {
    const theme = useTheme();
    const {
        lineColor = '#2962FF',
        textColor = 'white',
        areaTopColor = '#2962FF',
        backgroundColor = 'transparent',
        areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = colors;

    const chartContainerRef = useRef();

    const transformData = (rawData) => {
        const requiredKeys = ['time', 'open', 'high', 'low', 'close'];

        let transformedData = rawData.map((item) => {
            let transformedItem = {};
            Object.keys(item).forEach((key) => {
                const lowerKey = key.toLowerCase();
                if (lowerKey === 'date') {
                    const date = new Date(item[key]);
                    const formattedDate = date.toISOString().split('T')[0];
                    transformedItem['time'] = formattedDate;
                } else if (requiredKeys.includes(lowerKey)) {
                    transformedItem[lowerKey] = item[key];
                }
            });
            return transformedItem;
        });

        transformedData.sort((a, b) => {
            return new Date('20' + a.time) - new Date('20' + b.time);
        });

        return transformedData;
    };

    useEffect(() => {
        try {
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: 'solid', color: backgroundColor },
                    textColor,
                },
            });

            const transformedData = transformData(data);
            console.log(transformedData);
            const canRenderCandlestick = transformedData.every((item) =>
                ['time', 'open', 'high', 'low', 'close'].every((key) => key in item),
            );

            if (canRenderCandlestick) {
                const candlestickSeries = chart.addCandlestickSeries();
                candlestickSeries.setData(transformedData);
            } else {
                const areaSeries = chart.addAreaSeries({
                    lineColor,
                    topColor: areaTopColor,
                    bottomColor: areaBottomColor,
                });
                areaSeries.setData(transformedData);
            }

            chart.timeScale().fitContent();

            return () => {
                chart.remove();
            };
        } catch (error) {
            console.log(error);
        }
    }, [data, areaBottomColor, areaTopColor, backgroundColor, lineColor, textColor]);

    return (
        <Box
            ref={chartContainerRef}
            sx={{
                width: '1400px',
                height: '750px',
                margin: '0 auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    margin: '0',
                }}
            >
                <Typography
                    variant="caption"
                    sx={{ m: '0.5rem', justifyContent: 'flex-end' }}
                >
                    Charts powered by TradingView
                </Typography>
            </Box>
        </Box>
    );
};
