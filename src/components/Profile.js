import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '../react-auth0-spa';

const Profile = () => {
	const { loading } = useAuth0();
	const currentUser = useSelector((state) => state.authorization.currentUser);

	if (loading || !currentUser) {
		return <div>Loading...</div>;
	}
	return (
		<Fragment>
			{currentUser && (
				<Fragment>
					<img src={currentUser.picture} alt="Profile" />
					<h2>{currentUser.name}</h2>
					<p>{currentUser.email}</p>
					<code>{JSON.stringify(currentUser, null, 2)}</code>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
