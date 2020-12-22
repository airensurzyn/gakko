import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { Lesson } from '../../../models/lesson';

it('gets the specified lesson from the LessonId', async() => {
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

    const {body: lesson } = await request(app)
        .post('/api/lessons')
        .set('Cookie', global.signup())
        .send({
            title: "Test title",
            videoUrl: "https://randomURl.com",
            moduleId: courseModule.id
        }).expect(201);

    const {body: retrievedLesson} = await request(app)
        .get('/api/lessons/' + lesson.id)
        .set('Cookie', global.signup())
        .send({}).
        expect(200);

    expect(retrievedLesson.id).toEqual(lesson.id)
});

it('returns a 404 for incorrect lesson id', async() => {
    const fakeId = mongoose.Types.ObjectId();

    await request(app)
        .get('/api/lessons/' + fakeId)
        .set('Cookie', global.signup())
        .send()
        .expect(404);
})