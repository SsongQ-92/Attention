const webHighlightLayer = document.createElement('web-highlight-layer');
document.body.appendChild(webHighlightLayer);

const webDashboard = document.createElement('web-dashboard');
document.body.parentNode?.insertBefore(webDashboard, document.body.nextSibling);
