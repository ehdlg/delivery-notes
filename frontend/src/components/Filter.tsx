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
    <label className='flex cursor-pointer flex-col-reverse gap-2'>
      <input
        className='hidden'
        type='radio'
        name='filter'
        value={value}
        onChange={update}
        checked={checked}
      />
      <span
        className={`text-gray-700 underline-offset-8 hover:underline ${
          checked && 'font-bold text-gray-800 hover:no-underline'
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default Filter;
