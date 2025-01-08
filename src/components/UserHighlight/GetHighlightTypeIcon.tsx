import { annotationType } from '../../config/types';
import BoxIcon from '../Icon/BoxIcon';
import CircleIcon from '../Icon/CircleIcon';
import HighlighterIcon from '../Icon/HighlighterIcon';
import UnderlineIcon from '../Icon/UnderlineIcon';

interface Props {
  type: annotationType;
  size: number;
}

function GetHighlightTypeIcon({ type, size }: Props) {
  switch (type) {
    case 'underline':
      return <UnderlineIcon className={`size-${size}`} />;
    case 'box':
      return <BoxIcon className={`size-${size}`} />;
    case 'circle':
      return <CircleIcon className={`size-${size}`} />;
    case 'highlight':
      return <HighlighterIcon className={`size-${size}`} />;
  }
}

export default GetHighlightTypeIcon;
