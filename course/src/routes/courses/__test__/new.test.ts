import request from 'supertest';
import { app } from '../../../app';
import { Course } from '../../../models/course';
import { natsWrapper } from '../../../nats-wrapper';

it('has a route handler listening to /api/courses for post requests', async () => {
    const response = await request(app)
        .post('/api/courses')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('authenticates user requests', async () => {
    const response = await request(app)
        .post('/api/courses')
        .send({});
    expect(response.status).toEqual(401);
});

it('does not return a 401 if user is authenticated', async () => {
    const response = await request(app)
        .post('/api/courses')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course",
            description: "It's about testing things",
            languageTopic:"japanese",
            instructionLanguage:"english",
            status: "closed",
            price: 5,
            headerImage: "http://someurl.com",
        });
    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid price is provided', async () => {
    const response = await request(app)
        .post('/api/courses')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course",
            description: "It's about testing things",
            languageTopic:"japanese",
            instructionLanguage:"english",
            status: "closed",
            price: -5,
            headerImage: "http://someurl.com",
        }).expect(400);
});

it('returns an error if no title is provided', async () => {
    const response = await request(app)
        .post('/api/courses')
        .set('Cookie', global.signup())
        .send({
            
            description: "It's about testing things",
            languageTopic:"japanese",
            instructionLanguage:"english",
            status: "closed",
            price: -5,
            headerImage: "http://someurl.com",
        }).expect(400);
});

it('creates a valid course with valid inputs', async () => {
    let courses = await Course.find({});
    expect(courses.length).toEqual(0);

    await request(app)
        .post('/api/courses')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course",
            description: "It's about testing things",
            languageTopic:"japanese",
            instructionLanguage:"english",
            status: "closed",
            price: 5,
            headerImage: "http://someurl.com",
        }).expect(201);
    
    courses = await Course.find({});
    expect(courses.length).toEqual(1);
    expect(courses[0].title).toEqual("Test Course");
    expect(courses[0].description).toEqual("It's about testing things");
    expect(courses[0].languageTopic).toEqual("japanese");
    expect(courses[0].instructionLanguage).toEqual("english");
    expect(courses[0].price).toEqual(5);
});

it('publishes the course create event', async () => {
    await request(app)
        .post('/api/courses')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course",
            description: "It's about testing things",
            languageTopic:"japanese",
            instructionLanguage:"english",
            status: "closed",
            price: 5,
            headerImage: "http://someurl.com",
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})