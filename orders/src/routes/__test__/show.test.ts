import request from 'supertest';
import { app } from '../../app';
import { Course } from '../../models/course';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('gets the specified order from the orderId', async ()=> {
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
    const {body: retrievedOrder} = await request(app)
        .get('/api/orders/' + order.id)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(order.id).toEqual(retrievedOrder.id);
});

it('returns a 404 for incorrect orderId', async ()=> {
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
    const {body: retrievedOrder} = await request(app)
        .get('/api/orders/' + userId)
        .set('Cookie', user)
        .send()
        .expect(404);

});

it('returns a 401 for an unauthorized request for an order', async() => {
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
    const {body: retrievedOrder} = await request(app)
        .get('/api/orders/' + order.id)
        .set('Cookie', global.signup())
        .send()
        .expect(401);
});