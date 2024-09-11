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

type InputType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'date'
  | 'textarea'
  | 'tel'
  | 'password';

export type FormInput = {
  label: string;
  name: FormKeys | LoginKeys;
  type: InputType;
  options?:
    | RegisterOptions<FormType, FormKeys>
    | RegisterOptions<UserInput, LoginKeys>;
};

export type FilterType = (typeof ALL_CONDITIONS)[number];

export type SearchParamKey = 'filter' | 'search';

export type UserInput = {
  username: string;
  password: string;
};

export type LoginKeys = keyof UserInput;

export type DecodedToken = {
  user: string;
  id: number;
  iss: string;
};
