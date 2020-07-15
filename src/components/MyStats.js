import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getRuns, handleShowRunPopup } from '../store/runs';

import Calendar from './stats/Calendar';
import RunDetails from './stats/RunDetails';
import LineGraph from './stats/LineGraph';
import TotalStats from './stats/TotalStats';
import RunPopup from './stats/RunPopup';

const useStyles = makeStyles({
	nav: {
		maxHeight: '100vh',
		overflowY: 'auto',
		overflowX: 'hidden',
	},
	list: {
		listStyleType: 'none',
		borderBottom: '1px solid #e6e6e6',
		cursor: 'pointer'
	},
	graphContainer: {
		height: '500px',
		minWidth: '60vw',
		marginTop: '5px',
		justifyContent: 'space-between'
	},
	graphNav: {
		borderBottom: '1px solid #e6e6e6',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around'
	},
	graphLinks: {
		borderLeft: '1px solid #e6e6e6',
		borderRight: '1px solid #e6e6e6',
		padding: '5px'
	},
	navText: {
		fontSize: '16px',
		fontWeight: 'bold'
	},
	calendarContainer: {
		width: '100px'
	},
});

const MyStats = () => {
	const [value, setValue] = useState(0);
	const [calData, setCalData] = useState([]);
	const [distanceData, setDistanceData] = useState([]);
	const [caloriesData, setCaloriesData] = useState([]);
	const [showCal, setShowCal] = useState(true);
	const [showDistance, setShowDistance] = useState(false);
	const [showCalories, setShowCalories] = useState(false);
	const [combinedRuns, setCombinedRuns] = useState([]);
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authorization.currentUser);
	const showRunPopup = useSelector(({ runs }) => runs.showRunPopup);
	const runs = useSelector((state) => state.runs.runs);

	const lineGraph = (type) => {
		const graphData = {
			id: 'runs',
			color: '#FF6600',
			data: []
		};

		combinedRuns.forEach((run) => {
			graphData.data.push({
				x: run.date,
				y: run[type]
			});
		});

		return [graphData];
	};

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getRuns(currentUser.userId));
			}
		},
		// eslint-disable-next-line
		[currentUser, runs.length]
	);

	useEffect(
		() => {
			const calendarRuns = [];
			if (runs.length) {
				runs.forEach((run) => {
					const cRun = {};
					cRun.day = run.date;
					cRun.value = run.distance;
					calendarRuns.push(cRun);
				});

				setCalData(calendarRuns);
			}
		},
		// eslint-disable-next-line
		[runs.length]
	);

	useEffect(() => {
		const popupObj = {};
		runs.forEach(run => {
			popupObj[run.id] = false;
		});
		dispatch(handleShowRunPopup(popupObj));
	},
		// eslint-disable-next-line
		[runs.length, runs]
	);

	useEffect(() => {
		const combinedRuns = [];
		if (runs.length) {
			runs.forEach((run) => {
				const cRun = {};
				const objIdx = combinedRuns.findIndex(obj => obj.date === run.date);
				if (objIdx !== -1) {
					combinedRuns[objIdx].distance += run.distance;
					combinedRuns[objIdx].calories += run.calories;
				} else {
					cRun.date = run.date;
					cRun.distance = run.distance;
					cRun.calories = run.calories
					combinedRuns.push(cRun);
				}
			});

			setCombinedRuns(combinedRuns);
			setDistanceData(lineGraph('distance'));
			setCaloriesData(lineGraph('calories'));
		}
	},
		// eslint-disable-next-line
		[distanceData.length, caloriesData.length, runs.length]
	);

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

	const handlePopup = e => {
		const currentTarget = e.currentTarget.id;
		if (showRunPopup[currentTarget] === false) {
			const newPopupObj = { ...showRunPopup };
			newPopupObj[currentTarget] = !newPopupObj[currentTarget];
			dispatch(handleShowRunPopup(newPopupObj));
		}
	};

	const classes = useStyles();
	return (
		<React.Fragment>
			<Grid container>
				<Grid item xs={3} sm={3}>
					<Box orientation="vertical" variant="scrollable" className={classes.nav}>
						{runs.map((run) => {
							return (
								<Box
									key={run.id}
									id={run.id}
									className={classes.list}
									onClick={handlePopup}
								>
									<RunDetails run={run} />
									{showRunPopup[run.id] &&
										<RunPopup run={run} runId={run.id} />
									}
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
								<Tab label="Calendar" className={classes.navText} />
								<Tab label="Distance" className={classes.navText} />
								<Tab label="Calories" className={classes.navText} />
							</Tabs>
						</Box>
						{showCal && <Calendar myRuns={calData} />}
						{showDistance && <LineGraph runs={distanceData} legend="Distance in miles" />}
						{showCalories && <LineGraph runs={caloriesData} legend="Calories" />}
						{/* {showRunForm &&
              <AddRunForm />
            } */}
						<Grid container justify="center">
							<Grid item xs={9} s={9}>
								<TotalStats runs={runs} />
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default MyStats;
