import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import DashboardContainer from '../components/Dashboard/DashboardContainer';
import ServiceHighlightLayer from '../components/ServiceHighlight/ServiceHighlightLayer';

class WebHighlightLayer extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const reactRoot = document.createElement('div');
    shadowRoot.appendChild(reactRoot);

    createRoot(reactRoot).render(
      <StrictMode>
        <ServiceHighlightLayer />
      </StrictMode>
    );
  }
}

customElements.define('web-highlight-layer', WebHighlightLayer);

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

const webHighlightLayer = document.createElement('web-highlight-layer');
document.body.appendChild(webHighlightLayer);

const webDashboard = document.createElement('web-dashboard');
document.body.parentNode?.insertBefore(webDashboard, document.body.nextSibling);
