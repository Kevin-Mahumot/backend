import express from 'express';
import { loginUser,ChangeUserPassword, verifyCode,  newPassword } from '../controller/loginController.mjs';
import {validateNewUserPassword } from '../middleware/validateUser.mjs';

const router = express.Router();

router.post('/login',  loginUser);
router.post('/password',  ChangeUserPassword);
router.post('/code',  verifyCode);
router.put('/newPassword/:id',validateNewUserPassword,  newPassword);


export { router };
