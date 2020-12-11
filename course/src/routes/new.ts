import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, requireAuth, validateRequest } from '@llp-common/backend-common';
import { Course } from '../models/course';
import { Languages, CourseStatus } from '@llp-common/backend-common';

const router = express.Router();

router.post('/api/courses', requireAuth, [body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('languageTopic').not().isEmpty().withMessage('Language Topic is required'),
    body('instructionLanguage').not().isEmpty().withMessage('Instruction Language is required')],
    validateRequest, async (req: Request, res: Response) => {
        
        const { title, description, languageTopic, instructionLanguage } = req.body;

        if(!Object.values(Languages).includes(languageTopic)) {
            throw new BadRequestError('Language Topic is not of proper type Language enum');
        }
        if(!Object.values(Languages).includes(instructionLanguage)) {
            throw new BadRequestError('Instruction Language is not of proper type Language enum');
        }

        const course = Course.build({
            title,
            description, 
            languageTopic,
            instructionLanguage,
            status: CourseStatus.Closed,
            instructor: req.currentUser!.id
        });


        await course.save();

        res.status(201).send(course);

    });

export { router as createCourseRouter };

