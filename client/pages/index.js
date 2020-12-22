import React from 'react';
import Landing from '../components/landing/landing';
import SignupModal from '../components/signup/signup-modal';
import SigninModal from '../components/signin/signin-modal';

const LandingPage = ({ currentUser, pageState, setPageState }) => {
	return (
		<div>
			<Landing />
			<SignupModal pageState={pageState} setPageState={setPageState} />
			<SigninModal pageState={pageState} setPageState={setPageState} />
		</div>
	);
};

/*LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);

	const response = await client.get('/api/users/current');

	return response.data;
};*/

export default LandingPage;
