import express from 'express';

const router = express.Router();

router.get('/api/users/current', (req, res) => {
    res.status(200).send('Current route is up')
});

export { router as currentUserRouter };