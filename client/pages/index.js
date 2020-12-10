import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	return 'Home page';
};

/*LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);

	const response = await client.get('/api/users/current');

	return response.data;
};*/

export default LandingPage;
