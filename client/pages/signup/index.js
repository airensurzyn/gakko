import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Modal from 'react-bootstrap/Modal';

export default () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [pageState, setPageState] = useState('view');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push('/'),
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		let response = await doRequest();
		console.log(response);
	};

	const handleClose = () => {
		setPageState('close');
	};

	return (
		<Modal show={pageState === 'view'} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label>Email Address</label>
						<input
							className="form-control"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							className="form-control"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{errors}
					<button className={`btn btn-primary `}>Sign up</button>
				</form>
			</Modal.Body>
		</Modal>
	);
};
