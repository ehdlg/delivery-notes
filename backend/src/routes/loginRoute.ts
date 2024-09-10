import { Router } from 'express';
import { userLoginRules, validation } from '../middlewares/validation';
import UserController from '../controllers/UserController';
import { createToken } from '../middlewares';

const router = Router();

router.post('/', userLoginRules, validation, UserController.checkUserCredentials, createToken);

export default router;
