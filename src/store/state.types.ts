export interface DashboardState {
  isDashboardOpen: boolean;
  isViewMemoMode: boolean;
  isCreatingMemoMode: boolean;
  isEditingMemoMode: boolean;
  toggleDashboardOpen: () => void;
  setViewMemoMode: (isView: boolean) => void;
  setCreatingMemoMode: (isCreate: boolean) => void;
  setEditingMemoMode: (isEdit: boolean) => void;
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
  setKeyboardModeOff: () => void;
  setHighlightLayerInfo: (layerInfo: layerInfo) => void;
}
