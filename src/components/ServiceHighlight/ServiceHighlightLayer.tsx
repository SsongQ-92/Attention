import { msgAction } from '../../config/consts';
import useSendMsgToBg from '../../hooks/useSendMsgToBg';

function ServiceHighlightLayer() {
  useSendMsgToBg(msgAction.PAGE_LOADED);

  return (
    <main className='font-pretendard w-screen h-screen'>
      <div></div>
    </main>
  );
}

export default ServiceHighlightLayer;
