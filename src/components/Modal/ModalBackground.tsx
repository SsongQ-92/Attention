import { PropsWithChildren } from 'react';

import useBoundStore from '../../store/useBoundStore';

const ModalBackground = ({ children }: PropsWithChildren) => {
  const clearOpenModalTypeList = useBoundStore((state) => state.clearOpenModalTypeList);

  const handleModalBackgroundClick = () => {
    clearOpenModalTypeList();
  };

  return (
    <div
      className='absolute inset-0 w-full h-full flex-center z-50 bg-black/60'
      onClick={handleModalBackgroundClick}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
