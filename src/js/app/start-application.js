import { initLanguage } from '../i18n';
import { syncTranslations } from '../i18n/sync-translations';
import { initRouter, renderRoute, ROUTE_CHANGED_EVENT } from '../router';
import { renderSiteShell } from './render-site-shell';

/**
 * Keeps translated route content synchronized after router navigation.
 */
function initRouteTranslationSync() {
    document.addEventListener(ROUTE_CHANGED_EVENT, syncTranslations);
}

/**
 * Initializes application modules after the DOM is ready.
 */
async function initializeApplication() {
    renderSiteShell();
    initRouter();

    await renderRoute(window.location.pathname);
    await initLanguage();

    initRouteTranslationSync();
}

/**
 * Starts the application once the initial document is ready.
 */
export function startApplication() {
    document.addEventListener(
        'DOMContentLoaded',
        async () => {
            await initializeApplication();
        },
        { once: true },
    );
}
