export const checkMessageType = (message: unknown): message is { action: string } => {
  return (
    typeof message === 'object' &&
    message !== null &&
    'action' in message &&
    typeof (message as Record<string, string>).action === 'string'
  );
};

export interface TagRectData {
  tagName: string;
  tagStartRectY: number;
  tagEndRectY: number;
  tagStartRectX: number;
  tagWidth: number;
  tagHeight: number;
  tagVisiblePartially: boolean;
  tagTextContent: string;
  tagUniqueKey: string;
}

export interface Memo {
  id: number;
  title: string;
  content: string;
  url: string;
  metaTitle: string;
  createdAt: Date;
  modifiedAt: Date | null;
}

export type annotationType =
  | 'underline'
  | 'box'
  | 'circle'
  | 'highlight'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

export interface AnnotationInfo {
  id: string;
  tagName: string;
  content: string;
  type: annotationType;
  color: string;
  url: string;
  context: {
    beforeText: string;
    afterText: string;
    beforeTagName: string;
    afterTagName: string;
  };
  position: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
  };
}
