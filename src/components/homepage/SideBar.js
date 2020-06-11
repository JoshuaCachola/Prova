import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardContent, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		height: '150px',
		display: 'flex',
		justifyContent: 'center'
	},
	cardPosition: {
		position: 'absolute',
		zIndex: 0,
		textAlign: 'center'
	},
	avatar: {
		position: 'relative',
		bottom: '35px',
		left: '20%',
		zIndex: 1
	},
	linkStyle: {
		color: 'red',
		textDecoration: 'none',
		textTransform: 'uppercase'
	}
}));

const SideBar = () => {
	const currentUser = useSelector((state) => state.authorization.currentUser);

	const classes = useStyles();

	return (
		<React.Fragment>
			{currentUser && (
				<React.Fragment>
					<Card variant="outlined" className={classes.root}>
						<CardContent className={classes.cardPosition}>
							<Avatar alt={currentUser.nickname} src={currentUser.picture} className={classes.avatar} />
							<Typography align="center" variant="h6">
								{currentUser.nickname}
							</Typography>
							<div>
								<Link to="/my-stats" className={classes.linkStyle}>
									My Stats
								</Link>
							</div>
							<div>
								<Link to="/my-routes" className={classes.linkStyle}>
									My Routes
								</Link>
							</div>
						</CardContent>
					</Card>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default SideBar;
