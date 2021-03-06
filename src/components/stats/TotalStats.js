import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils';
import { getMyRoutes } from '../../store/routes';
import { getRuns } from '../../store/runs';

const useStyles = makeStyles((theme) => ({
  totals: {
    fontSize: "20px",
    fontWeight: 'bold',
    fontStyle: 'italic',
    justifyContent: 'center',
    textAlign: 'center'
  },
  header: {
    fontSize: '24px',
    fontWeight: '400'
  },
  textCenter: {
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  popUpHeader: {
    borderBottom: '1px solid #a6a6a6'
  }
}));

const TotalStats = ({ runs }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authorization.currentUser);
  const routes = useSelector((state) => state.routes.routes);
  const [totalMiles, setTotalMiles] = useState(0.00);
  const [totalRuns, setTotalRuns] = useState(0);
  const [avgDist, setAvgDist] = useState(0.00);
  const [avgPace, setAvgPace] = useState(0.00);
  // [showRunForm, setRunForm] = useState(false),
  const [distance, setDistance] = useState(""); //default should be the distance that comes from the route
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");

  useEffect(() => {
    let totalMiles = 0;
    let totalRuns = 0;
    let totalTime = 0;

    runs.forEach(run => {
      totalMiles += run.distance;
      totalRuns++;
      totalTime += run.time;
    });

    setTotalMiles(totalMiles);
    setTotalRuns(totalRuns);
    setAvgDist(totalMiles / totalRuns);
    const min = Math.floor((totalTime / 60) / totalMiles);
    const sec = Math.floor((((totalTime / 60) / totalMiles) - min) * 60);
    setAvgPace(min + (sec / 100));

  }, [runs.length, runs]);


  useEffect(
    () => {
      if (currentUser) {
        dispatch(getMyRoutes(currentUser.userId));
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDistance("");
    setRoute("");
    setOpen(false);
  };

  const handleChange = (e) => {
    setRoute(e.target.value);
    // const idx = document.getElementById('routes-select').tabIndex;
    // const route = routes[idx]
    // setDistance(route.route.distance.toFixed(2));
  };

  const handleDistance = e => {
    setDistance(e.target.value)
  };

  const handleSubmit = async e => {
    const userId = currentUser.userId;
    try {
      const res = await fetch(`${api.url}/users/${userId}/runs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          distance,
          routeId: route,
          time,
          calories,
        })
      });

      if (!res.ok) throw res;
    } catch (err) {
      console.error(err);
    } finally {
      handleClose();
      dispatch(getRuns(userId));
      setDistance("");
      setRoute("");
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <p className={classes.header}>Total Stats</p>
      <Box display="flex" justifyContent="space-around" className={classes.textCenter}>
        <Box flexDirection="column">
          <CountUp
            start={0.00}
            end={totalMiles}
            decimal="."
            decimals={2}
            duration={3}
            delay={0}
          >
            {({ countUpRef }) => (
              <div className={classes.totals}>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <Box>
            <span className={classes.textCenter}>Total Miles</span>
          </Box>
        </Box>
        <Box flexDirection="column">
          <CountUp
            start={0}
            end={totalRuns}
            duration={2}
            delay={0}
          >
            {({ countUpRef }) => (
              <div className={classes.totals}>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <Box>
            <span>Total Runs</span>
          </Box>
        </Box>
        <Box flexDirection="column">
          <CountUp
            start={0.00}
            end={avgDist}
            decimal="."
            decimals={2}
            duration={3}
            delay={0}
            suffix=" mi"
          >
            {({ countUpRef }) => (
              <div className={classes.totals}>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <Box>
            <span>Avg. Distance</span>
          </Box>
        </Box>
        <Box flexDirection="column">
          <CountUp
            start={0.00}
            end={avgPace}
            decimal="."
            decimals={2}
            duration={3}
            delay={0}
            suffix=" min/mi"
          >
            {({ countUpRef }) => (
              <div className={classes.totals}>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <Box>
            <span>Avg. Pace</span>
          </Box>
        </Box>

        <Box>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={handleClickOpen}
          >
            <i className="fas fa-plus-circle"></i>&nbsp;<span>Add run</span>
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.popUpHeader} id="form-dialog-title">Add a run</DialogTitle>
            <DialogContent>
              <FormControl className={classes.formControl}>
                <InputLabel color="secondary" id="routes-input">My Saved Routes</InputLabel>
                <Select
                  labelId="routes"
                  id="routes-select"
                  value={route}
                  onChange={handleChange}
                  color="secondary"
                >
                  {routes &&
                    routes.map(({ route: { id, name } }, i) => <MenuItem id={i} key={id} value={id}>{name}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="distance"
                label="Distance"
                type="text"
                value={distance}
                onChange={handleDistance}
                placeholder="00.00 in miles"
                fullWidth
                color="secondary"
              />
              <TextField
                autoFocus
                margin="dense"
                id="run_duration"
                label="Run duration"
                type="text"
                onChange={e => setTime(e.target.value)}
                placeholder="(min)'(sec) separated by an apostraphe ( ' )"
                fullWidth
                color="secondary"
              />
              <TextField
                autoFocus
                margin="dense"
                id="calories"
                label="Calories"
                type="text"
                onChange={e => setCalories(e.target.value)}
                placeholder="0.00"
                fullWidth
                color="secondary"
              />
              <TextField
                id="datetime-local"
                label="Date and time"
                type="datetime-local"
                defaultValue={date}
                onChange={e => setDate(e.target.value)}
                fullWidth
                color="secondary"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                color="primary">
                Run it!
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TotalStats;
