import express, { Request, Response } from 'express';
import { Course } from '../models/course';
import { NotFoundError } from '@llp-common/backend-common';

const router = express.Router();

router.get('/api/courses/:courseId', async (req: Request, res: Response) => {
    const course = await Course.findById(req.params.courseId);

    if(!course) {
        throw new NotFoundError;
    }

    res.send(course);
});

export { router as showCourseRouter };