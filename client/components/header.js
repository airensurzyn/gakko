import Link from 'next/link';

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
						<a className="nav-link">{label}</a>
					</Link>
				</li>
			);
		});
	return (
		<nav className="navbar navbar-light bg-light">
			<Link href="/">
				<a className="navbar-brand">GitTix</a>
			</Link>
			<div className="d-flex justify-content-end">
				<ul className="nav d-flex align-items-center">{links}</ul>
			</div>
		</nav>
	);
};
