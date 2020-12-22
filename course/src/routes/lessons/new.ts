import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@llp-common/backend-common';
import { CourseModule } from '../../models/course-module';
import { Lesson } from '../../models/lesson';

const router = express.Router();

router.post('/api/lessons', requireAuth, [body('title').not().isEmpty().withMessage('Title is required'),
    body('videoUrl').not().isEmpty().withMessage('Video Url is required'),
    body('moduleId').not().isEmpty().withMessage('Module Id is required')], 
    validateRequest, async (req: Request, res: Response) => {

    const { title, videoUrl, moduleId } = req.body;

    const parentModule = await CourseModule.findById(moduleId);

    if(!parentModule) {
        throw new NotFoundError();
    }

    const lesson = Lesson.build({
        title,
        videoUrl,
        moduleId
    });

    await lesson.save();
    res.status(201).send(lesson);
});

export { router as createLessonRouter };