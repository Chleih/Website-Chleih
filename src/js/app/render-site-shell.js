import siteShellTemplate from '../../html/layouts/site-shell.html?raw';

/**
 * Renders the persistent site shell into the root application entry point.
 */
export function renderSiteShell() {
    const applicationRoot = document.getElementById('app');

    applicationRoot.innerHTML = siteShellTemplate;
}
