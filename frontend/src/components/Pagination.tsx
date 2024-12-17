import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const PaginationButton = ({
  show,
  onClick,
  Icon
}: {
  show: boolean;
  onClick: () => void;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!show}
      className={`flex gap-2 rounded-full border border-slate-200 p-2 ${
        !show ? 'disabled opacity-0' : ''
      }`}
    >
      <Icon className='size-6 text-slate-700' />
    </button>
  );
};

Pagination.Button = PaginationButton;

function Pagination({
  page,
  pageCount,
  update
}: {
  page: number;
  pageCount: number;
  update: { next: () => void; prior: () => void };
}) {
  const showForward = page + 1 <= pageCount;
  const showPrior = page - 1 > 0;

  return (
    <div className='mx-auto mt-8 flex w-1/2 items-center justify-center gap-10'>
      <Pagination.Button
        Icon={ArrowLeftIcon}
        onClick={update.prior}
        show={showPrior}
      />
      <span className='text-2xl font-semibold text-slate-700'>{page}</span>
      <Pagination.Button
        Icon={ArrowRightIcon}
        onClick={update.next}
        show={showForward}
      />
    </div>
  );
}

export default Pagination;
