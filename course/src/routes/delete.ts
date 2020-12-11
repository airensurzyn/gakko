import express, { Request, Response } from 'express';
import { Course } from '../models/course';
import { NotFoundError, NotAuthorizedError, CourseStatus } from '@llp-common/backend-common';

const router = express.Router();

router.delete('/api/courses/:courseId', async (req: Request, res: Response) => {
    const course = await Course.findById(req.params.courseId);

    if(!course) {
        throw new NotFoundError;
    }
    if(course.instructor !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    course.status = CourseStatus.Cancelled;
    await course.save();

    res.send(course);
});

export { router as deleteCourseRouter };