import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError, UserTypes } from '@llp-common/backend-common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [ 
    body('email').isEmail().withMessage('Email must be valid'), 
    body('password').trim().isLength({min:4, max: 20}).
        withMessage('Password must be between 4 and 20 characters'),
    body('userType').notEmpty().withMessage('User Type must be valid') ],
    validateRequest,
    async (req: Request, res: Response) => {

    const { email, password, userType } = req.body;

    if(!Object.values(UserTypes).includes(userType)) {
        throw new BadRequestError('User Type of proper type UserType enum');
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new BadRequestError('Email in use');
    }
    
    const user = User.build({
        email,
        password,
        userType
    });
    await user.save();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    }

    res.status(201).send(user);
});

export { router as signupRouter };