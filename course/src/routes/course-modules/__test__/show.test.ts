import request from 'supertest';
import { app } from '../../../app';
import { Course } from '../../../models/course';
import { CourseModule } from '../../../models/course-module';
import mongoose from 'mongoose';

it('gets the specified course module from the courseModuleId', async () => {
    const user = global.signup();

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

    const { body: courseModule } = await request(app)
        .post('/api/course-modules')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course Module",
            description: "It's about testing things",
            courseId: course.id,
            lessons: []
        }).expect(201);

    const { body: retrievedModule } = await request(app)
        .get('/api/course-modules/' + courseModule.id)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(courseModule.id).toEqual(retrievedModule.id);
});

it('returns a 404 for incorrect courseModuleId', async () => {
    const user = global.signup();

    const randomId = mongoose.Types.ObjectId();

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

    const { body: courseModule } = await request(app)
        .post('/api/course-modules')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course Module",
            description: "It's about testing things",
            courseId: course.id,
            lessons: []
        }).expect(201);
    
    await request(app)
        .get('/api/course-modules/' + randomId)
        .set('Cookie', user)
        .send()
        .expect(404);
});