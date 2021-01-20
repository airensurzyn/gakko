import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { Course } from '../models/course';
import { Order } from '../models/order';
import { validateRequest, requireAuth, OrderStatus, NotFoundError } from '@llp-common/backend-common';
import mongoose from 'mongoose';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post('/api/orders', requireAuth, 
        [body('courseId').not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('Course Id must be provided')], validateRequest, async(req: Request, res: Response) => {
    const { courseId } = req.body;

    const course = await Course.findOne({_id: courseId});

    if(!course) {
        throw new NotFoundError();
    } 

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
        course,
        status: OrderStatus.Created,
        userId: req.currentUser!.id,
        expiresAt: expiration,
    });

    await order.save();


    new OrderCreatedPublisher(natsWrapper.client).publish({
        course: {
            id: course.id,
            title: course.title,
            price: course.price
        },
        status : order.status,
        userId: order.userId,
        version: order.version,
        id: order._id,
        expiresAt: order.expiresAt.toISOString()
    })

    res.status(201).send(order);
    
});

export { router as newOrderRouter };