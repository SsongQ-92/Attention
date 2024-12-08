import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import DashboardContainer from '../Dashboard/DashboardContainer';

class WebDashboard extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const reactRoot = document.createElement('div');
    shadowRoot.appendChild(reactRoot);

    createRoot(reactRoot).render(
      <StrictMode>
        <DashboardContainer />
      </StrictMode>
    );
  }
}

customElements.define('web-dashboard', WebDashboard);
