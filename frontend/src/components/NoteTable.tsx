import { useNavigate } from 'react-router-dom';
import { RepairNoteType } from '../types';
import { getArrayFromDb } from '../utils';

const Header = () => {
  return (
    <thead className='rounded border-b border-slate-300 bg-slate-50 text-left'>
      <tr className='p-4 font-semibold text-slate-600 md:text-xl'>
        <td className='th-td'>#</td>
        <td className='th-td'>Cliente</td>
        <td className='th-td'>Máquinas</td>
        <td className='th-td hidden md:table-cell'>Averías</td>
        <td className='th-td hidden md:table-cell'>Retirado</td>
        <td className='th-td hidden md:table-cell'>Estado</td>
        <td className='th-td hidden md:table-cell'>Presupuesto</td>
        <td></td>
      </tr>
    </thead>
  );
};

const Body = ({ notes }: { notes: RepairNoteType[] }) => {
  const navigate = useNavigate();
  return (
    <tbody className='text-slate-800 md:text-lg'>
      {notes.map((note) => {
        const {
          isRepaired,
          garanty,
          budget,
          malfunction,
          departureDate,
          model
        } = note;
        const machines = getArrayFromDb(model);
        const malfunctions = getArrayFromDb(malfunction);

        const state = isRepaired ? 'Reparada' : 'Sin reparar';
        const stateStyles = isRepaired ? 'repaired-state' : 'unrepaired-state';

        const budgetText = garanty
          ? 'Garantía'
          : budget !== null && budget !== undefined
            ? `${budget}€`
            : 'Pendiente';

        const isCollected = null != departureDate;

        return (
          <tr
            className='w-full rounded border-b border-slate-300 bg-slate-50 text-center text-lg transition ease-in hover:-translate-x-2 hover:-translate-y-1 hover:cursor-pointer hover:border-0 hover:shadow-lg sm:text-sm md:text-xl'
            key={note.id}
            onClick={() => navigate(`/${note.id}`)}
          >
            <td className='tb-td p-6 text-left text-2xl font-bold'>
              {note.id}
            </td>
            <td className='tb-td'>
              <div className='flex w-full flex-col gap-4 p-8 text-left'>
                <span className='text-wrap'>{note.client}</span>
                <span className='text-base text-gray-500'>
                  {note.phoneNumber}
                </span>
              </div>
            </td>
            <td className='tb-td hidden md:table-cell'>
              <ul className='table-list'>
                {machines.map((machine) => {
                  return <li className='table-list.element'>{machine}</li>;
                })}
              </ul>
            </td>
            <td className='tb-td hidden flex-col md:table-cell'>
              <ul className='table-list'>
                {malfunctions.map((malfunction) => {
                  return <li className='table-list.element'>{malfunction}</li>;
                })}
              </ul>
            </td>
            <td className='tb-td hidden md:table-cell'>
              {isCollected ? 'Sí' : 'No'}
            </td>

            <td className='tb-td'>
              <div className={stateStyles}>
                <span>{state}</span>
              </div>
            </td>
            <td
              className={`tb-td hidden md:table-cell ${null != budget && 'text-right'}`}
            >
              {budgetText}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

NoteTable.Header = Header;
NoteTable.Body = Body;

function NoteTable({ notes }: { notes: RepairNoteType[] }) {
  return (
    <table className='md:text-md -x m-2 w-full min-w-full overflow-x-auto bg-slate-100 text-slate-800'>
      <NoteTable.Header />
      <NoteTable.Body notes={notes} />
    </table>
  );
}

export default NoteTable;
