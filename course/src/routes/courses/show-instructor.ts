import express, { Request, Response } from 'express';
import { requireAuth } from '@llp-common/backend-common';
import { Course } from '../../models/course';

const router = express.Router();

router.get('/api/courses/instructor/:instructorId', requireAuth, async (req: Request, res: Response) => {
    const courses = await Course.find({instructor: req.params.instructorId});

    res.send(courses);
});

export { router as showInstructorCourseRouter };