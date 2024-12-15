import { PropsWithChildren } from 'react';

import useBoundStore from '../../store/useBoundStore';
import CloseIcon from '../Icon/CloseIcon';

interface Props {
  hasCloseButton: boolean;
}

const ModalFrame = ({ hasCloseButton, children }: PropsWithChildren<Props>) => {
  const clearOpenModalTypeList = useBoundStore((state) => state.clearOpenModalTypeList);

  const handleCloseIconClick = () => {
    clearOpenModalTypeList();
  };

  return (
    <div
      className='relative py-10 px-30 rounded-[5px] bg-white border-2 border-borderColor'
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      {hasCloseButton && (
        <button className='absolute top-10 right-14' onClick={handleCloseIconClick}>
          <CloseIcon className='size-20' />
        </button>
      )}
    </div>
  );
};

export default ModalFrame;
