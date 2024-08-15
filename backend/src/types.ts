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
} & Partial<CreationAttributes<IReparirNote>>;

declare global {
  namespace Express {
    interface Request {
      validatedData?: ValidatedDataType;
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

export type NoteFilterType = keyof typeof WHERE_CONDITION;
