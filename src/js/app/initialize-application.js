import { initRouter, renderRoute } from '../router';
import { runWithInitialLoader } from '../ui/initial-loader';
import { resolveInitialRoute, syncInitialRoutePath } from './initial-route';
import { renderSiteShell } from './render-site-shell';

/**
 * Initializes router behavior and the first route content.
 * @param {string} pathname
 * @returns {Promise<void>}
 */
async function initializeApplicationModules(pathname) {
    initRouter();

    await renderRoute(pathname, { shouldFocusRoute: false });
}

/**
 * Initializes application modules after the DOM is ready.
 * @returns {Promise<void>}
 */
export async function initializeApplication() {
    renderSiteShell();

    const initialRoute = resolveInitialRoute(window.location);

    syncInitialRoutePath(initialRoute.address);
    await runWithInitialLoader(async () => {
        await initializeApplicationModules(initialRoute.pathname);
    });
}
