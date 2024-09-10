import express from 'express';
import cors from 'cors';
import { initDb } from './db';
import notesRoute from './routes/notesRoute';
import { errorHandler, notFound } from './middlewares';
import 'dotenv/config';

const app = express();
const { PORT } = process.env;

async function main() {
  try {
    await initDb();

    console.log(`Listening on: http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

app.use(express.json());
app.use(cors());

app.use('/api', notesRoute);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, main);
