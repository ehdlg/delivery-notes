import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormInput } from '../types';
function Input({
  label,
  name,
  type,
  register,
  disabled = false
}: FormInput & {
  register?: UseFormRegisterReturn;
  disabled?: boolean;
}) {
  const id = useId();

  if (type == 'textarea') {
    return (
      <label
        htmlFor={id}
        className='col-span w-full text-base font-semibold text-gray-500'
      >
        {label}
        <textarea
          name={name}
          id={id}
          className='block h-56 w-full rounded-md border border-gray-200 bg-gray-50 p-1 font-normal text-gray-700 outline-none focus:border-2 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50'
          disabled={disabled}
          {...register}
        />
      </label>
    );
  }

  return (
    <label htmlFor={id} className='text-base font-semibold text-gray-500'>
      {label}
      <input
        type={type}
        name={name}
        id={id}
        className='block w-full rounded-md border border-gray-200 bg-gray-50 p-1 font-normal text-gray-700 outline-none focus:border-2 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 xl:w-3/4'
        disabled={disabled}
        {...register}
        step={type === 'number' ? '0.01' : undefined}
      />
    </label>
  );
}

export default Input;
