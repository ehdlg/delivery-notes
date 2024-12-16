import express from 'express';
import cors from 'cors';
import apiRoute from './routes/apiRoute';
import { errorHandler, notFound } from './middlewares';
import 'dotenv/config';

const app = express();
const { PORT } = process.env;

async function main() {
  try {
    console.log(`Listening on: http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

app.use(express.json());
app.use(cors());

app.use('/api', apiRoute);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, main);
