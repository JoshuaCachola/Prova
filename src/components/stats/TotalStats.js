import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
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
  }
});

const TotalStats = ({ runs }) => {
  const [totalMiles, setTotalMiles] = useState(0.00),
    [totalRuns, setTotalRuns] = useState(0),
    [avgDist, setAvgDist] = useState(0.00),
    [avgPace, setAvgPace] = useState(0.00);

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
    console.log(totalTime);
    setAvgPace((totalTime / 60) / totalMiles);

  }, [runs.length, runs]);

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
      </Box>
    </React.Fragment>
  );
};

export default TotalStats;
