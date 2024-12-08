import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import ServiceHighlightLayer from '../ServiceHighlight/ServiceHighlightLayer';

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

customElements.define('webhighlight-layer', WebHighlightLayer);
