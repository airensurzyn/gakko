import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import useRequest from '../../../hooks/use-request';

const CreateCourse = ({ setPageState }) => {
	const [courseDetails, setCourseDetails] = useState({
		title: '',
		languageTopic: 'english',
		price: '',
		instructionLanguage: 'japanese',
		status: '',
		headerImage: '',
	});

	const { doRequest, errors } = useRequest({
		url: '/api/courses',
		method: 'post',
		body: courseDetails,
	});

	const submitCourse = async (event) => {
		event.preventDefault();
		let result = await doRequest();
		if (result) {
			setPageState('createCourseSuccess');
		}
	};

	return (
		<Form onSubmit={submitCourse} style={{ width: '70%' }}>
			<Form.Row>
				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Title</Form.Label>
					<Form.Control
						placeholder="Enter a Course Title"
						value={courseDetails.title}
						onChange={(e) =>
							setCourseDetails({ ...courseDetails, title: e.target.value })
						}
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Price</Form.Label>
					<Form.Control
						placeholder="Enter a Course Price"
						value={courseDetails.price}
						onChange={(e) =>
							setCourseDetails({ ...courseDetails, price: e.target.value })
						}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Course Thumbnail</Form.Label>
					<Form.Control
						placeholder="Image for your course thumbnail"
						value={courseDetails.headerImage}
						onChange={(e) =>
							setCourseDetails({
								...courseDetails,
								headerImage: e.target.value,
							})
						}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Group controlId="formGridAddress1">
				<Form.Label>Description</Form.Label>
				<Form.Control
					rows={3}
					as="textarea"
					placeholder="Course Description"
					value={courseDetails.description}
					onChange={(e) =>
						setCourseDetails({ ...courseDetails, description: e.target.value })
					}
				/>
			</Form.Group>

			<Form.Row>
				<Form.Group as={Col} controlId="formGridState">
					<Form.Label>Target Language</Form.Label>
					<Form.Control
						as="select"
						value={courseDetails.languageTopic}
						onChange={(e) => {
							setCourseDetails({
								...courseDetails,
								languageTopic: e.target.value,
							});
						}}
					>
						<option value={'english'}>English</option>
						<option value={'japanese'}>Japanese</option>
					</Form.Control>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridState">
					<Form.Label>Instruction Language</Form.Label>
					<Form.Control
						as="select"
						value={courseDetails.instructionLanguage}
						onChange={(e) => {
							setCourseDetails({
								...courseDetails,
								instructionLanguage: e.target.value,
							});
						}}
					>
						<option value={'japanese'}>Japanese</option>
						<option value={'english'}>English</option>
					</Form.Control>
				</Form.Group>
			</Form.Row>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default CreateCourse;
