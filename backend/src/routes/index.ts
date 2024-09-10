import { Router } from 'express';
import RepairNoteController from '../controllers/RepairNoteController';
import {
  validation,
  createRules,
  getAllRules,
  idParamRule,
  updateRules,
} from '../middlewares/validation';

const router = Router();

router.get('/', getAllRules, validation, RepairNoteController.getAll);

router.post('/', createRules, validation, RepairNoteController.create);

router.get('/:id', idParamRule, validation, RepairNoteController.getOne);

router.delete('/:id', idParamRule, validation, RepairNoteController.delete);

router.patch('/:id', idParamRule, updateRules, validation, RepairNoteController.update);

export default router;
