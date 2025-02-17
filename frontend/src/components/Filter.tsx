import { FilterType } from '../types';
function Filter({
  value,
  label,
  update,
  checked
}: {
  value: FilterType;
  label: string;
  update: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) {
  return (
    <label className='flex cursor-pointer flex-col-reverse'>
      <input
        className='hidden'
        type='radio'
        name='filter'
        value={value}
        onChange={update}
        checked={checked}
      />
      <span
        className={`text-xl text-slate-500 transition ease-in hover:scale-105 hover:text-slate-800 ${
          checked && 'font-bold text-slate-900 hover:scale-100'
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default Filter;
