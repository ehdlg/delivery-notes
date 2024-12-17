import { FormEvent, useRef } from 'react';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';
import useGetParams from '../hooks/useGetParams';

function Search() {
  const { updateSearchParam } = useGetParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    if (!inputRef.current) return;

    e.preventDefault();

    const inputValue = inputRef.current?.value;

    updateSearchParam('search', inputValue);

    inputRef.current.value = '';
  };

  return (
    <form
      onSubmit={onSubmit}
      className='flex rounded border bg-slate-50 focus-within:border-slate-200'
    >
      <input
        type='text'
        ref={inputRef}
        className='[&::-webkit-inner-spin-button]:appearance-nonebg-inherit w-full rounded bg-inherit text-center text-2xl text-slate-700 shadow-inner outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none'
      />

      <button type='submit'>
        <SearchIcon className='size-6 text-slate-700' />
      </button>
    </form>
  );
}

export default Search;
