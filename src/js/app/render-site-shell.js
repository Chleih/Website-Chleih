import siteShellTemplate from '../../html/layouts/site-shell.html?raw';
import { getRequiredElementById } from '../dom/required-element';
import { renderSiteNavigation } from './render-site-navigation';

/**
 * Renders the persistent site shell into the root application entry point.
 * @returns {void}
 */
export function renderSiteShell() {
    const applicationRoot = getRequiredElementById('app');

    applicationRoot.innerHTML = siteShellTemplate;
    renderSiteNavigation(applicationRoot);
}
