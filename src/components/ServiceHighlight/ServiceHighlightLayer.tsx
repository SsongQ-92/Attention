import '../../config/base.css';

import useSendMessage from '../../hooks/useSendMessage';

function ServiceHighlightLayer() {
  useSendMessage('PAGE_LOADED');

  return (
    <main className='w-screen h-screen'>
      <div></div>
    </main>
  );
}

export default ServiceHighlightLayer;
