import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
    const { email, password } = req.body;
    res.status(200).send('Signup route is up')
});

export { router as signupRouter };