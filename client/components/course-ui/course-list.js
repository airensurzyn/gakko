import Row from 'react-bootstrap/Row';
import CourseCard from './course-card';

const CourseList = ({ courseList }) => {
	return courseList.map((course) => {
		<CourseCard
			title={course.title}
			content={course.content}
			imageSource={course.imageSource}
		/>;
	});
};

export default CourseList;
