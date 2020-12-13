import buildClient from '../api/build-client';
import Banner from '../components/landing/banner';

const LandingPage = ({ currentUser }) => {
	return <Banner />;
};

/*LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);

	const response = await client.get('/api/users/current');

	return response.data;
};*/

export default LandingPage;
