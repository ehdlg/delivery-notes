import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import 'dotenv/config';

const adapter = new PrismaLibSQL({
  url: process.env.TURSO_DATABASE_URL ?? 'file:notas.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default new PrismaClient({ adapter });
