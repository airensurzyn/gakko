import request from 'supertest';
import {app} from '../../app';

import { Course } from '../../models/course';
import { Order } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';

it('creates an order when given the correct information', async () => {
    
    const userId = mongoose.Types.ObjectId();
   
    let course = Course.build({
        title:'Test Course',
        price: 20,
        id: userId.toHexString()
    });
    await course.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signup())
        .send({ courseId: course.id})
        .expect(201);
});

it('fails when the course doesnt exist', async () => {
    const courseId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signup())
        .send({courseId})
        .expect(404);
});

it('fails when you dont provide a course', async() => {
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signup())
        .send({})
        .expect(400);
});