// src/App.js
import React from 'react';
import NavBar from './components/NavBar';

import { Router, Route, Switch } from 'react-router-dom';
import CreateRoute from './components/routes/CreateRoute';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import MyRoutes from './components/routes/MyRoutes';
import MyStats from './components/MyStats';
import Profile from './components/Profile';
import history from './utils/history';
import PrivateRoute from './components/PrivateRoute';
import { CssBaseline } from '@material-ui/core';

function App() {
	return (
		<div className="App">
			<CssBaseline />
			{/* Don't forget to include the history module */}
			<Router history={history}>
				<NavBar />
				<Switch>
					<Route path="/" exact={true} component={LandingPage} />
					<PrivateRoute path="/home" exact={true} component={HomePage} />
					<PrivateRoute path="/profile" exact component={Profile} />
					<PrivateRoute path="/create-route" exact={true} component={CreateRoute} />
					<PrivateRoute path="/my-routes" exact={false} component={MyRoutes} />
					<PrivateRoute path="/my-stats" exact={true} component={MyStats} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
