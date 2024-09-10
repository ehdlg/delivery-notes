import jwt from 'jsonwebtoken';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HTTPError } from '../errors';
import { UserAuth } from '../types';

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

export const verifyToken: RequestHandler = (req, rex, next) => {
  const { SECRET } = process.env;

  try {
    if (null == SECRET) throw new HTTPError({ status: 500, message: 'Error interno del servidor' });
    if (null == req.headers['authorization'])
      throw new HTTPError({ message: 'Acceso no autorizado', status: 401 });

    const [bearer, token] = req.headers['authorization'].split(' ');

    if (bearer !== 'Bearer' || null == token)
      throw new HTTPError({ message: 'Acceso no autorizado', status: 401 });

    const verifiedToken = jwt.verify(token, SECRET) as UserAuth;

    req.verifiedToken = verifiedToken;

    next();
  } catch (error) {
    next(error);
  }
};
