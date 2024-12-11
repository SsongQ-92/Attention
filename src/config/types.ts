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
