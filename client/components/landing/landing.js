import React, { useState } from 'react';
import Banner from './banner';
import TeacherStudentSection from './teacher-student-section';

export default () => {
	const [pageState, setPageState] = useState('view');

	return (
		<div>
			<Banner setPageState={setPageState} />
			<TeacherStudentSection />
		</div>
	);
};
