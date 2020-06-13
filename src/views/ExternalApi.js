import React, { useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import api from '../utils';

const ExternalApi = () => {
	const [showResult, setShowResult] = useState(false);
	const [apiMessage, setApiMessage] = useState('');
	const { getTokenSilently } = useAuth0();

	const callApi = async () => {
		try {
			const token = await getTokenSilently();

			const response = await fetch(`${api.url}/api/public`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const responseData = await response.json();

			setShowResult(true);
			setApiMessage(responseData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<React.Fragment>
			<h1>External API</h1>
			<button onClick={callApi}>Ping API</button>
			{showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
		</React.Fragment>
	);
};

export default ExternalApi;
