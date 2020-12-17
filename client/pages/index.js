import buildClient from '../api/build-client';
import Landing from '../components/landing/landing';

const LandingPage = ({ currentUser }) => {
	return <Landing />;
};

/*LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);

	const response = await client.get('/api/users/current');

	return response.data;
};*/

export default LandingPage;
