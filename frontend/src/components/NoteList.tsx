import { useState } from 'react';
import Filter from './Filter';
import Loading from './Loading';
import Pagination from './Pagination';
import useNotes from '../hooks/useNotes';
import { Navigate } from 'react-router-dom';
import { FILTER_INPUTS, NOTE_LIMIT } from '../constants';
import { RepairNoteType } from '../types';
import { calculatePagination, isFilterType } from '../utils';
import useGetParams from '../hooks/useGetParams';
import useToken from '../hooks/useToken';
import NoteTable from './NoteTable';

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
      {!emptyNotes ? (
        <NoteTable notes={notes} />
      ) : (
        <div className='m-4 grid grid-cols-1 justify-center gap-4 md:grid md:grid-cols-3 xl:m-2 2xl:grid-cols-5'>
          <h2 className='col-span-5 text-center text-xl font-semibold text-slate-800'>
            No hay ninguna nota que mostrar.
          </h2>
        </div>
      )}
      {!emptyNotes && (
        <Pagination page={page} pageCount={pageCount} update={updatePage} />
      )}
    </>
  );
}
export default NoteList;
