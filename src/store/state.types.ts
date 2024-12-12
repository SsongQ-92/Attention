export interface DashboardState {
  isDashboardOpen: boolean;
  toggleDashboardOpen: () => void;
}

interface layerInfo {
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

export interface ServiceHighlightState {
  isHighlightBarOpen: boolean;
  highlightLayerInfo: layerInfo;
  toggleHighlightBarOpen: () => void;
  setHighlightLayerInfo: (layerInfo: layerInfo) => void;
}
