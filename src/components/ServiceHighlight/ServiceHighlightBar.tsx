import useAnalyzeDOM from '../../hooks/useAnalyzeDOM';
import RevertIcon from '../Icon/RevertIcon';

interface Props {
  onRevertIconClick: () => void;
}

function ServiceHighlightBar({ onRevertIconClick }: Props) {
  const elementRects = useAnalyzeDOM();

  console.log(elementRects);

  return (
    <>
      <div
        onClick={onRevertIconClick}
        className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
      >
        <RevertIcon className='size-25 hover:cursor-pointer' />
      </div>
      <div className='w-full h-full bg-borderColor'></div>
    </>
  );
}

export default ServiceHighlightBar;
