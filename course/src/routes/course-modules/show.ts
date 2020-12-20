import express, { Request, Response } from 'express';
import { CourseModule } from '../../models/course-module';
import { NotFoundError } from '@llp-common/backend-common';

const router = express.Router();

router.get('/api/course-modules/:courseModuleId', async (req: Request, res: Response) => {
    const courseModule = await CourseModule.findById(req.params.courseModuleId);

    if(!courseModule) {
        throw new NotFoundError;
    }

    res.send(courseModule);
});

export { router as showCourseModuleRouter };