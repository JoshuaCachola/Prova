import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(3, 2),
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<footer className={classes.footer}>
				<Container maxWidth="sm" className={classes.content}>
					<div>
						<Typography variant="body1">Welcome to Prova</Typography>
						<Typography variant="body2" color="textSecondary">
							{'Copyright © '}
							{'Prova '}
							{new Date().getFullYear()}
							{'.'}
						</Typography>
					</div>
					<Grid container className={classes.about}>
						<Typography variant="body1">About the Developers</Typography>
					</Grid>
				</Container>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
