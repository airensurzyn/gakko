import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/signup-modal.module.css';

const SigninModal = ({ setPageState, pageState }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push('/profile'),
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		await doRequest();
	};

	const handleClose = () => {
		setPageState('view');
	};

	return (
		<Modal show={pageState === 'signin'} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Sign In</Modal.Title>
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
					<div className="d-flex justify-content-end">
						<button className={`btn btn-primary ${styles.signupButton}`}>
							Sign In
						</button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default SigninModal;
