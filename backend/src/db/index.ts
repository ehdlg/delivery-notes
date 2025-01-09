import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import 'dotenv/config';

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL ?? 'file:notas.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);

export default new PrismaClient({ adapter });
