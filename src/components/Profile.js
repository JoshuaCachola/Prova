import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '../react-auth0-spa';

const Profile = () => {
	const { loading, user } = useAuth0();
	// const user = useSelector((state) => state.authorization.currentUser);
	// console.log('profile: ', currentUser);

	if (loading || !user) {
		return <div>Loading...</div>;
	}
	return (
		<Fragment>
			{user && (
				<Fragment>
					<img src={user.picture} alt="Profile" />
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<code>{JSON.stringify(user, null, 2)}</code>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
