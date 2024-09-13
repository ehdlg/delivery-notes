import {
  ALL_CONDITIONS,
  DB_SEPARATOR,
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  REQUIRED_VALUES
} from '../constants';
import {
  FormKeys,
  RepairNoteType,
  FilterType,
  FormType,
  MachineType
} from '../types';

export function calculatePagination(page: number, size: number) {
  page = page > 0 ? page : DEFAULT_PAGE;
  size = size > 0 ? size : DEFAULT_SIZE;

  const limit = size;
  const offset = (page - 1) * limit;

  return { limit, offset };
}

export function formatDateToInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function filterNote(note: RepairNoteType) {
  let values: Partial<RepairNoteType> = {};

  for (const [key, value] of Object.entries(note)) {
    const typedKey = key as FormKeys;

    if (!REQUIRED_VALUES.includes(typedKey) && value === '') {
      values = { ...values, [key]: null };
    } else {
      values = { ...values, [key]: value };
    }
  }

  return values;
}

export function isFilterType(value: string): value is FilterType {
  return (ALL_CONDITIONS as readonly string[]).includes(value);
}

export function createNoteFromForm(formData: FormType) {
  const { machines, ...rest } = formData;

  let model = machines[0].model;
  let malfunction = machines[0].malfunction;

  for (let i = 1; i < machines.length; i++) {
    model += `|${machines[i].model}`;
    malfunction += `|${machines[i].malfunction}`;
  }

  const note: RepairNoteType = { ...rest, model, malfunction };

  return note;
}

export function createFormDataFromNote(note: RepairNoteType): FormType {
  const { model, malfunction, ...rest } = note;
  const machines: MachineType[] = [];

  const modelArray = model.split('|');
  const malfunctionArray = malfunction.split('|');

  const limit = Math.min(modelArray?.length, malfunctionArray?.length);

  if (limit === 0) return { ...rest, machines };

  for (let i = 0; i < limit; i++) {
    machines.push({
      malfunction: malfunctionArray[i],
      model: modelArray[i]
    });
  }

  const formData: FormType = { ...rest, machines };

  return formData;
}

export function getArrayFromDb(data: string): string[] {
  return data.split(DB_SEPARATOR);
}
