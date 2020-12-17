import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { Course } from '../models/course';
import { Order } from '../models/order';
import { validateRequest, requireAuth, OrderStatus } from '@llp-common/backend-common';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/api/orders', requireAuth, 
        [body('courseId').not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('Course Id must be provided')], validateRequest, async(req: Request, res: Response) => {
    const { courseId } = req.body;

    const course = await Course.findOne({_id: courseId});

    if(!course) {
        throw new Error('Course not found');
    }

    const order = Order.build({
        course,
        status: OrderStatus.Created,
        userId: req.currentUser!.id
    });

    await order.save();

    res.status(201).send(order);
});

export { router as newOrderRouter };