import { useState } from 'react';
import useNotes from '../hooks/useNotes';
import useGetParams from '../hooks/useGetParams';
import useToken from '../hooks/useToken';
import { Navigate } from 'react-router-dom';
import NoteTable from './NoteTable';
import EmptyFolderIcon from '../icons/EmptyFolder';
import Filter from './Filter';
import Loading from './Loading';
import Pagination from './Pagination';
import { FILTER_INPUTS, NOTE_LIMIT } from '../constants';
import { calculatePagination, isFilterType } from '../utils';
import { RepairNoteType } from '../types';
import { Link } from 'react-router-dom';

const EmptyState = () => {
  return (
    <div className='mx-auto flex w-1/2 flex-col items-center justify-center gap-y-6'>
      <EmptyFolderIcon width='20%' />
      <h2 className='text-center text-2xl font-semibold text-slate-700'>
        No se ha encontrado ninguna nota
      </h2>
      <p className='text-slate-600'>
        Cambia los filtros actuales o{' '}
        <Link to={'nueva'} className='font-bold text-slate-500 underline'>
          crea una nueva nota
        </Link>
      </p>
    </div>
  );
};

NoteList.EmptyState = EmptyState;

function NoteList() {
  const { logout } = useToken();
  const [page, setPage] = useState(1);
  const { filter, search, updateSearchParam } = useGetParams();

  const updatePage = {
    next: () => setPage((prevPage) => prevPage + 1),
    prior: () => setPage((prevPage) => prevPage - 1)
  };
  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.target.value;

    if (!isFilterType(newFilter)) return;

    updateSearchParam('filter', newFilter);

    setPage(1);
  };

  const { limit, offset } = calculatePagination(page, NOTE_LIMIT);
  const { data, error, isLoading } = useNotes<{
    count: number;
    rows: RepairNoteType[];
  }>(`/?limit=${limit}&offset=${offset}&condition=${filter}&search=${search}`);

  if (isLoading) return <Loading />;

  if (
    error &&
    (error.status == 401 || error.status === 403 || error.status === 500)
  ) {
    console.error(error.message);
    logout();

    return <Navigate to={'/login'} />;
  }

  if (error || undefined == data) return null;

  const notes = data.rows;
  const emptyNotes = notes.length === 0;
  const pageCount = Math.ceil(data.count / NOTE_LIMIT);

  return (
    <>
      <div className='mb-8 flex w-full flex-col items-center gap-4'>
        <div className='m-2 flex flex-col gap-4 text-center text-lg md:flex-row md:self-start'>
          {FILTER_INPUTS.map((input) => {
            return (
              <Filter
                label={input.label}
                value={input.value}
                update={updateFilter}
                checked={
                  input.value === filter ||
                  (input.value == 'all' && filter === '')
                }
                key={input.label}
              />
            );
          })}
        </div>
      </div>
      {!emptyNotes ? <NoteTable notes={notes} /> : <NoteList.EmptyState />}
      {!emptyNotes && (
        <Pagination page={page} pageCount={pageCount} update={updatePage} />
      )}
    </>
  );
}
export default NoteList;
