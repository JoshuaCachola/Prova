import React, { useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import Footer from './Footer';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
	root: {
		height: 'inherit',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	image: {
		width: '100%'
	}
}));

const LandingPage = (props) => {
	const classes = useStyles();

	const { isAuthenticated } = useAuth0();

	useEffect(() => {
		document.title = 'Prova';
	}, []);

	if (isAuthenticated) {
		props.history.push('/home');
	}

	return (
		<React.Fragment>
			<Container component="main" maxWidth="lg" className={classes.root}>
				<Box mt={10}>
					<Typography variant="h3">The Best Way To Track Your Runs</Typography>
				</Box>
				<div>
					<img src={require('../images/imac-data.jpg')} className={classes.image} alt="imac with data" />
				</div>
			</Container>
			<Footer />
		</React.Fragment>
	);
};

export default LandingPage;
