import request from 'supertest';
import { app } from '../../../app';
import { CourseModule } from '../../../models/course-module';
import mongoose from 'mongoose';
import { Lesson } from '../../../models/lesson';

it('has a route handler listening to /api/lessons for post requests', async () => {
    const response = await request(app)
        .post('/api/lessons')
        .send({});
    
    expect(response.status).not.toEqual(404);
});

it('authenticates user requests', async () => {
    const response = await request(app)
        .post('/api/lessons')
        .send({});
    expect(response.status).toEqual(401);
});

it('returns an error if no title is provided', async () => {
    const moduleId = mongoose.Types.ObjectId();
    await request(app)
        .post('/api/lessons')
        .set('Cookie', global.signup())
        .send({
           
            videoUrl: "https://randomURl.com",
            moduleId: moduleId
        }).expect(400);
});

it('creates a valid lesson with valid inputs', async () => {
    let lessons = await Lesson.find({});
    expect(lessons.length).toEqual(0);

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
    
        const {body: courseModule} = await request(app)
        .post('/api/course-modules')
        .set('Cookie', global.signup())
        .send({
            title:"Test Course Module",
            description: "It's about testing things",
            courseId: course.id,
            lessons: []
        }).expect(201);

    await request(app)
        .post('/api/lessons')
        .set('Cookie', global.signup())
        .send({
            title: "Test title",
            videoUrl: "https://randomURl.com",
            moduleId: courseModule.id
        }).expect(201);

    lessons = await Lesson.find({});
    expect(lessons.length).toEqual(1);
    expect(lessons[0].title).toEqual("Test title");
    expect(lessons[0].videoUrl).toEqual("https://randomURl.com");
    expect(lessons[0].moduleId).toEqual(courseModule.id);
})