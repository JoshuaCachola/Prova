import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

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
		margin: theme.spacing(3, 0, 2)
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

const LandingPage = (props) => {
	const classes = useStyles();

	const { isAuthenticated, loginWithRedirect } = useAuth0();

	if (isAuthenticated) {
		props.history.push('/home');
	}

	return (
		<React.Fragment>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Card>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Log In
						</Typography>
						{!isAuthenticated && (
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={() => loginWithRedirect({})}
							>
								Continue
							</Button>
						)}
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</div>
				</Card>
			</Container>
		</React.Fragment>
	);
};

export default LandingPage;
