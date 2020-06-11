import React from 'react';
import { Box } from '@material-ui/core';
import staticMap from '../../images/static-map.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  map: {
    height: '55px',
    width: '55px',
    marginTop: '3px'
    // objectFit: ""
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
  const convertDate = date => {
    const dateArr = date.split(', ');

    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0].slice(2)}`;
  };

  const classes = useStyles();
  return (
    <Box className={classes.container} display='flex'>
      <Box display='flex'>
        <Box alignSelf="center">
          <img className={classes.map} src={staticMap} alt='map of route' />
        </Box>
        <Box className={classes.inner} flexDirection="column">
          <Box className={classes.grey}>
            {convertDate(run.date)}
          </Box>
          <Box className={classes.bold}>
            Monday Morning Run
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Box className={classes.grey} pr={5}>{run.distance} mi</Box>
            <Box className={classes.grey} pr={5}> {(run.time / run.distance).toFixed(2)}''/mi</Box>
            <Box className={classes.grey}>{run.time}</Box>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default RunDetails;
