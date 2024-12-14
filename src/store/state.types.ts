interface View {
  isActive: boolean;
  id: number;
}

export interface DashboardState {
  isDashboardOpen: boolean;
  viewMemoMode: View;
  isCreatingMemoMode: boolean;
  isEditingMemoMode: boolean;
  toggleDashboardOpen: () => void;
  setViewMemoMode: (viewMode: View) => void;
  setCreatingMemoMode: (isCreate: boolean) => void;
  setEditingMemoMode: (isEdit: boolean) => void;
}

interface LayerInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ServiceHighlightState {
  isHighlightBarOpen: boolean;
  isKeyboardMode: boolean;
  highlightLayerInfo: LayerInfo;
  toggleHighlightBarOpen: () => void;
  toggleKeyboardMode: () => void;
  setKeyboardModeOff: () => void;
  setHighlightLayerInfo: (layerInfo: LayerInfo) => void;
}
