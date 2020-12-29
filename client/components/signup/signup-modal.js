import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../styles/signup-modal.module.css';

const SignupModal = ({ setPageState, pageState }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userType, setUserType] = useState('student');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: {
			email,
			password,
			userType,
		},
		onSuccess: () => Router.push('/profile'),
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		let response = await doRequest();
	};

	const handleClose = () => {
		setPageState('view');
	};

	return (
		<Modal
			size="sm"
			show={pageState === 'signup'}
			onHide={handleClose}
			centered
		>
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
					<div className="form-group">
						<label>I am a ...</label>
						<br />
						<Form.Control
							as="select"
							defaultValue="student"
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value={'student'}>Student</option>
							<option value={'instructor'}>Instructor</option>
						</Form.Control>
					</div>
					{errors}
					<div className="d-flex justify-content-end">
						<button className={`btn btn-primary ${styles.signupButton}`}>
							Sign up
						</button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default SignupModal;
