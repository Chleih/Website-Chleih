import { initLanguage } from '../i18n';
import { initRouter, renderRoute } from '../router';
import { runWithInitialLoader } from '../ui/initial-loader';
import { resolveInitialRoutePath, syncInitialRoutePath } from './initial-route';
import { initRouteTranslationSync } from './init-route-translation-sync';
import { renderSiteShell } from './render-site-shell';

/**
 * Initializes router, route content, language, and route translation sync.
 * @param {string} pathname
 * @returns {Promise<void>}
 */
async function initializeApplicationModules(pathname) {
    initRouter();

    await renderRoute(pathname);
    await initLanguage();

    initRouteTranslationSync();
}

/**
 * Initializes application modules after the DOM is ready.
 * @returns {Promise<void>}
 */
export async function initializeApplication() {
    renderSiteShell();

    const initialRoutePathname = resolveInitialRoutePath(window.location.pathname);

    syncInitialRoutePath(initialRoutePathname);
    await runWithInitialLoader(async () => {
        await initializeApplicationModules(initialRoutePathname);
    });
}
