(() => {
  if (!window.customElements) {
    console.error('customElements is not available');
    return;
  }

  class WebHighlightLayer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      if (!this.shadowRoot) {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        const styleTag = document.createElement('style');
        styleTag.textContent = process.env.INLINE_CSS as string;
        shadowRoot.appendChild(styleTag);

        const reactRoot = document.createElement('div');
        shadowRoot.appendChild(reactRoot);
      }
    }
  }

  class WebDashboard extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      if (!this.shadowRoot) {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        const styleTag = document.createElement('style');
        styleTag.textContent = process.env.INLINE_CSS as string;
        shadowRoot.appendChild(styleTag);

        const reactRoot = document.createElement('div');
        shadowRoot.appendChild(reactRoot);
      }
    }
  }

  customElements.define('web-highlight-layer', WebHighlightLayer);
  customElements.define('web-dashboard', WebDashboard);

  const notifyCustomElementsReady = async () => {
    await customElements.whenDefined('web-highlight-layer');
    await customElements.whenDefined('web-dashboard');

    window.postMessage({ type: 'ELEMENT_READY', element: 'web-highlight-layer' }, '*');
    window.postMessage({ type: 'ELEMENT_READY', element: 'web-dashboard' }, '*');
  };

  notifyCustomElementsReady();
})();
