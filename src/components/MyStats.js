import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getRuns } from '../store/runs';

import Calendar from './stats/Calendar';
import RunDetails from './stats/RunDetails';
import LineGraph from './stats/LineGraph';
import AddRunForm from './stats/AddRunForm';
import TotalStats from './stats/TotalStats';

const useStyles = makeStyles({
  nav: {
    maxHeight: '100vh',
    // // maxWidth: '40vw',
    overflowY: 'scroll',
    overflowX: 'hidden',
    borderRight: `2px solid #e2e2e2`,
  },
  list: {
    listStyleType: 'none',
    borderBottom: '1px solid #e6e6e6',
  },
  graphContainer: {
    // width: '100px',
    height: '500px',
    // maxHeight: '100vh',
    minWidth: '60vw',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  graphNav: {
    borderBottom: '1px solid #e6e6e6',
    // margin: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  graphLinks: {
    borderLeft: '1px solid #e6e6e6',
    borderRight: '1px solid #e6e6e6',
    padding: '5px',
  },
  navText: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  calendarContainer: {
    width: '100px'
  }
});

const MyStats = () => {
  const [value, setValue] = useState(0);
  const [calData, setCalData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [showCal, setShowCal] = useState(true);
  const [showDistance, setShowDistance] = useState(false);
  const [showCalories, setShowCalories] = useState(false);
  const [showRunForm, setRunForm] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authorization.currentUser);
  const runs = useSelector(state => state.runs.runs);

  const lineGraph = (type) => {
    const graphData = {
      id: "runs",
      color: "#FF6600",
      data: []
    };

    runs.forEach(run => {
      graphData.data.push({
        x: run.date,
        y: run[type]
      });
    })

    console.log(graphData);
    return [graphData];
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getRuns(currentUser.userId))
    }
  }, [currentUser, runs.length])

  useEffect(() => {
    const calendarRuns = [];
    if (runs.length) {
      runs.forEach(run => {
        const cRun = {};
        cRun.day = run.date;
        cRun.value = run.distance;
        calendarRuns.push(cRun);
      });

      setDistanceData(lineGraph('distance'));
      setCaloriesData(lineGraph('calories'));
      setCalData(calendarRuns);
    }
  }, [distanceData.length, caloriesData.length, runs.length]);

  const handleRunDetails = (e) => {
    console.log('clicked!');
  };

  const handleShowCalGraph = () => {
    setShowCalories(false);
    setShowDistance(false);
    setShowCal(true);
  };

  const handleShowDistGraph = () => {
    setShowCalories(false);
    setShowCal(false);
    setShowDistance(true);
  };

  const handleShowCalorGraph = () => {
    setShowCal(false);
    setShowDistance(false);
    setShowCalories(true);
  };

  const handleRunForm = () => {
    setRunForm(!showRunForm);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      handleShowCalGraph();
    } else if (newValue === 1) {
      handleShowDistGraph();
    } else {
      handleShowCalorGraph();
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={3} sm={3}>
          <Box
            orientation="vertical"
            variant="scrollable"
            className={classes.nav}
          >
            {runs.map(run => {
              return (
                <Box
                  key={run.id}
                  className={classes.list}
                  onClick={handleRunDetails}
                >
                  <RunDetails run={run} />
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={9} sm={9}>
          <Box className={classes.graphContainer}>
            <Box position="static" className={classes.naxText}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="graphs nav"
                indicatorColor="secondary"
                textColor="inherit"
                centered
              >
                <Tab
                  label="Calendar"
                  className={classes.navText}
                />
                <Tab
                  label="Distance"
                  className={classes.navText}
                />
                <Tab
                  label="Calories"
                  className={classes.navText}
                />
              </Tabs>
            </Box>
            {showCal &&
              <Calendar myRuns={calData} />
            }
            {showDistance &&
              <LineGraph runs={distanceData} legend="Time in minutes" />
            }
            {showCalories &&
              <LineGraph runs={caloriesData} legend="Calories" />
            }
            {showRunForm &&
              <AddRunForm />
            }
            <Grid
              container
              justify="center"
            >
              <Grid item xs={9} s={9}>
                <TotalStats runs={runs} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default MyStats;
