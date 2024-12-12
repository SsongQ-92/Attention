export interface DashboardState {
  isDashboardOpen: boolean;
  toggleDashboardOpen: () => void;
}

interface layerInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ServiceHighlightState {
  isHighlightBarOpen: boolean;
  isKeyboardMode: boolean;
  highlightLayerInfo: layerInfo;
  toggleHighlightBarOpen: () => void;
  toggleKeyboardMode: () => void;
  setHighlightLayerInfo: (layerInfo: layerInfo) => void;
}
