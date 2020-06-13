import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getRuns } from '../store/runs';

import Calendar from './stats/Calendar';
import RunDetails from './stats/RunDetails';
import LineGraph from './stats/LineGraph';
import AddRunForm from './stats/AddRunForm';

const useStyles = makeStyles({
  nav: {
    maxHeight: '100vh',
    // // maxWidth: '40vw',
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    borderRight: `2px solid #e2e2e2`,
  },
  list: {
    listStyleType: 'none',
    borderBottom: '1px solid #e6e6e6',
  },
  calendarContainer: {
    width: '100px',
    height: '500px',
    maxHeight: '100vh',
    minWidth: '60vw',
    marginTop: '20px'
  },
  graphNav: {
    borderBottom: '1px solid #e6e6e6',
    margin: '20px',
    width: '100%'
  },
  graphLinks: {
    borderLeft: '1px solid #e6e6e6',
    borderRight: '1px solid #e6e6e6',
    padding: '5px',
  },
  navText: {
    fontSize: '16px',
    fontWeight: 'bold'
  }
});

const MyStats = () => {
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

  // const { user } = useAuth0();
  const lineGraph = (type) => {
    // const sortedRuns = myRuns.sort((a, b) => new Date(a.date.split(', ').join('-')) - new Date(b.date.split(', ').join('-')));
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
    runs.forEach(run => {
      const cRun = {};
      cRun.day = run.date;
      cRun.value = run.distance;
      calendarRuns.push(cRun);
    });

    setDistanceData(lineGraph('distance'));
    setCaloriesData(lineGraph('calories'));
    setCalData(calendarRuns);
  }, [distanceData.length, caloriesData.length, runs.length]);

  // const convertDate = date => {
  //   const months = {
  //     Jan: '01',
  //     Feb: '02',
  //     Mar: '03',
  //     Apr: '04',
  //     May: '05',
  //     Jun: '06',
  //     Jul: '07',
  //     Aug: '08',
  //     Sep: '09',
  //     Oct: '10',
  //     Nov: '11',
  //     Dec: '12'
  //   };

  //   return `${date[3]}-${months[date[2]]}-${date[1]}`
  // };

  const handleRunDetails = e => {
    console.log("clicked!");
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

  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={3} sm={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            aria-label="Vertical tabs example"
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
          </Tabs>
        </Grid>
        <Grid item xs={9} sm={9}>
          <Box className={classes.calendarContainer} alignContent="center">
            <Box className={classes.graphNav} display="flex" justifyContent="space-around">
              <Box className={
                showCal
                  ? classes.base
                  : classes.selected
              }
                onClick={handleShowCalGraph}
              >
                <span className={classes.navText}>Calendar <i className="fas fa-calendar-alt"></i></span>
              </Box>
              <Box className={
                showDistance
                  ? classes.base
                  : classes.selected
              }
                onClick={handleShowDistGraph}
              >
                <span className={classes.navText}>Distance <i className="fas fa-running"></i></span>
              </Box>
              <Box className={
                showCalories
                  ? classes.base
                  : classes.selected
              }
                onClick={handleShowCalorGraph}
              >
                <span className={classes.navText}>Calories <i className="fas fa-fire"></i></span>
              </Box>
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
          </Box>
          {/* <Button color="secondary" onClick={handleRunForm}>Add Run</Button> */}
        </Grid>
      </Grid>
      {/* <Box className={classes.nav}>
        <ul>
          {runs.map(run => {
            return (
              <li
                key={run.id}
                className={classes.list}
                onClick={handleRunDetails}
              >
                <RunDetails run={run} />
              </li>
            );
          })}
        </ul>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box className={classes.calendarContainer}>
          <Box className={classes.graphNav} display="flex" justifyContent="space-around">
            <Box className={
              showCal
                ? classes.base
                : classes.selected
            }
              onClick={handleShowCalGraph}
            >
              <span>Calendar <i className="fas fa-calendar-alt"></i></span>
            </Box>
            <Box className={
              showDistance
                ? classes.base
                : classes.selected
            }
              onClick={handleShowDistGraph}
            >
              <span>Distance <i className="fas fa-running"></i></span>
            </Box>
            <Box className={
              showCalories
                ? classes.base
                : classes.selected
            }
              onClick={handleShowCalorGraph}
            >
              <span>Calories <i className="fas fa-fire"></i></span>
            </Box>
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
        </Box>
        <Button color="secondary" onClick={handleRunForm}>Add Run</Button>
      </Box> */}
    </React.Fragment>
  );
}

export default MyStats;
