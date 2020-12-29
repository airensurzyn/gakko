import React, { useEffect, useState } from 'react';
import styles from './styles/index.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import CourseCard from '../../components/course-ui/course-card';
import CreateCourse from './course/create';
import useRequest from '../../hooks/use-request';

const Profile = ({ pageState, setPageState, currentUser }) => {
	const [courseList, setCourseList] = useState([]);
	const [recentlyFetched, setRecentlyFetched] = useState(false);
	const { doRequest, errors } = useRequest({
		url: '/api/courses/instructor/' + currentUser.id,
		method: 'get',
	});

	console.log(currentUser);

	useEffect(() => {
		const getCourseList = async () => {
			let res = await doRequest();
			setCourseList(res);
		};
		if (!recentlyFetched) {
			getCourseList();
			setRecentlyFetched(false);
		}
	}, [recentlyFetched]);

	/*const courseList = [
		{
			title: 'Javascript 101',
			content: 'Some content text here',
			imageSource:
				'https://static.frontendmasters.com/assets/courses/2019-04-05-js-recent-parts/thumb@2x.jpg',
		},
		{
			title: 'React 101',
			content: 'Some content text here',
			imageSource: 'https://reactjs.org/logo-og.png',
		},
	];*/

	const createCourseMode = () => {
		pageState === 'view' ? setPageState('createCourse') : setPageState('view');
	};

	return (
		<Container className={styles.root}>
			<Row
				style={{ marginBottom: '2rem' }}
				class="d-flex justify-content-between"
			>
				<span style={{ fontWeight: 'bold', fontSize: '24px' }}>
					{pageState === 'view' ? 'My Courses' : 'New Course'}
				</span>

				<Button onClick={createCourseMode}>
					{pageState === 'view' ? '+ Create a Course' : 'Back to Profile'}
				</Button>
			</Row>
			{pageState === 'view' ? (
				<Row style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
					{courseList.map((course) => (
						<CourseCard
							title={course.title}
							content={course.description}
							imageSource={course.imageSource}
						/>
					))}
				</Row>
			) : (
				''
			)}
			{pageState === 'createCourse' ? (
				<Row
					style={{
						paddingLeft: '2rem',
						paddingRight: '2rem',
						justifyContent: 'center',
					}}
					class="d-flex justify-content-center"
				>
					<CreateCourse setPageState={setPageState} />
				</Row>
			) : (
				''
			)}
			{pageState === 'createCourseSuccess' ? <Row>Success!</Row> : ''}
		</Container>
	);
};

export default Profile;
