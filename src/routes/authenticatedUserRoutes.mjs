import express from 'express';
const router = express.Router();
import {getAuthenticatedUser} from '../controller/authenticatedUserController.mjs';

import {authenticateToken} from '../middleware/authenticateToken.mjs';

router.get('/user/:id',authenticateToken,getAuthenticatedUser);

export {router};