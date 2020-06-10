// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from './react-auth0-spa';
import config from './auth_config.json';
import history from './utils/history';
import configureStore from './store/configureStore'

// A function that routes the user to the right place after login
const onRedirectCallback = (appState) => {
	history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Auth0Provider
				domain={config.domain}
				client_id={config.clientId}
				redirect_uri={window.location.origin}
				audience={config.audience}
				onRedirectCallback={onRedirectCallback}
			>
				<App />
			</Auth0Provider>
		</BrowserRouter>
	</Provider>
	,
	document.getElementById('root')
);

serviceWorker.unregister();
