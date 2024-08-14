import { useState } from 'react';
import Note from './Note';
import Filter from './Filter';
import Loading from './Loading';
import Pagination from './Pagination';
import useNotes from '../hooks/useNotes';
import { FILTER_INPUTS, NOTE_LIMIT } from '../constants';
import { FilterType, RepairNoteType } from '../types';
import { calculatePagination, isFilterType } from '../utils';

function NoteList() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterType>('all');

  const updatePage = {
    next: () => setPage((prevPage) => prevPage + 1),
    prior: () => setPage((prevPage) => prevPage - 1)
  };
  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.target.value;

    if (!isFilterType(newFilter)) return;

    setFilter(newFilter);
    setPage(1);
  };

  const { limit, offset } = calculatePagination(page, NOTE_LIMIT);
  const { data, error, isLoading } = useNotes<{
    count: number;
    rows: RepairNoteType[];
  }>(`/?limit=${limit}&offset=${offset}&condition=${filter}`);

  if (isLoading) return <Loading />;

  if (error || undefined == data) return null;

  const notes = data.rows;
  const emptyNotes = notes.length === 0;
  const pageCount = Math.ceil(data.count / NOTE_LIMIT);

  return (
    <>
      <div className='mb-8 flex w-full flex-col items-center gap-4'>
        <h2 className='text-3xl font-semibold text-gray-700'>
          Notas de reparación
        </h2>
        <div className='flex w-fit flex-col items-center gap-6 self-center rounded border border-gray-200 bg-white p-4 text-xl md:flex-row md:gap-12'>
          {FILTER_INPUTS.map((input) => {
            return (
              <Filter
                label={input.label}
                value={input.value}
                update={updateFilter}
                checked={input.value === filter}
                key={input.label}
              />
            );
          })}
        </div>
      </div>
      <div className='m-4 grid grid-cols-1 justify-center gap-4 md:grid md:grid-cols-3 xl:m-2 2xl:grid-cols-5'>
        {!emptyNotes ? (
          notes.map((note) => {
            return <Note note={note} key={note.id} />;
          })
        ) : (
          <h2 className='col-span-5 text-center text-xl font-semibold text-slate-800'>
            No hay ninguna nota que mostrar.
          </h2>
        )}
      </div>
      {!emptyNotes && (
        <Pagination page={page} pageCount={pageCount} update={updatePage} />
      )}
    </>
  );
}
export default NoteList;
