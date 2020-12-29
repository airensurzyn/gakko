import express from 'express';
import 'express-async-errors';
import { json} from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@llp-common/backend-common';
import { createCourseRouter } from './routes/courses/new';
import { showCourseRouter } from './routes/courses/show';
import { deleteCourseRouter } from './routes/courses/delete';
import { indexCourseRouter } from './routes/courses/index';
import { updateCourseRouter } from './routes/courses/update';
import { createCourseModuleRouter } from './routes/course-modules/new';
import { showCourseModuleRouter } from './routes/course-modules/show';
import { createLessonRouter } from './routes/lessons/new';
import { showLessonRouter } from './routes/lessons/show';
import { showInstructorCourseRouter } from './routes/courses/show-instructor';


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
app.use(showInstructorCourseRouter);

app.use(createCourseModuleRouter);
app.use(showCourseModuleRouter);

app.use(createLessonRouter);
app.use(showLessonRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };