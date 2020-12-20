import request from 'supertest';
import { app } from '../../../app';
import { CourseModule } from '../../../models/course-module';
import { Course } from '../../../models/course';
import mongoose from 'mongoose';

it('has a route handler listening to /api/course-modules for post requests', async () => {
    const response = await request(app)
        .post('/api/course-modules')
        .send({});
    
    expect(response.status).not.toEqual(404);
});

it('authenticates user requests', async () => {
    const response = await request(app)
        .post('/api/course-modules')
        .send({});
    expect(response.status).toEqual(401);
});

it('does not return a 401 if user is authenticated', async () => {
    const courseId = mongoose.Types.ObjectId();
    
    const response = await request(app)
    .post('/api/course-modules')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course Module",
            description: "It's about testing things",
            courseId: courseId.toHexString(),
            lessons: []
        });
    expect(response.status).not.toEqual(401);
});


it('returns an error if no title is provided', async () => {
    const courseId = mongoose.Types.ObjectId();
    const response = await request(app)
        .post('/api/courses')
        .set('Cookie', global.signup())
        .send({
            description: "It's about testing things",
            courseId: courseId.toHexString(),
            lessons: []
        }).expect(400);
});

it('creates a valid course module with valid inputs', async () => {
    let courseModules = await CourseModule.find({});
    expect(courseModules.length).toEqual(0);

    const {body: course} = await request(app)
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
    
    await request(app)
        .post('/api/course-modules')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course Module",
            description: "It's about testing things",
            courseId: course.id,
            lessons: []
        }).expect(201);
    
    courseModules = await CourseModule.find({});
    expect(courseModules.length).toEqual(1);
    expect(courseModules[0].title).toEqual("Test Course Module");
    expect(courseModules[0].description).toEqual("It's about testing things");
    expect(courseModules[0].courseId).toEqual(course.id);
        
});