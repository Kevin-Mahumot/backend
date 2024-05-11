import {body, validationResult }from 'express-validator';

const validateUser=[
    body('fullname').notEmpty().withMessage('Fullname is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {//kung naay sulod e run niya code nga naay error
            return res.json({ success: false, message: 'Validation failed', errors: errors.array() });
        }
        next(); 
    }
];

const validateUpdateUser=[
    body('fullname').notEmpty().withMessage('Fullname is required')
    .matches(/^[a-zA-Z\s]*$/, 'g').withMessage('Fullname cannot contain symbols or numbers'),

    body('profile').custom((value, { req }) => {
        if (!req.file || !req.file.mimetype.startsWith('image/')) {
            throw new Error('Invalid file type. Only images are allowed');
        }
        return true;
    }),

    body('profile').custom((value, { req }) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file && req.file.size > maxSize) {
            throw new Error('File size too large. Maximum size is 5MB');
        }
        return true;
    }),
 
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {//kung naay sulod e run niya code nga naay error
            return res.json({ success: false, message: 'Validation failed', errors: errors.array() });
        }
        next(); 
    }
];

const validateNewUserPassword=[
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, message: 'Validation failed', errors: errors.array() });
        }
        next(); 
    }
];

export {validateUser,validateUpdateUser,validateNewUserPassword};