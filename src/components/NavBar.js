import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: 'url(../images/runner.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(2, 0, 2)
	},
	appBarRoot: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		color: 'red'
	},
	appBar: {
		backgroundColor: 'white'
	}
}));

const NavBar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const classes = useStyles();

	return (
		<React.Fragment>
			<div className={classes.appBarRoot}>
				<AppBar position="static" className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							PROVA
						</Typography>
						<div>
							{!isAuthenticated && (
								<Button
									variant="contained"
									color="secondary"
									className={classes.submit}
									onClick={() => loginWithRedirect({})}
								>
									Log in or Sign Up
								</Button>
							)}
							{isAuthenticated && (
								<Button variant="contained" className={classes.submit} onClick={() => logout()}>
									Log out
								</Button>
							)}
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</React.Fragment>
	);
};

export default NavBar;
