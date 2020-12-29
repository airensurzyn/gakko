import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, requireAuth, validateRequest, Languages, CourseStatus  } from '@llp-common/backend-common';
import { Course } from '../../models/course';
import { CourseCreatedPublisher } from '../../events/publishers/course-created-publisher';
import { natsWrapper } from '../../nats-wrapper';

const router = express.Router();

router.post('/api/courses', requireAuth, [body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('languageTopic').not().isEmpty().withMessage('Language Topic is required'),
    body('instructionLanguage').not().isEmpty().withMessage('Instruction Language is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')],
    validateRequest, async (req: Request, res: Response) => {
        const { title, description, languageTopic, instructionLanguage, headerImage, price } = req.body;

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
            price,
            instructionLanguage,
            status: CourseStatus.Closed,
            instructor: req.currentUser!.id,
            headerImage: headerImage
        });


        await course.save();
        new CourseCreatedPublisher(natsWrapper?.client).publish({
            id: course._id,
            version: course.version,
            title: course.title,
            description: course.description,
            languageTopic: course.languageTopic,
            instructionLanguage: course.instructionLanguage,
            status: course.status,
            instructor: course.instructor,
            headerImage: course.headerImage,
            price: course.price
        })

        res.status(201).send(course);

    });

export { router as createCourseRouter };

