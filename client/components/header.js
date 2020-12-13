import Link from 'next/link';
import styles from './styles/header.module.css';
import colors from '../styles/colors';
import Button from 'react-bootstrap/Button';

export default ({ currentUser }) => {
	// NOTE, cool way to filter options
	const links = [
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
							<Button className={styles.actionButton}>{label}</Button>
						</a>
					</Link>
				</li>
			);
		});
	return (
		<nav
			className="navbar"
			style={{
				backgroundColor: '#ffffff',
				borderBottom: `1px solid ${colors.lightBlue}`,
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
