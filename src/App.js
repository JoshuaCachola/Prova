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
import ExternalApi from './views/ExternalApi';
import { CssBaseline } from '@material-ui/core';

function App() {
	return (
		<div className="App">
			<CssBaseline />
			{/* Don't forget to include the history module */}
			<Router history={history}>
				<NavBar />
				<Switch>
					<PrivateRoute path="/profile" exact component={Profile} />
					<PrivateRoute path="/external-api" exact component={ExternalApi} />
					<Route path="/" exact={true} component={LandingPage} />
					<Route path="/create-route" exact={true} component={CreateRoute} />
					<Route path="/home" exact={true} component={HomePage} />
					<Route path="/my-routes" exact={true} component={MyRoutes} />
					<Route path="/my-stats" exact={true} component={MyStats} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
