import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Course } from '../models/course';
import { NotFoundError, NotAuthorizedError, CourseStatus, Languages, requireAuth, validateRequest, BadRequestError } from '@llp-common/backend-common';
import { CourseUpdatedPublisher } from '../events/publishers/course-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/courses/:courseId', requireAuth, [body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('languageTopic').not().isEmpty().withMessage('Language Topic is required'),
    body('instructionLanguage').not().isEmpty().withMessage('Instruction Language is required')],
    validateRequest,async (req: Request, res: Response) => {
    const course = await Course.findById(req.params.courseId);

    const { title, description, languageTopic, instructionLanguage, status, headerImage, price} = req.body; 

    if(!Object.values(CourseStatus).includes(status)) {
        throw new BadRequestError('Status is not of proper type CourseStatus enum');
    }
    if(!Object.values(Languages).includes(languageTopic)) {
        throw new BadRequestError('Language Topic is not of proper type Language enum');
    }
    if(!Object.values(Languages).includes(instructionLanguage)) {
        throw new BadRequestError('Instruction Language is not of proper type Language enum');
    }

    if(!course) {
        throw new NotFoundError;
    }
    if(course.instructor !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    course.title = title;
    course.description = description;
    course.languageTopic = languageTopic;
    course.instructionLanguage = instructionLanguage;
    course.status = status;
    course.headerImage = headerImage;
    course.price = price;

    await course.save();

    new CourseUpdatedPublisher(natsWrapper?.client).publish({
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
    });

    res.send(course);
});

export { router as updateCourseRouter };