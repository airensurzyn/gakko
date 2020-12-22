import request from 'supertest';
import { app } from '../../app';
import { UserTypes } from '@llp-common/backend-common';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            userType: UserTypes.Student
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test.com',
            password: 'password',
            userType: UserTypes.Student
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'pd',
            userType: UserTypes.Student
        })
        .expect(400);
});

it('returns a 400 when no user type is given', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'pd'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            userType: UserTypes.Student
        })
        .expect(400);

    return request(app)
        .post('/api/users/signup')
        .send({
            password: 'password',
            userType: UserTypes.Student
        })
        .expect(400);
});

it('disallows duplicate emails', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password: 'password',
            userType: UserTypes.Student
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password: 'password',
            userType: UserTypes.Student
        })
        .expect(400);
});

it('sets a cookie after successful signup', async() => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            userType: UserTypes.Student
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});