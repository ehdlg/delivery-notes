import { UserIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { RepairNoteType } from '../types';

function Note({ note }: { note: RepairNoteType }) {
  const state = note.garanty
    ? 'Garantía'
    : null != note.budget
      ? `${note.budget} €`
      : 'Sin presupuestar';

  return (
    <Link to={`/${note.id}`}>
      <div className='grid h-full grid-rows-3 items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 text-center text-gray-700 transition duration-100 ease-in hover:-translate-y-2 hover:shadow-2xl'>
        <h2 className='mb-1 text-3xl font-bold'>{note.id}</h2>

        <span className='text-xl'>{note.model}</span>

        <div className='flex justify-around gap-6 text-lg'>
          <span className='text-md flex flex-col items-center gap-2'>
            <UserIcon className='size-5' />
            {note.client}
          </span>
          <span className='text-md flex flex-col items-center gap-2'>
            <DevicePhoneMobileIcon className='size-5' />
            {note.phoneNumber}
          </span>
        </div>

        <div className='mt-4 flex w-full items-center justify-between'>
          <div
            className={`rounded-lg border px-4 py-2 ${
              note.isRepaired
                ? 'border-green-600 text-green-600'
                : 'border-red-600 text-red-600'
            }`}
          >
            <span>{note.isRepaired ? 'Reparado' : 'No reparado'}</span>
          </div>
          <div className='text-md'>
            <span>{state}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Note;
