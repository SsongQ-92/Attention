import RevertIcon from '../Icon/RevertIcon';

interface Props {
  onRevertIconClick: () => void;
}

function ServiceHighlightBar({ onRevertIconClick }: Props) {
  return (
    <>
      <div
        onClick={onRevertIconClick}
        className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
      >
        <RevertIcon className='size-25 hover:cursor-pointer' />
      </div>
    </>
  );
}

export default ServiceHighlightBar;
