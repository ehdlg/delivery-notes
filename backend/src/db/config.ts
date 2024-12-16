import { PrismaClient } from '@prisma/client';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './notas.db',
});

export const prisma = new PrismaClient();
