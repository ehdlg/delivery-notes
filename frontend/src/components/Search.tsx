import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

function Search() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    if (!inputRef.current) return;

    e.preventDefault();

    const inputValue = inputRef.current?.value;

    if (null == inputValue || Number(inputValue) <= 0) {
      return toast.error(
        'El ID de la nota no es válido, debe ser un número mayor a 0'
      );
    }

    inputRef.current.value = '';

    navigate(`/${inputValue}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className='flex rounded border bg-gray-50 focus-within:border-b-2 focus-within:border-gray-300'
    >
      <input
        type='number'
        ref={inputRef}
        className='[&::-webkit-inner-spin-button]:appearance-nonebg-inherit w-full rounded bg-inherit text-center text-2xl text-gray-700 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none'
      />

      <button type='submit'>
        <SearchIcon className='size-6 text-gray-700' />
      </button>
    </form>
  );
}

export default Search;
