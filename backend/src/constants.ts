import { Op } from 'sequelize';
import { NoteFilterType } from './types';

export const DEFAULT_GET_VALUES: {
  LIMIT: number;
  OFFSET: number;
  CONDITION: NoteFilterType;
  SEARCH: string;
} = {
  LIMIT: 20,
  OFFSET: 0,
  CONDITION: 'all',
  SEARCH: '',
} as const;

const LIMIT_DATE = new Date().setMonth(new Date().getMonth() - 3);

export const PENDING_FILTER = {
  entryDate: {
    [Op.lte]: LIMIT_DATE,
  },
  departureDate: {
    [Op.is]: null,
  },
};

export const WHERE_CONDITION = {
  all: {},
  repaired: { isRepaired: true },
  'not-repaired': { isRepaired: false },
  pending: {
    entryDate: { [Op.lte]: LIMIT_DATE },
    departureDate: {
      [Op.is]: null,
    },
  },
  unbudgeted: {
    budget: {
      [Op.is]: null,
    },
    garanty: false,
  },
} as const;

export const DEFAULT_WHERE_CONDITION = WHERE_CONDITION[DEFAULT_CONDITION];
