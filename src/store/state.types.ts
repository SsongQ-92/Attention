export interface DashboardState {
  isDashboardOpen: boolean;
  toggleDashboard: () => void;
}

export interface ServiceHighlightState {
  isHighlightBarOpen: boolean;
  openHighlightBar: () => void;
  closeHighlightBar: () => void;
}
