interface View {
  isActive: boolean;
  id: number;
  title: string;
  content: string;
}

interface NewNote {
  title: string;
  content: string;
}

export interface DashboardState {
  isDashboardOpen: boolean;
  viewMemoMode: View;
  newNote: NewNote;
  isCreatingMemoMode: boolean;
  isEditingMemoMode: boolean;
  isFoldedDashboardOpen: boolean;
  toggleDashboardOpen: () => void;
  setDashboardOpen: (isOpen: boolean) => void;
  setFoldedDashboardOpen: (isOpen: boolean) => void;
  setViewMemoMode: (viewMode: View) => void;
  setNewNote: (newNote: NewNote) => void;
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
  isKeyboardIconHover: boolean;
  highlightLayerInfo: ServiceLayerInfo;
  toggleHighlightBarOpen: () => void;
  toggleKeyboardMode: () => void;
  setKeyboardModeOff: () => void;
  setKeyboardIconHover: (isHover: boolean) => void;
  setHighlightLayerInfo: (layerInfo: ServiceLayerInfo) => void;
}

export interface UserHighlightState {
  isUserHighlightMode: boolean;
  toggleUserHighlightMode: () => void;
  setUserHighlightMode: (isActive: boolean) => void;
}

type modalType = 'confirm' | 'informCopyHighlight' | 'informNoMemoTitle' | 'informNoMemoContent';

export interface ModalState {
  openModalTypeList: modalType[];
  addModal: (modalType: modalType) => void;
  closeModal: (modalType: modalType) => void;
  clearOpenModalTypeList: () => void;
}
