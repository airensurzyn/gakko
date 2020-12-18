import request from 'supertest';
import { app } from '../../app';
import { Course } from '../../models/course';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '@llp-common/backend-common';
import { Order } from '../../models/order';

it('cancels an order when given the correct orderId', async ()=> {
    const userId = mongoose.Types.ObjectId();
    const user = global.signup();
   
    let course = Course.build({
        title:'Test Course',
        price: 20,
        id: userId.toHexString()
    });
    await course.save();
   
    const {body: order}  = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ courseId: course.id})
        .expect(201);
    await request(app)
        .delete('/api/orders/' + order.id)
        .set('Cookie', user)
        .send()
        .expect(204);

    const deletedOrder = await Order.findById(order.id);

    expect(deletedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('returns a 404 when an order is not found', async() => {
    const orderId = mongoose.Types.ObjectId();
    const {body: retrievedOrder} = await request(app)
        .delete('/api/orders/' + orderId)
        .set('Cookie', global.signup())
        .send()
        .expect(404);
});

it('returns a 401 when an unauthorized user requests to cancel an order', async () => {
    const userId = mongoose.Types.ObjectId();
    const user = global.signup();
    const user2 = global.signup();
   
    let course = Course.build({
        title:'Test Course',
        price: 20,
        id: userId.toHexString()
    });
    await course.save();
   
    const {body: order}  = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ courseId: course.id})
        .expect(201);
    await request(app)
        .delete('/api/orders/' + order.id)
        .set('Cookie', user2)
        .send()
        .expect(401);
});