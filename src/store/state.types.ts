export interface DashboardState {
  isDashboardOpen: boolean;
  toggleDashboardOpen: () => void;
}

export interface ServiceHighlightState {
  isHighlightBarOpen: boolean;
  openHighlightBar: () => void;
  closeHighlightBar: () => void;
}
