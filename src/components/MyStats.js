import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Calendar from './stats/Calendar';
import RunDetails from './stats/RunDetails';

const useStyles = makeStyles({
  nav: {
    maxHeight: "100%",
    maxWidth: "20%",
    overflowY: "scroll"
  },
  list: {
    listStyleType: "none"
  }
});

const MyStats = () => {
  const [myRuns, setMyRuns] = useState([]);
  const [calData, setCalData] = useState([]);
  useEffect(() => {
    const runs = [
      { 'id': 1, 'distance': 21.01, 'time': 222.71, 'date': '2020, 06, 30', 'user_id': 1, 'calories': 2383.36, 'route': 5 },
      { 'id': 2, 'distance': 21.36, 'time': 176.65, 'date': '2018, 05, 14', 'user_id': 1, 'calories': 2423.07, 'route': 6 },
      { 'id': 3, 'distance': 18.84, 'time': 235.69, 'date': '2020, 03, 01', 'user_id': 1, 'calories': 2137.2, 'route': 2 },
      { 'id': 4, 'distance': 10.96, 'time': 109.93, 'date': '2019, 06, 01', 'user_id': 1, 'calories': 1243.3, 'route': 7 },
      { 'id': 5, 'distance': 19.29, 'time': 147.38, 'date': '2018, 01, 07', 'user_id': 1, 'calories': 2188.25, 'route': 4 },
      { 'id': 6, 'distance': 10.84, 'time': 127.37, 'date': '2018, 09, 13', 'user_id': 1, 'calories': 1229.68, 'route': 7 },
      { 'id': 7, 'distance': 26.71, 'time': 253.21, 'date': '2020, 03, 16', 'user_id': 1, 'calories': 3029.97, 'route': 2 },
      { 'id': 8, 'distance': 11.49, 'time': 93.07, 'date': '2020, 09, 07', 'user_id': 1, 'calories': 1303.42, 'route': 8 },
      { 'id': 9, 'distance': 17.58, 'time': 231.7, 'date': '2020, 11, 21', 'user_id': 1, 'calories': 1994.27, 'route': 4 },
      { 'id': 10, 'distance': 14.44, 'time': 104.11, 'date': '2018, 11, 02', 'user_id': 1, 'calories': 1638.07, 'route': 6 },
      { 'id': 11, 'distance': 4.99, 'time': 43.36, 'date': '2019, 05, 13', 'user_id': 1, 'calories': 566.06, 'route': 4 },
      { 'id': 12, 'distance': 12.45, 'time': 97.73, 'date': '2020, 04, 02', 'user_id': 1, 'calories': 1412.32, 'route': 9 },
      { 'id': 13, 'distance': 22.5, 'time': 270.45, 'date': '2018, 11, 04', 'user_id': 1, 'calories': 2552.39, 'route': 7 },
      { 'id': 14, 'distance': 8.47, 'time': 112.14, 'date': '2020, 07, 03', 'user_id': 1, 'calories': 960.83, 'route': 9 },
      { 'id': 15, 'distance': 3.71, 'time': 48.01, 'date': '2020, 04, 04', 'user_id': 1, 'calories': 420.86, 'route': 3 },
      { 'id': 16, 'distance': 7.54, 'time': 103.0, 'date': '2020, 06, 06', 'user_id': 1, 'calories': 855.33, 'route': 8 },
      { 'id': 17, 'distance': 22.43, 'time': 194.47, 'date': '2020, 07, 01', 'user_id': 1, 'calories': 2544.45, 'route': 4 },
      { 'id': 18, 'distance': 20.51, 'time': 260.27, 'date': '2018, 06, 29', 'user_id': 1, 'calories': 2326.64, 'route': 9 },
      { 'id': 19, 'distance': 25.36, 'time': 213.78, 'date': '2018, 12, 03', 'user_id': 1, 'calories': 2876.83, 'route': 5 },
      { 'id': 20, 'distance': 21.81, 'time': 200.22, 'date': '2018, 08, 12', 'user_id': 1, 'calories': 2474.11, 'route': 7 },
      { 'id': 21, 'distance': 26.02, 'time': 228.98, 'date': '2019, 08, 22', 'user_id': 1, 'calories': 2951.7, 'route': 9 },
      { 'id': 22, 'distance': 14.53, 'time': 151.26, 'date': '2019, 09, 01', 'user_id': 1, 'calories': 1648.28, 'route': 3 },
      { 'id': 23, 'distance': 13.11, 'time': 98.19, 'date': '2018, 08, 22', 'user_id': 1, 'calories': 1487.19, 'route': 9 },
      { 'id': 24, 'distance': 2.18, 'time': 30.32, 'date': '2020, 02, 20', 'user_id': 1, 'calories': 247.3, 'route': 3 },
      { 'id': 25, 'distance': 18.53, 'time': 201.98, 'date': '2019, 06, 04', 'user_id': 1, 'calories': 2102.03, 'route': 8 },
      { 'id': 26, 'distance': 8.35, 'time': 60.62, 'date': '2020, 06, 17', 'user_id': 1, 'calories': 947.22, 'route': 3 },
      { 'id': 27, 'distance': 10.57, 'time': 114.58, 'date': '2020, 02, 18', 'user_id': 1, 'calories': 1199.06, 'route': 3 },
      { 'id': 28, 'distance': 5.39, 'time': 56.54, 'date': '2018, 04, 21', 'user_id': 1, 'calories': 611.44, 'route': 5 },
      { 'id': 29, 'distance': 20.65, 'time': 160.86, 'date': '2019, 09, 14', 'user_id': 1, 'calories': 2342.53, 'route': 7 },
      { 'id': 30, 'distance': 3.97, 'time': 40.53, 'date': '2020, 05, 06', 'user_id': 1, 'calories': 450.35, 'route': 6 },
      { 'id': 31, 'distance': 15.74, 'time': 174.87, 'date': '2019, 10, 18', 'user_id': 1, 'calories': 1785.54, 'route': 4 },
      { 'id': 32, 'distance': 6.6, 'time': 83.03, 'date': '2019, 09, 08', 'user_id': 1, 'calories': 748.7, 'route': 1 },
      { 'id': 33, 'distance': 10.24, 'time': 112.44, 'date': '2018, 12, 19', 'user_id': 1, 'calories': 1161.62, 'route': 6 },
      { 'id': 34, 'distance': 9.7, 'time': 114.46, 'date': '2020, 05, 06', 'user_id': 1, 'calories': 1100.36, 'route': 4 },
      { 'id': 35, 'distance': 8.81, 'time': 92.95, 'date': '2020, 05, 11', 'user_id': 1, 'calories': 999.4, 'route': 8 },
      { 'id': 36, 'distance': 9.03, 'time': 108.81, 'date': '2020, 01, 25', 'user_id': 1, 'calories': 1024.36, 'route': 5 },
      { 'id': 37, 'distance': 7.34, 'time': 73.33, 'date': '2019, 03, 30', 'user_id': 1, 'calories': 832.65, 'route': 6 },
      { 'id': 38, 'distance': 2.95, 'time': 25.87, 'date': '2020, 05, 12', 'user_id': 1, 'calories': 334.65, 'route': 6 },
      { 'id': 39, 'distance': 13.95, 'time': 105.6, 'date': '2018, 04, 24', 'user_id': 1, 'calories': 1582.48, 'route': 3 },
      { 'id': 40, 'distance': 12.94, 'time': 137.42, 'date': '2019, 02, 03', 'user_id': 1, 'calories': 1467.91, 'route': 6 },
      { 'id': 41, 'distance': 16.43, 'time': 124.87, 'date': '2018, 07, 11', 'user_id': 1, 'calories': 1863.81, 'route': 7 },
      { 'id': 42, 'distance': 11.15, 'time': 151.42, 'date': '2020, 07, 06', 'user_id': 1, 'calories': 1264.85, 'route': 6 },
      { 'id': 43, 'distance': 11.93, 'time': 118.11, 'date': '2019, 06, 07', 'user_id': 1, 'calories': 1353.33, 'route': 3 },
      { 'id': 44, 'distance': 20.65, 'time': 163.13, 'date': '2019, 12, 30', 'user_id': 1, 'calories': 2342.53, 'route': 1 },
      { 'id': 45, 'distance': 12.93, 'time': 179.47, 'date': '2019, 06, 03', 'user_id': 1, 'calories': 1466.77, 'route': 7 },
      { 'id': 46, 'distance': 18.04, 'time': 203.49, 'date': '2019, 03, 14', 'user_id': 1, 'calories': 2046.45, 'route': 1 },
      { 'id': 47, 'distance': 14.64, 'time': 191.78, 'date': '2019, 08, 11', 'user_id': 1, 'calories': 1660.75, 'route': 7 },
      { 'id': 48, 'distance': 6.79, 'time': 77.07, 'date': '2020, 11, 03', 'user_id': 1, 'calories': 770.25, 'route': 1 },
      { 'id': 49, 'distance': 9.5, 'time': 109.25, 'date': '2020, 04, 01', 'user_id': 1, 'calories': 1077.68, 'route': 3 },
      { 'id': 50, 'distance': 13.34, 'time': 181.69, 'date': '2019, 05, 17', 'user_id': 1, 'calories': 1513.28, 'route': 3 },
      { 'id': 51, 'distance': 10.89, 'time': 89.84, 'date': '2020, 07, 24', 'user_id': 1, 'calories': 1235.36, 'route': 4 },
      { 'id': 52, 'distance': 12.77, 'time': 176.48, 'date': '2018, 11, 05', 'user_id': 1, 'calories': 1448.62, 'route': 4 },
      { 'id': 53, 'distance': 6.89, 'time': 56.64, 'date': '2020, 08, 08', 'user_id': 1, 'calories': 781.6, 'route': 7 },
      { 'id': 54, 'distance': 25.97, 'time': 208.02, 'date': '2018, 11, 04', 'user_id': 1, 'calories': 2946.02, 'route': 8 },
      { 'id': 55, 'distance': 1.29, 'time': 11.48, 'date': '2020, 11, 20', 'user_id': 1, 'calories': 146.34, 'route': 1 },
      { 'id': 56, 'distance': 16.18, 'time': 203.71, 'date': '2018, 06, 21', 'user_id': 1, 'calories': 1835.45, 'route': 4 },
      { 'id': 57, 'distance': 26.51, 'time': 311.76, 'date': '2019, 11, 10', 'user_id': 1, 'calories': 3007.28, 'route': 3 },
      { 'id': 58, 'distance': 14.86, 'time': 150.38, 'date': '2019, 01, 06', 'user_id': 1, 'calories': 1685.71, 'route': 6 },
      { 'id': 59, 'distance': 9.58, 'time': 91.49, 'date': '2019, 01, 15', 'user_id': 1, 'calories': 1086.75, 'route': 8 },
      { 'id': 60, 'distance': 22.05, 'time': 282.68, 'date': '2019, 09, 10', 'user_id': 1, 'calories': 2501.34, 'route': 4 },
      { 'id': 61, 'distance': 21.09, 'time': 159.65, 'date': '2020, 01, 29', 'user_id': 1, 'calories': 2392.44, 'route': 5 },
      { 'id': 62, 'distance': 20.83, 'time': 160.6, 'date': '2020, 03, 15', 'user_id': 1, 'calories': 2362.94, 'route': 9 },
      { 'id': 63, 'distance': 16.71, 'time': 150.89, 'date': '2019, 05, 12', 'user_id': 1, 'calories': 1895.57, 'route': 5 },
      { 'id': 64, 'distance': 5.44, 'time': 51.95, 'date': '2018, 03, 18', 'user_id': 1, 'calories': 617.11, 'route': 5 },
      { 'id': 65, 'distance': 4.18, 'time': 39.92, 'date': '2019, 03, 22', 'user_id': 1, 'calories': 474.18, 'route': 5 },
      { 'id': 66, 'distance': 17.33, 'time': 189.76, 'date': '2019, 01, 24', 'user_id': 1, 'calories': 1965.91, 'route': 7 },
      { 'id': 67, 'distance': 12.77, 'time': 151.32, 'date': '2018, 02, 08', 'user_id': 1, 'calories': 1448.62, 'route': 6 },
      { 'id': 68, 'distance': 26.29, 'time': 314.43, 'date': '2019, 03, 20', 'user_id': 1, 'calories': 2982.32, 'route': 7 },
      { 'id': 69, 'distance': 2.27, 'time': 21.43, 'date': '2019, 05, 08', 'user_id': 1, 'calories': 257.51, 'route': 7 },
      { 'id': 70, 'distance': 1.06, 'time': 11.07, 'date': '2020, 03, 22', 'user_id': 1, 'calories': 120.25, 'route': 4 },
      { 'id': 71, 'distance': 15.96, 'time': 160.4, 'date': '2019, 09, 02', 'user_id': 1, 'calories': 1810.49, 'route': 5 },
      { 'id': 72, 'distance': 14.03, 'time': 161.06, 'date': '2019, 03, 20', 'user_id': 1, 'calories': 1591.56, 'route': 6 },
      { 'id': 73, 'distance': 11.06, 'time': 79.63, 'date': '2020, 04, 05', 'user_id': 1, 'calories': 1254.64, 'route': 3 },
      { 'id': 74, 'distance': 11.56, 'time': 131.32, 'date': '2018, 12, 27', 'user_id': 1, 'calories': 1311.36, 'route': 8 },
      { 'id': 75, 'distance': 12.66, 'time': 160.78, 'date': '2019, 11, 28', 'user_id': 1, 'calories': 1436.14, 'route': 9 },
      { 'id': 76, 'distance': 25.09, 'time': 282.01, 'date': '2018, 12, 29', 'user_id': 1, 'calories': 2846.2, 'route': 4 },
      { 'id': 77, 'distance': 22.44, 'time': 236.29, 'date': '2018, 06, 13', 'user_id': 1, 'calories': 2545.58, 'route': 6 },
      { 'id': 78, 'distance': 9.81, 'time': 74.16, 'date': '2018, 05, 20', 'user_id': 1, 'calories': 1112.84, 'route': 2 },
      { 'id': 79, 'distance': 17.5, 'time': 194.6, 'date': '2020, 03, 19', 'user_id': 1, 'calories': 1985.19, 'route': 2 },
      { 'id': 80, 'distance': 16.64, 'time': 122.3, 'date': '2018, 08, 19', 'user_id': 1, 'calories': 1887.63, 'route': 3 },
      { 'id': 81, 'distance': 19.86, 'time': 152.92, 'date': '2020, 10, 04', 'user_id': 1, 'calories': 2252.91, 'route': 4 },
      { 'id': 82, 'distance': 10.56, 'time': 81.42, 'date': '2019, 07, 26', 'user_id': 1, 'calories': 1197.92, 'route': 2 },
      { 'id': 83, 'distance': 18.0, 'time': 188.28, 'date': '2020, 06, 19', 'user_id': 1, 'calories': 2041.91, 'route': 2 },
      { 'id': 84, 'distance': 26.03, 'time': 207.72, 'date': '2020, 11, 01', 'user_id': 1, 'calories': 2952.83, 'route': 6 },
      { 'id': 85, 'distance': 21.01, 'time': 208.84, 'date': '2020, 08, 21', 'user_id': 1, 'calories': 2383.36, 'route': 3 },
      { 'id': 86, 'distance': 22.84, 'time': 272.71, 'date': '2019, 09, 04', 'user_id': 1, 'calories': 2590.96, 'route': 5 },
      { 'id': 87, 'distance': 22.44, 'time': 187.37, 'date': '2018, 12, 14', 'user_id': 1, 'calories': 2545.58, 'route': 6 },
      { 'id': 88, 'distance': 23.59, 'time': 323.18, 'date': '2019, 11, 02', 'user_id': 1, 'calories': 2676.04, 'route': 3 },
      { 'id': 89, 'distance': 19.97, 'time': 227.46, 'date': '2020, 12, 19', 'user_id': 1, 'calories': 2265.39, 'route': 1 },
      { 'id': 90, 'distance': 13.86, 'time': 183.09, 'date': '2020, 07, 05', 'user_id': 1, 'calories': 1572.27, 'route': 3 },
      { 'id': 91, 'distance': 18.44, 'time': 229.39, 'date': '2020, 07, 10', 'user_id': 1, 'calories': 2091.82, 'route': 1 },
      { 'id': 92, 'distance': 14.91, 'time': 126.59, 'date': '2019, 01, 19', 'user_id': 1, 'calories': 1691.38, 'route': 7 },
      { 'id': 93, 'distance': 3.98, 'time': 31.0, 'date': '2018, 07, 04', 'user_id': 1, 'calories': 451.49, 'route': 7 },
      { 'id': 94, 'distance': 7.54, 'time': 74.12, 'date': '2020, 11, 18', 'user_id': 1, 'calories': 855.33, 'route': 3 },
      { 'id': 95, 'distance': 23.53, 'time': 247.54, 'date': '2020, 02, 22', 'user_id': 1, 'calories': 2669.23, 'route': 6 },
      { 'id': 96, 'distance': 12.86, 'time': 160.88, 'date': '2019, 05, 12', 'user_id': 1, 'calories': 1458.83, 'route': 4 },
      { 'id': 97, 'distance': 1.25, 'time': 16.95, 'date': '2019, 07, 08', 'user_id': 1, 'calories': 141.8, 'route': 8 },
      { 'id': 98, 'distance': 24.1, 'time': 277.15, 'date': '2019, 05, 28', 'user_id': 1, 'calories': 2733.89, 'route': 8 },
      { 'id': 99, 'distance': 2.86, 'time': 23.82, 'date': '2019, 09, 10', 'user_id': 1, 'calories': 324.44, 'route': 5 }];

    const filtered_runs = [];
    runs.forEach(run => {
      const fRun = {};
      fRun.day = run.date.split(", ").join("-");
      fRun.value = run.distance;

      filtered_runs.push(fRun);
    });

    setMyRuns(runs);

    // needs to be sorted by date
    setCalData(filtered_runs);
  }, []);

  const handleRunDetails = e => {
    console.log("clicked!");
  };

  const classes = useStyles();
  return (
    <>
      <Box className={classes.nav}>
        <ul>
          {myRuns.map(run => {
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
      <Box width='1000px' height='500px'>
        <Calendar myRuns={calData} />
      </Box>
    </>
  );
}

export default MyStats;
