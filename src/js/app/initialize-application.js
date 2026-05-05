import { initLanguage } from '../i18n';
import { initRouter, renderRoute } from '../router';
import { runWithInitialLoader } from '../ui/initial-loader';
import { initRouteTranslationSync } from './init-route-translation-sync';
import { renderSiteShell } from './render-site-shell';

/**
 * Initializes router, route content, language, and route translation sync.
 * @returns {Promise<void>}
 */
async function initializeApplicationModules() {
    initRouter();

    await renderRoute(window.location.pathname);
    await initLanguage();

    initRouteTranslationSync();
}

/**
 * Initializes application modules after the DOM is ready.
 * @returns {Promise<void>}
 */
export async function initializeApplication() {
    renderSiteShell();
    await runWithInitialLoader(window.location.pathname, initializeApplicationModules);
}
