import React from 'react';
import MainDash from './homepage/MainDash';
import SideBar from './homepage/SideBar';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing(8)
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

const HomePage = () => {
	const classes = useStyles();

	return (
		<Container className={classes.root} maxWidth="md">
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} sm={3}>
					<SideBar />
				</Grid>
				<Grid item xs={12} sm={9}>
					<MainDash />
				</Grid>
			</Grid>
		</Container>
	);
};

export default HomePage;
