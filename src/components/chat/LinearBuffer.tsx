import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearBuffer() {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const intervalDuration = 100;
  const totalDuration = 3000;
  const steps = totalDuration / intervalDuration;

  const calculateIncrement = (currentValue: number) => {
    const minIncrement = 1;
    const maxIncrement = 10;
    let increment = Math.random() * (maxIncrement - minIncrement) + minIncrement;

    if (currentValue > 80) {
      const decelerationFactor = (100 - currentValue) / 20;
      increment *= decelerationFactor;
    }

    return increment;
  };

  React.useEffect(() => {
    let stepCounter = 0;
    const timer = setInterval(() => {
      stepCounter += 1;
      setProgress((prevProgress) => {
        const increment = calculateIncrement(prevProgress);
        const nextProgress = prevProgress + increment;
        return nextProgress > 100 ? 100 : nextProgress;
      });
      setBuffer((prevBuffer) => {
        const bufferIncrement = calculateIncrement(prevBuffer);
        const nextBuffer = prevBuffer + bufferIncrement;
        return nextBuffer > 100 ? 100 : nextBuffer;
      });

      if (stepCounter >= steps) {
        clearInterval(timer);
      }
    }, intervalDuration);

    return () => {
      clearInterval(timer);
      if (progress >= 100) {
        setTimeout(() => {
          setProgress(0);
          setBuffer(10);
        }, intervalDuration);
      }
    };
  }, [progress]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}

