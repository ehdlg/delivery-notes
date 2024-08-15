import { RegisterOptions } from 'react-hook-form';
import { ALL_CONDITIONS } from './constants';

export type RepairNoteType = {
  id: number;
  client: string;
  phoneNumber: string;
  model: string;
  malfunction: string;
  entryDate: Date | string;
  departureDate: Date | null | string;
  isRepaired: boolean | null;
  details: string | null;
  garanty: boolean | null;
  budget: number | null;
};

export type MachineType = {
  malfunction: string;
  model: string;
};

export type FormType = Omit<RepairNoteType, 'model' | 'malfunction'> & {
  machines: MachineType[];
};

export type FormKeys = keyof FormType;

type InputType = 'text' | 'number' | 'checkbox' | 'date' | 'textarea' | 'tel';

export type FormInput = {
  label: string;
  name: FormKeys;
  type: InputType;
  options?: RegisterOptions<FormType, FormKeys>;
};

export type FilterType = (typeof ALL_CONDITIONS)[number];

export type SearchParamKey = 'filter' | 'search';
