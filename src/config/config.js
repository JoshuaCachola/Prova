const api = {
	url:
		process.env.NODE_ENV === 'development'
			? process.env.REACT_APP_DEV_API || 'http://localhost:5000'
			: process.env.REACT_APP_PROD_API || 'https://prova-backend.herokuapp.com',
	main:
		process.env.NODE_ENV === 'development'
			? process.env.REACT_APP_DEV_API || 'http://localhost:3000'
			: process.env.REACT_APP_PROD_API || 'https://prova-run.herokuapp.com'
};

export default api;
