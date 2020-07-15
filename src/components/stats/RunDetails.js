import React from 'react';
import { Box } from '@material-ui/core';
import staticMap from '../../images/static-map.png'
import { makeStyles } from '@material-ui/core/styles';

import { convertDate, convertDateToDay } from '../../utils/convert-date';

const useStyles = makeStyles({
  map: {
    height: '55px',
    width: '55px',
    margin: 'auto 10px'
  },
  container: {
    margin: "5px",

  },
  inner: {
    padding: "5px",
  },
  bold: {
    fontWeight: "bold"
  },
  grey: {
    color: '#949494'
  }
});

const RunDetails = ({ run }) => {
  const renderMap = () => {
    if (run.static_map) {
      return <img className={classes.map} src={run.static_map} alt='map of route' />;
    } else {
      return <img className={classes.map} src={staticMap} alt='map of route' />;
    }
  }
  const classes = useStyles();
  return (
    <>
      <Box className={classes.container} display='flex'>
        <Box display='flex'>
          <Box alignItems="center">
            {renderMap}
          </Box>
          <Box className={classes.inner} flexDirection="column">
            <Box className={classes.grey}>
              {convertDate(run.date)}
            </Box>
            <Box className={classes.bold}>
              {convertDateToDay(run)}
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Box className={classes.grey} pr={4} flexBasis="auto">{run.distance.toFixed(2)} mi</Box>
              <Box className={classes.grey} pr={4} flexBasis="auto">{((run.time / 60) / run.distance).toFixed(2)} min/mi</Box>
              <Box className={classes.grey} justifyContent="flex-end">{(run.time / 60).toFixed(0)}"{(run.time % 60)}""</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RunDetails;
