import RepairNote from '../models/RepairNote';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors';
import { CreationAttributes } from 'sequelize';
import { IReparirNote, ValidatedDataType } from '../types';
import { DEFAULT_GET_VALUES } from '../constants';

export default class RepairNoteController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.validatedData?.limit || DEFAULT_GET_VALUES.LIMIT;
      const offset = req.validatedData?.offset || DEFAULT_GET_VALUES.OFFSET;
      const condition = req.validatedData?.condition || DEFAULT_GET_VALUES.CONDITION;
      const search = req.validatedData?.search || DEFAULT_GET_VALUES.SEARCH;

      const notes = await RepairNote.getAll({ limit, offset, search, condition });

      return res.json(notes);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.validatedData?.id;

      if (null == id) {
        throw new HTTPError({ status: 400, message: 'Invalid ID' });
      }

      const note = await RepairNote.getOne(id);

      if (null == note) {
        throw new HTTPError({ status: 404, message: `Nota de entrega ${id} no encontrada` });
      }

      return res.json(note);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newNote = req.validatedData as CreationAttributes<IReparirNote>;
      const createdNote = await RepairNote.create(newNote);

      return res.status(201).json(createdNote);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...updateFields } = req.validatedData as ValidatedDataType;

      const noteExists = null != (await RepairNote.getOne(id as number));

      if (!noteExists) throw new HTTPError({ status: 404, message: `Nota ${id} no encontrada` });

      const updatedNote = await RepairNote.update(
        id as number,
        updateFields as CreationAttributes<IReparirNote>
      );

      return res.json(updatedNote);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.validatedData?.id;

      if (null == id) {
        throw new HTTPError({ status: 400, message: 'Invalid ID' });
      }

      const deletedNote = await RepairNote.delete(id);

      if (deletedNote < 1) {
        throw new HTTPError({ message: `Nota de entrega ${id} no encontrada`, status: 404 });
      }

      return res.json({ info: 'Nota de entrega borrada' });
    } catch (error) {
      next(error);
    }
  }
}
