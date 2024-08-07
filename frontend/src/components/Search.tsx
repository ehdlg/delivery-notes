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
      return toast.error('El ID de la nota no es válido, debe ser un número mayor a 0');
    }

    inputRef.current.value = '';

    navigate(`/${inputValue}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className='bg-gray-50 rounded focus-within:border-gray-300 focus-within:border-b-2 border flex'
    >
      <input
        type='number'
        ref={inputRef}
        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-nonebg-inherit rounded  outline-none bg-inherit text-center w-full text-2xl text-gray-700'
      />

      <button type='submit'>
        <SearchIcon className='text-gray-700 size-6' />
      </button>
    </form>
  );
}

export default Search;
