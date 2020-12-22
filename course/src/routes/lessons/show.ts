import express, { Request, Response } from 'express';
import { Lesson } from '../../models/lesson';
import { NotFoundError } from '@llp-common/backend-common';

const router = express.Router();

router.get('/api/lessons/:lessonId', async (req: Request, res: Response) => {
    const lesson = await Lesson.findById(req.params.lessonId);

    if(!lesson) {
        throw new NotFoundError;
    }

    res.send(lesson);
});

export { router as showLessonRouter };