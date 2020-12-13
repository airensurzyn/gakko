import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header /*currentUser={currentUser}*/ />
			<Component /*{...pageProps}*/ />
		</div>
	);
};

/*AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const response = await client.get('/api/users/current');
	const data = response.data;
	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}
	return {
		pageProps,
		...data,
	};
};*/

export default AppComponent;
