import jwt from 'jsonwebtoken';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HTTPError } from '../errors';

export function notFound() {
  throw new HTTPError({ message: 'Not found', status: 404 });
}

export function errorHandler(
  error: HTTPError | Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  let status = 500;
  const message = error.message || 'Algo salió mal';

  if (error instanceof HTTPError) {
    status = error.status;
  }

  res.status(status).json({ error: message });
}

export const createToken: RequestHandler = async (req, res) => {
  const { SECRET } = process.env;
  const { auth } = req;

  if (!SECRET) {
    throw new HTTPError({
      status: 500,
      message: 'Error interno del servidor: falta configuración de SECRET',
    });
  }

  if (!auth) {
    throw new HTTPError({
      status: 400,
      message: 'Falta información de autenticación en la solicitud',
    });
  }

  const token = jwt.sign(auth, SECRET);

  return res.json({ token });
};
