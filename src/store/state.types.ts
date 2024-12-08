export interface DashboardState {
  isDashboardOpen: boolean;
  openDashboard: () => void;
  closeDashboard: () => void;
}

export interface ServiceHighlightState {
  isHighlightBarOpen: boolean;
  openHighlightBar: () => void;
  closeHighlightBar: () => void;
}
