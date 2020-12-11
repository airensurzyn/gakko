import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@llp-common/backend-common';
import { Course } from '../models/course';
import { validateCourseCreateRequest } from '../validator/course-validator';

const router = express.Router();

router.post('/api/courses', requireAuth, validateCourseCreateRequest,
    validateRequest, async (req: Request, res: Response) => {

        const { title, description } = req.body;

        res.status(201).send({});

    });

export { router as createCourseRouter };

