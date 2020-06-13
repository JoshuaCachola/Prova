import React, { useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
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
		<Container component="main" maxWidth="xs" className={classes.root}>
			<h1>Landing Page</h1>
		</Container>
	);
};

export default LandingPage;
