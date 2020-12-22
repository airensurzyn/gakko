import Link from 'next/link';
import styles from './styles/header.module.css';
import colors from '../styles/colors';
import Button from 'react-bootstrap/Button';
import useRequest from '../hooks/use-request';

export default ({ currentUser, setPageState }) => {
	const { signoutRequest } = useRequest({
		url: '/api/users/signout',
		method: 'post',
		body: {},
		onSuccess: () => Router.push('/'),
	});

	const setPageSignup = () => {
		setPageState('signup');
	};

	const setPageSignIn = () => {
		setPageState('signin');
	};

	// NOTE, cool way to filter options
	const links = [
		!currentUser && {
			label: 'Sign up',
			onClickFunction: setPageSignup,
		},
		!currentUser && {
			label: 'Sign in',
			onClickFunction: setPageSignIn,
		},
		currentUser && {
			label: 'Sign out',
			onClickFunction: signoutRequest,
		},
	]
		.filter((linkConfig) => linkConfig)
		.map(({ label, onClickFunction }) => {
			return (
				<li key={label}>
					<Button className={styles.actionButton} onClick={onClickFunction}>
						{label}
					</Button>
				</li>
			);
		});

	return (
		<nav
			className="navbar"
			style={{
				backgroundColor: '#ffffff',
			}}
		>
			<Link href="/">
				<a
					className="navbar-brand"
					style={{
						color: `${colors.lightBlue}`,
						fontWeight: 'bold',
						fontSize: '1.5rem',
					}}
				>
					Gakko
				</a>
			</Link>
			<div className="d-flex justify-content-end">
				<ul className="nav d-flex align-items-center">{links}</ul>
			</div>
		</nav>
	);
};
