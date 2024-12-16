import prisma from '../db/';
import { NoteFilterType } from '../types';
import { WHERE_CONDITION } from '../constants';
import { Note, Prisma } from '@prisma/client';

export default class RepairNote {
  static async getAll({
    limit,
    offset,
    search = '',
    condition = 'all',
  }: {
    limit: number;
    offset: number;
    search?: string;
    condition?: NoteFilterType;
  }): Promise<{ rows: Note[]; count: number }> {
    const searchConditions = {
      OR: [
        { client: { contains: search } },
        { id: { equals: isNaN(+search) ? -1 : +search } },
        { phoneNumber: { startsWith: search } },
      ],
    };

    const [notes, count] = await Promise.all([
      prisma.note.findMany({
        take: limit,
        skip: offset,
        where: {
          ...WHERE_CONDITION[condition],
          ...searchConditions,
        },
        orderBy: { id: 'desc' },
      }),
      prisma.note.count({
        where: {
          ...WHERE_CONDITION[condition],
          ...searchConditions,
        },
      }),
    ]);

    return { count, rows: notes };
  }

  static async getOne(id: number) {
    const note = await prisma.note.findFirst({
      where: {
        id,
      },
    });

    return note || null;
  }

  static async create(newNote: Prisma.NoteCreateInput) {
    const note = await prisma.note.create({
      data: newNote,
    });

    return note;
  }

  static async delete(id: number) {
    const deletedNote = await prisma.note.delete({ where: { id } });

    return null != deletedNote ? 1 : 0;
  }

  static async update(id: number, updatedFields: Prisma.NoteUpdateInput): Promise<Note> {
    const updatedNote = prisma.note.update({
      data: updatedFields,
      where: {
        id,
      },
    });

    return updatedNote || null;
  }
}
