import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '@llp-common/backend-common';
import { body } from 'express-validator';

export const validateCourseCreateRequest = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult([ body('title').not().isEmpty().withMessage('Title is required')]);
    
    /*const errors = [];
    const { title, description, languageTopic, instructionLanguage} = req.body;

    if(!title) {
        errors.push({ message: "Course must have a title" });
    }*/

    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    };

    next();
}
