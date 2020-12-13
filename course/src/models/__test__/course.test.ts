import { Course } from '../course';
import { CourseStatus } from '@llp-common/backend-common';

it('implements occ', async () => {

    const course = Course.build({
        title: "Test Course",
        instructor: "Test instructor",
        description: "Description",
        price: 15,
        languageTopic: "japanese",
        instructionLanguage: "english",
        headerImage: 'image.png',
        status: CourseStatus.Closed
    });

    await course.save();

    const firstFetchedCourse = await Course.findById(course.id);
    const secondFetchedCourse = await Course.findById(course.id);

    firstFetchedCourse!.set({ title:'Updated first fetched course'});
    secondFetchedCourse!.set({ title: 'Updated second fetched course'});

    await firstFetchedCourse!.save();

    await secondFetchedCourse!.save();
});