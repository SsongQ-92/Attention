import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import Browser from 'webextension-polyfill';

import DashboardContainer from '../components/Dashboard/DashboardContainer';
import ServiceHighlightLayer from '../components/ServiceHighlight/ServiceHighlightLayer';
import UserHighlightLayer from '../components/UserHighlight/UserHighlightLayer';

const injectScript = async () => {
  const script = document.createElement('script');
  script.src = Browser.runtime.getURL('injected-customElements-script.js');
  (document.body || document.head || document.documentElement).appendChild(script);
  script.remove();
};

const initializeRender = async () => {
  await injectScript();

  if (document) {
    if (!document.querySelector('web-highlight-layer')) {
      const webHighlightLayer = document.createElement('web-highlight-layer');
      const mainRootDiv = document.querySelector('body') as HTMLBodyElement;
      mainRootDiv.appendChild(webHighlightLayer);
    }

    if (!document.querySelector('web-dashboard')) {
      const webDashboard = document.createElement('web-dashboard');
      document.body.parentNode?.insertBefore(webDashboard, document.body.nextSibling);
    }

    window.addEventListener('message', (event) => {
      if (event.data?.type === 'ELEMENT_READY' && event.data.element === 'web-highlight-layer') {
        const webHighlightLayer = document.querySelector('web-highlight-layer');
        const shadowRootForWebHighlightLayer = webHighlightLayer?.shadowRoot;
        const renderRoot = shadowRootForWebHighlightLayer?.querySelector('div');

        if (renderRoot) {
          createRoot(renderRoot).render(
            <StrictMode>
              <UserHighlightLayer />
              <ServiceHighlightLayer />
            </StrictMode>
          );
        }
      }

      if (event.data?.type === 'ELEMENT_READY' && event.data.element === 'web-dashboard') {
        const webHighlightLayer = document.querySelector('web-dashboard');
        const shadowRootForWebHighlightLayer = webHighlightLayer?.shadowRoot;
        const renderRoot = shadowRootForWebHighlightLayer?.querySelector('div');

        if (renderRoot) {
          createRoot(renderRoot).render(
            <StrictMode>
              <DashboardContainer />
            </StrictMode>
          );
        }
      }
    });
  }
};

initializeRender();
