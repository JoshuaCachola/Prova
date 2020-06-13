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
    const dateArr = date.split('-');

    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
  };

  const convertDateToDay = () => {
    const timeOfDay = ['morning', 'afternoon', 'evening'];
    const hour = run.timeOfDay.split(':')[0];
    let num;

    if (hour >= 5 && hour < 12) {
      num = 0;
    } else if (hour >= 12 && hour <= 18) {
      num = 1;
    } else {
      num = 2;
    }

    return `${run.day} ${timeOfDay[num]} run`;
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
            {convertDateToDay(run.date)}
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Box className={classes.grey} pr={5} flexBasis="auto">{run.distance} mi</Box>
            <Box className={classes.grey} pr={5} flexBasis="auto"> {((run.time / 60) / run.distance).toFixed(2)}''/mi</Box>
            <Box className={classes.grey} flexBasis="auto">{run.time / 60} min</Box>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default RunDetails;
