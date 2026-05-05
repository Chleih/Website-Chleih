import { HOME_PATH } from '../router';
import { shouldShowInitialLoader } from '../ui/initial-loader';

/**
 * Resolves the route that should be rendered during application startup.
 * @param {string} currentPathname
 * @returns {string}
 */
export function resolveInitialRoutePath(currentPathname) {
    return shouldShowInitialLoader() ? HOME_PATH : currentPathname;
}

/**
 * Keeps the browser URL aligned with the resolved startup route.
 * @param {string} pathname
 * @returns {void}
 */
export function syncInitialRoutePath(pathname) {
    if (window.location.pathname === pathname) {
        return;
    }

    window.history.replaceState(null, '', pathname);
}
