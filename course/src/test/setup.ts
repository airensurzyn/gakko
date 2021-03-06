import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signup(): string[];
        }
    }
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {

    process.env.JWT_KEY = 'asdfsadfa';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// After each test delete all collections
beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signup = () => {
   const payload = {
       id: new mongoose.Types.ObjectId().toHexString(),
       email: 'test@test.com',
       userType: 'student'
   }
   const token = jwt.sign(payload, process.env.JWT_KEY!);
   const session = { jwt: token };
   const sessionJSON = JSON.stringify(session);

   const base64 = Buffer.from(sessionJSON).toString('base64');

   return [`express:sess=${base64}`];
}