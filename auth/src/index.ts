import express from 'express';
import { json } from 'body-parser';


import { currentUserRouter } from './routes/current';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@llp-common/backend-common';

const app = express();


app.set('trust proxy', true);
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    res.send('Good');
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening on port 3000')
});