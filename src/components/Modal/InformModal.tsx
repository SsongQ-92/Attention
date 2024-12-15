import useBoundStore from '../../store/useBoundStore';
import ModalBackground from './ModalBackground';
import ModalContainer from './ModalContainer';

interface Props {
  confirmText: string;
}

function InformModal({ confirmText }: Props) {
  const clearOpenModalTypeList = useBoundStore((state) => state.clearOpenModalTypeList);

  const handleConfirmClick = () => {
    clearOpenModalTypeList();
  };

  return (
    <ModalBackground>
      <ModalContainer hasCloseButton={false}>
        <main className='flex flex-col gap-20 items-center w-160'>
          <h1 className='text-14 text-customBlack'>{confirmText}</h1>
          <button
            onClick={handleConfirmClick}
            className='px-4 py-2 text-14 bg-white rounded-sm border-1 border-borderColor hover:bg-backgroundColor-hover'
          >
            확인
          </button>
        </main>
      </ModalContainer>
    </ModalBackground>
  );
}

export default InformModal;
