import { Router } from 'express';
import loginRoute from './loginRoute';
import notesRoute from './notesRoute';

const router = Router();

router.use('/login', loginRoute);

router.use('/', notesRoute);

export default router;
