import { Router } from 'express';
import notesRoute from './notesRoute';

const router = Router();

router.use('/', notesRoute);

export default router;
