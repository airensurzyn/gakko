import Link from 'next/link';
import styles from './styles/header.module.css';
import colors from '../styles/colors';
import Button from 'react-bootstrap/Button';

export default ({ currentUser, setPageState }) => {
	// NOTE, cool way to filter options
	/*const links = [
		!currentUser && { label: 'Sign up', href: '/signup' },
		!currentUser && { label: 'Sign in', href: '/signin' },
		currentUser && { label: 'Sign out', href: '/signout' },
	]
		.filter((linkConfig) => linkConfig)
		.map(({ label, href }) => {
			return (
				<li key={href}>
					<Link href={href}>
						<a
							className="nav-link"
							style={{ color: `${colors.lightRed}`, fontWeight: 'bold' }}
						>
							<Button>{label}</Button>
						</a>
					</Link>
				</li>
			);
		});*/

	const setPageSignup = () => {
		setPageState('signup');
	};

	const setPageSignIn = () => {
		setPageState('signin');
	};

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
				<ul className="nav d-flex align-items-center">
					<li key="Sign-up">
						<Button onClick={setPageSignup} className={styles.actionButton}>
							Signup
						</Button>
					</li>
					<li key="Sign-in">
						<Button onClick={setPageSignIn} className={styles.actionButton}>
							Sign In
						</Button>
					</li>
				</ul>
			</div>
		</nav>
	);
};
