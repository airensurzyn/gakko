import express from 'express';
import 'express-async-errors';
import { json} from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@llp-common/backend-common';
import { createCourseRouter } from './routes/new';
import { showCourseRouter } from './routes/show';
import { deleteCourseRouter } from './routes/delete';
import { indexCourseRouter } from './routes/index';
import { updateCourseRouter } from './routes/update';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUser);

app.use(showCourseRouter);
app.use(deleteCourseRouter);
app.use(indexCourseRouter);
app.use(updateCourseRouter);
app.use(createCourseRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };