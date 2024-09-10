/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreationOptional,
  InferCreationAttributes,
  InferAttributes,
  Model,
  CreationAttributes,
} from 'sequelize';
import { WHERE_CONDITION } from './constants';

export type ValidatedDataType = {
  limit?: number;
  offset?: number;
  condition?: NoteFilterType;
  search?: string;
  username?: string;
  password?: string;
} & Partial<CreationAttributes<IReparirNote>>;

type UserAuth = {
  id: number;
  username: string;
};

declare global {
  namespace Express {
    interface Request {
      validatedData?: ValidatedDataType;
      auth?: UserAuth;
    }
  }
}

export interface IReparirNote
  extends Model<InferAttributes<IReparirNote>, InferCreationAttributes<IReparirNote>> {
  id: CreationOptional<number>;
  client: string;
  phoneNumber: string;
  model: string;
  malfunction: string;
  entryDate: CreationOptional<Date>;
  departureDate: CreationOptional<Date> | null;
  isRepaired: CreationOptional<boolean> | null;
  details: CreationOptional<string> | null;
  garanty: CreationOptional<boolean>;
  budget: CreationOptional<number> | null;
}

export interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: CreationOptional<number>;
  username: string;
  password: string;
}

export type NoteFilterType = keyof typeof WHERE_CONDITION;
