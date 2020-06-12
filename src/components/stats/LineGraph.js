import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineGraph = ({ runs, legend }) => {
  return (
    <ResponsiveLine
      data={runs}
      margin={{ top: 50, right: 110, bottom: 100, left: 75 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -65,
        legend: 'Date',
        legendOffset: 80,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend,
        legendOffset: -50,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
};

export default LineGraph;
