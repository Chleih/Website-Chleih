import siteShellTemplate from '../html/layouts/site-shell.html?raw';
import '../scss/main.scss';
import { initLanguage } from './i18n';
import { syncTranslations } from './i18n/sync-translations';
import { initRouter, renderRoute } from './router';
import { initUi } from './ui';

/**
 * Renders the persistent site shell into the root application entry point.
 */
function renderSiteShell() {
    const applicationRoot = document.getElementById('app');

    applicationRoot.innerHTML = siteShellTemplate;
}

/**
 * Initializes the application after the DOM is ready.
 */
async function initializeApplication() {
    renderSiteShell();
    await renderRoute(window.location.pathname);

    await initLanguage();
    initUi();
    initRouter({
        afterRouteChange: syncTranslations,
    });
}

/**
 * Registers the application bootstrap on DOMContentLoaded.
 */
function registerApplicationBootstrap() {
    document.addEventListener('DOMContentLoaded', async () => {
        await initializeApplication();
    });
}

registerApplicationBootstrap();
