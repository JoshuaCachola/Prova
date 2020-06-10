import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
	const user = useSelector((state) => state.authorization.currentUser);

	// if (loading || !user) {
	// 	return <div>Loading...</div>;
	// }
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
