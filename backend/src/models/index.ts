import { CreationAttributes } from 'sequelize';
import RepairNoteModel from '../db';
import { IReparirNote } from '../types';
import { PENDING_FILTER } from '../constants';

export default class RepairNote {
  static async getAll({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<{ rows: IReparirNote[]; count: number }> {
    const results = await RepairNoteModel.findAndCountAll({
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    return results;
  }

  static async getOne(id: number): Promise<IReparirNote | null> {
    const note = await RepairNoteModel.findByPk(id);

    return note;
  }

  static async getPending(): Promise<{ rows: IReparirNote[]; count: number }> {
    const results = await RepairNoteModel.findAndCountAll({
      where: PENDING_FILTER,
    });

    return results;
  }

  static async create(newNote: CreationAttributes<IReparirNote>): Promise<IReparirNote> {
    const note = await RepairNoteModel.create(newNote);

    return note;
  }

  static async delete(id: number) {
    const deletedNote = await RepairNoteModel.destroy({
      where: {
        id,
      },
    });

    return deletedNote;
  }

  static async update(
    id: number,
    updatedFields: Omit<Partial<CreationAttributes<IReparirNote>>, 'id'>
  ): Promise<[affectedCount: number]> {
    const updatedNote = RepairNoteModel.update(updatedFields, {
      where: {
        id,
      },
    });

    return updatedNote;
  }

  static async getStadistics() {
    const notesCount = await RepairNoteModel.count();
    const pendingNotesCount = await RepairNoteModel.count({
      where: PENDING_FILTER,
    });

    return { notesCount, pendingNotesCount };
  }
}
