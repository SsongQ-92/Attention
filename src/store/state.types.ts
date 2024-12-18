interface View {
  isActive: boolean;
  id: number;
  title: string;
  content: string;
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

interface ServiceLayerInfo {
  top: number;
  left: number;
  width: number;
  height: number;
  content: string;
}

export interface ServiceHighlightState {
  isHighlightBarOpen: boolean;
  isKeyboardMode: boolean;
  highlightLayerInfo: ServiceLayerInfo;
  toggleHighlightBarOpen: () => void;
  toggleKeyboardMode: () => void;
  setKeyboardModeOff: () => void;
  setHighlightLayerInfo: (layerInfo: ServiceLayerInfo) => void;
}

export interface UserHighlightState {
  isUserHighlightMode: boolean;
  toggleUserHighlightMode: () => void;
  setUserHighlightMode: (isActive: boolean) => void;
}

type modalType = 'confirm' | 'inform';

export interface ModalState {
  openModalTypeList: modalType[];
  addModal: (modalType: modalType) => void;
  closeModal: (modalType: modalType) => void;
  clearOpenModalTypeList: () => void;
}
