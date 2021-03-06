import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@llp-common/backend-common';
import { CourseModule } from '../../models/course-module';
import { Course } from '../../models/course';

const router = express.Router();

router.post('/api/course-modules', requireAuth, [body('title').not().isEmpty().withMessage('Title is required'),
    body('courseId').not().isEmpty().withMessage('Course Id is required')],
    validateRequest, async (req: Request, res: Response) => {

        const {title, description, courseId, lessons } = req.body;

        const parentCourse = await Course.findById(courseId);

        if(!parentCourse) {
            throw new NotFoundError();
        }

        const courseModule = CourseModule.build({
            title,
            description,
            courseId,
            lessons
        });

        await courseModule.save();
        res.status(201).send(courseModule);
    },
);

export { router as createCourseModuleRouter };