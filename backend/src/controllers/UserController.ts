import User from '../models/User';
import bcrypt from 'bcrypt';
import { HTTPError } from '../errors';
import type { Request, NextFunction, Response } from 'express';

export default class UserController {
  static async checkUserCredentials(req: Request, res: Response, next: NextFunction) {
    const username = req.validatedData?.username;
    const password = req.validatedData?.password;

    try {
      if (null == username || null == password)
        throw new HTTPError({ status: 400, message: 'Petición invalida' });

      const user = await User.getByUsername(username);

      if (null == user) throw new HTTPError({ status: 401, message: 'Credenciales incorrectas' });

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword)
        throw new HTTPError({ status: 401, message: 'Credenciales incorrectas' });

      req.auth = {
        id: user.id,
        username: user.username,
      };

      return next();
    } catch (error) {
      next(error);
    }
  }
}
