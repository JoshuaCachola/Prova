import React, { useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import Footer from './Footer';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
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
			<Container maxWidth="lg" className={classes.rootContainer}>
				<Typography variant="h3">The Best App To Track Your Runs</Typography>
			</Container>
			<Footer />
		</React.Fragment>
	);
};

export default LandingPage;
