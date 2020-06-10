import React from 'react';
import MainDash from './homepage/MainDash';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
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
				<Grid item xs={12}>
					<Typography align="center" variant="h4">
						Welcome Back
					</Typography>
				</Grid>
				<Grid item xs={12} sm={3}>
					<h1>Sidebard</h1>
				</Grid>
				<Grid item xs={12} sm={9}>
					<MainDash />
				</Grid>
			</Grid>
		</Container>
	);
};

export default HomePage;
