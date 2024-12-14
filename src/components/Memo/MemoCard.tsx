import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import getDate from '../../utils/getDate';

interface Props {
  memo: Memo;
}

function MemoCard({ memo }: Props) {
  const { id, title, content, createdAt, modifiedAt } = memo;

  const setViewMemoMode = useBoundStore((state) => state.setViewMemoMode);
  const updatedDate = modifiedAt !== null ? modifiedAt : createdAt;
  const { year, month, date, hour, minute, standard } = getDate(updatedDate);

  const handleCardClick = () => {
    setViewMemoMode({
      isActive: true,
      id,
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className='w-full flex flex-col justify-center items-start gap-5 border-1 rounded-sm p-10 text-customBlack border-borderColor hover:bg-backgroundColor-hover'
    >
      <h3 className='font-semibold text-16'>{title}</h3>
      <p className='text-14'>{content.slice(0, 25)}</p>
      <p className='text-12 text-black/80'>{`${year}-${month}-${date} ${hour}:${minute} ${standard}`}</p>
    </div>
  );
}

export default MemoCard;
