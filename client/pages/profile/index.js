import React from 'react';
import styles from './styles/index.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CourseCard from '../../components/course-ui/course-card';
import CourseList from '../../components/course-ui/course-list';

const Profile = () => {
	const courseList = [
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
	];
	return (
		<Container className={styles.root}>
			<Row style={{ marginBottom: '2rem' }}>My Courses</Row>
			<Row>
				{courseList.map((course) => (
					<CourseCard
						title={course.title}
						content={course.content}
						imageSource={course.imageSource}
					/>
				))}
			</Row>
		</Container>
	);
};

export default Profile;
