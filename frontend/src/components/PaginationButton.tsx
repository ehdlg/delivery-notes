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
      className={`flex gap-2 rounded-full border border-gray-200 p-2 ${
        !show ? 'disabled opacity-0' : ''
      }`}
    >
      <Icon className='size-6 text-gray-700' />
    </button>
  );
}

export default PaginationButton;
