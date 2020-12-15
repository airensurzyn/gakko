import request from 'supertest';
import { app } from '../../app';
import { Course } from '../../models/course';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/courses')
        .send({});

    expect(response.status).not.toEqual(404);
});