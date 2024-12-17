//TODO refactor this component to compound component
function PaginationButton({
  show,
  onClick,
  Icon
}: {
  show: boolean;
  onClick: () => void;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >;
}) {
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
}

export default PaginationButton;
