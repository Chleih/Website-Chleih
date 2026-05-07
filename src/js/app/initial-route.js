import { HOME_PATH, isKnownRoutePath } from '../router';
import { shouldRunInitialEntryExperience } from '../ui/initial-loader';

/**
 * Returns whether a direct startup route should enter through the home page.
 * @param {string} pathname
 * @returns {boolean}
 */
function shouldStartAtHome(pathname) {
    return shouldRunInitialEntryExperience() && pathname !== HOME_PATH && isKnownRoutePath(pathname);
}

/**
 * Resolves the route that should be rendered during application startup.
 * @param {string} currentPathname
 * @returns {string}
 */
export function resolveInitialRoutePath(currentPathname) {
    return shouldStartAtHome(currentPathname) ? HOME_PATH : currentPathname;
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
