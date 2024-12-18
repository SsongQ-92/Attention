import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import getDate from '../../utils/getDate';
import ClockwiseIcon from '../Icon/ClockwiseIcon';

interface Props {
  memo: Memo;
}

function MemoCard({ memo }: Props) {
  const { id, title, content, createdAt, modifiedAt, url, metaTitle } = memo;

  const setViewMemoMode = useBoundStore((state) => state.setViewMemoMode);
  const updatedDate = modifiedAt !== null ? modifiedAt : createdAt;
  const { year, month, date, hour, minute, standard } = getDate(updatedDate);

  const handleCardClick = () => {
    setViewMemoMode({
      isActive: true,
      id,
      title,
      content,
    });
  };

  return (
    <div className='w-full flex flex-col justify-center items-start gap-8 border-1 rounded-sm p-10 text-customBlack border-borderColor break-words'>
      <h3
        onClick={handleCardClick}
        className='w-full p-2 font-semibold text-18 cursor-pointer hover:bg-backgroundColor-hover hover:underline'
      >
        {title}
      </h3>
      <div className='text-12'>
        <p className='flex items-start gap-6 mb-1'>
          <span className='bg-blue-50 py-1 px-2 text-10'>사이트 바로가기</span>
          <span className='border-1 border-borderColor text-8 py-1-1 px-2'>새 창</span>
        </p>
        <a href={url} rel='noopener noreferrer' target='_blank'>
          <span className='text-blue-400 hover:underline'>{`${url.length > 25 ? url.slice(0, 25) + '...' : url} | ${metaTitle}`}</span>
        </a>
      </div>
      <div className='flex items-center gap-5 text-12 text-black/80'>
        <ClockwiseIcon className='size-14 pt-1' />
        {`${year}-${month}-${date} ${hour}:${minute} ${standard}`}
      </div>
    </div>
  );
}

export default MemoCard;
