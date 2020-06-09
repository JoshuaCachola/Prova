// src/App.js

import React from 'react';
import NavBar from './components/NavBar';

import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import history from './utils/history';
import PrivateRoute from './components/PrivateRoute';
import ExternalApi from './views/ExternalApi';

function App() {
	return (
		<div className="App">
			{/* Don't forget to include the history module */}
			<Router history={history}>
				<header>
					<NavBar />
				</header>
				<Switch>
					<Route path="/" exact />
					<PrivateRoute path="/profile" exact component={Profile} />
					<PrivateRoute path="/external-api" exact component={ExternalApi} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
