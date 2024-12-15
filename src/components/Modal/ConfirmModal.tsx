import useBoundStore from '../../store/useBoundStore';
import ModalBackground from './ModalBackground';
import ModalContainer from './ModalContainer';

interface Props {
  confirmText: string;
  onConfirmClick: () => void;
}

function ConfirmModal({ confirmText, onConfirmClick }: Props) {
  const clearOpenModalTypeList = useBoundStore((state) => state.clearOpenModalTypeList);

  const handleCancelClick = () => {
    clearOpenModalTypeList();
  };

  const handleConfirmClick = () => {
    onConfirmClick();
    clearOpenModalTypeList();
  };

  return (
    <ModalBackground>
      <ModalContainer hasCloseButton={false}>
        <main className='flex flex-col gap-20 items-center w-160'>
          <h1 className='text-14 text-customBlack'>{confirmText}</h1>
          <div className='flex gap-20'>
            <button
              onClick={handleCancelClick}
              className='px-4 py-2 text-14 bg-white rounded-sm border-1 border-borderColor hover:bg-backgroundColor-hover'
            >
              취소
            </button>
            <button
              onClick={handleConfirmClick}
              className='px-4 py-2 text-14 bg-customBlack rounded-sm border-borderColor text-white hover:bg-backgroundColor-darkHover'
            >
              확인
            </button>
          </div>
        </main>
      </ModalContainer>
    </ModalBackground>
  );
}

export default ConfirmModal;
