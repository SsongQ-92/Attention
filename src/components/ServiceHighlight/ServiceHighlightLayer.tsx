import useSendMessage from '../../hooks/useSendMessage';

function ServiceHighlightLayer() {
  useSendMessage('PAGE_LOADED');

  return (
    <main className='font-pretendard w-screen h-screen'>
      <div></div>
    </main>
  );
}

export default ServiceHighlightLayer;
