import { Router } from 'express';
import loginRoute from './loginRoute';
import notesRoute from './notesRoute';
import { verifyToken } from '../middlewares';

const router = Router();

router.use('/login', loginRoute);

router.use('/', verifyToken, notesRoute);

export default router;
