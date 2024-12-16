import { Request, Response, NextFunction } from 'express';
import { validationResult, matchedData, query, param, body } from 'express-validator';

export function validation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const validatedData = matchedData(req, { includeOptionals: true });
    req.validatedData = validatedData;

    return next();
  }

  const errorsMessages = errors.array().map((error) => {
    return error.msg;
  });

  return res.status(422).json({ errors: errorsMessages });
}

export const getAllRules = (() => {
  return [
    query('limit')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El límite debe ser un número mayor a 0')
      .toInt(),

    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('El offset debe ser un número mayor o igual a 0')
      .toInt(),

    query('condition').optional({ values: 'undefined' }).default('all'),

    query('search').optional({ values: 'undefined' }).default(''),
  ];
})();

export const idParamRule = (() => {
  return [param('id').exists().isInt().withMessage('El ID proporcionado no es válido').toInt()];
})();

export const createRules = (() => {
  return [
    body('client')
      .exists()
      .withMessage('El nombre del cliente es obligatorio')
      .notEmpty()
      .withMessage('El nombre del cliente no puede estar vacío'),

    body('phoneNumber')
      .notEmpty()
      .withMessage('El número de teléfono no puede estar vacío')
      .bail()
      .matches(/^\d{9}$/)
      .withMessage('El número de teléfono debe tener exactamente 9 dígitos'),

    body('model')
      .exists()
      .withMessage('El nombre o modelo de la máquina es obligatorio')
      .notEmpty()
      .withMessage('El modelo o máquina no puede estar vacío'),

    body('malfunction')
      .exists()
      .withMessage('La descripción de la avería de la máquina es obligatoria')
      .notEmpty()
      .withMessage('La avería no puede estar vacía'),

    body('entryDate')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('La fecha de entrada debe ser una fecha válida'),

    body('departureDate')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('La fecha de salida debe ser una fecha válida'),

    body('garanty')
      .exists()
      .isBoolean()
      .withMessage('El valor de la garantía debe ser un booleano (true o false)'),

    body('isRepaired')
      .optional()
      .isBoolean()
      .withMessage(
        'El valor sobre si la máquina está reparada debe ser un booleano (true o false)'
      ),

    body('details')
      .optional({ values: 'null' })
      .notEmpty()
      .withMessage('Los detalles no pueden estar vacíos'),

    body('budget')
      .optional({ values: 'null' })
      .default(null)
      .isFloat({ min: 1 })
      .withMessage('El presupuesto debe ser un número mayor a 0'),
  ];
})();

export const updateRules = (() => {
  return [
    body('client')
      .optional()
      .isString()
      .withMessage('El nombre del cliente debe ser un texto válido'),

    body('phoneNumber')
      .optional()
      .matches(/^\d{9}$/)
      .withMessage('El número de teléfono debe tener exactamente 9 dígitos'),

    body('model')
      .optional()
      .isString()
      .withMessage('El nombre o modelo de la máquina debe ser un texto válido'),

    body('malfunction')
      .optional()
      .isString()
      .withMessage('La descripción de la avería de la máquina debe ser un texto válido'),

    body('entryDate')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('La fecha de entrada debe ser una fecha válida'),

    body('departureDate')
      .optional({ values: 'null' })
      .isISO8601()
      .toDate()
      .withMessage('La fecha de salida debe ser una fecha válida'),

    body('garanty')
      .optional()
      .isBoolean()
      .withMessage('El valor de la garantía debe ser un booleano (true o false)'),

    body('isRepaired')
      .optional()
      .isBoolean()
      .withMessage(
        'El valor sobre si la máquina está reparada debe ser un booleano (true o false)'
      ),
    body('details')
      .optional({ values: 'null' })
      .notEmpty()
      .withMessage('Los detalles no pueden estar vacíos'),

    body('budget')
      .optional({ values: 'null' })
      .isFloat({ min: 1 })
      .withMessage('El presupuesto debe ser un número mayor a 0')
      .toFloat(),
  ];
})();

export const userLoginRules = (() => {
  return [
    body('username')
      .exists()
      .withMessage('Se debe enviar el nombre de usuario')
      .bail()
      .notEmpty()
      .withMessage('El nombre de usuario no puede estar vacío'),

    body('password')
      .exists()
      .withMessage('Se debe enviar la contraseña')
      .bail()
      .notEmpty()
      .withMessage('La contraseña no puede estar vacía'),
  ];
})();
