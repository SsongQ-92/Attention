import '../../config/base.css';

import useSendMessage from '../../hooks/useSendMessage';

function ServiceHighlightLayer() {
  useSendMessage('PAGE_LOADED');

  return (
    <main>
      <div></div>
    </main>
  );
}

export default ServiceHighlightLayer;
