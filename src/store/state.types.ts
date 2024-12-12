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
  highlightLayerInfo: layerInfo;
  toggleHighlightBarOpen: () => void;
  setHighlightLayerInfo: (layerInfo: layerInfo) => void;
}
