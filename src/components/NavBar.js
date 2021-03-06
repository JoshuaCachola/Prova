import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '../react-auth0-spa';
import { getUser } from '../store/authorization';
// import baseUrl from '../config/config';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	image: {
		backgroundImage: 'url(../images/runner.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
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
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		color: 'red'
	},
	appBar: {
		backgroundColor: 'white'
	},
	linkStyle: {
		textDecoration: 'none',
		color: 'inherit',
	}
}));

const NavBar = (props) => {
	const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authorization.currentUser);

	const matchMyStats = useRouteMatch('/my-stats');
	const matchMyRoutes = useRouteMatch('/my-routes');
	const matchCreateRoute = useRouteMatch('/create-route');
	const matchHome = useRouteMatch('/home');

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(
		() => {
			dispatch(getUser(user));
			// eslint-disable-next-line
		},
		[user, dispatch]
	);

	// const handleLogout = () => {
	// 	logout({
	// 		returnTo: baseUrl.main
	// 	});
	// };

	const classes = useStyles();

	// if (loading || !currentUser) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<React.Fragment>
			<div className={classes.appBarRoot}>
				<AppBar position="static" className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							<Link to="/home" className={classes.linkStyle} underline="none">
								<i className="fab fa-strava"></i> PROVA
							</Link>
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
							{isAuthenticated &&
								currentUser && (
									<React.Fragment>
										{matchMyStats && (
											<Button variant="contained" color="secondary" className={classes.submit}>
												<Link to="/create-route" className={classes.linkStyle}>
													Create Route
												</Link>
											</Button>
										)}
										{matchMyRoutes && (
											<Button variant="contained" color="secondary" className={classes.submit}>
												<Link to="/create-route" className={classes.linkStyle}>
													Create Route
											</Link>
											</Button>
										)}
										<IconButton
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={handleMenu}
											color="inherit"
										>
											<Avatar alt={currentUser.nickname} src={currentUser.picture} />
										</IconButton>
										<Menu
											id="menu-appbar"
											anchorEl={anchorEl}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right'
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right'
											}}
											open={open}
											onClose={handleClose}
										>
											{matchCreateRoute && (
												<div>
													<MenuItem onClick={handleClose}>
														<Link to="/my-stats" className={classes.linkStyle} underline="none">
															My Stats
													</Link>
													</MenuItem>
													<MenuItem onClick={handleClose}>
														<Link
															to="/my-routes"
															className={classes.linkStyle}
															underline="none"
														>
															My Routes
													</Link>
													</MenuItem>
												</div>
											)}
											{(matchMyStats || matchHome) && (
												<MenuItem onClick={handleClose}>
													<Link to="/my-routes" className={classes.linkStyle} underline="none">
														My Routes
												</Link>
												</MenuItem>
											)}
											{(matchMyRoutes || matchHome) && (
												<MenuItem onClick={handleClose}>
													<Link to="/my-stats" className={classes.linkStyle} underline="none">
														My Stats
												</Link>
												</MenuItem>
											)}
											{/* <MenuItem onClick={handleClose}>
											<Link to="/profile" className={classes.linkStyle} underline="none">
												Profile
											</Link>
										</MenuItem> */}
											<MenuItem onClick={() => logout()}>Log out</MenuItem>
										</Menu>
									</React.Fragment>
								)}
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</React.Fragment>
	);
};

export default NavBar;
