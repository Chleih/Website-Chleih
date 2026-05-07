import { consumeFallbackRouteAddress } from '../hosting/fallback-route-storage';
import { HOME_PATH, isKnownRoutePath } from '../router';
import { createRouteAddress } from '../router/route-address';
import { shouldRunInitialEntryExperience } from '../ui/initial-loader';

/**
 * @typedef {object} InitialRouteResolution
 * @property {string} pathname
 * @property {string} address
 */

/**
 * Returns the URL requested before the hosting fallback redirected to the app entry.
 * @returns {URL | null}
 */
function getFallbackRouteUrl() {
    const fallbackRouteAddress = consumeFallbackRouteAddress();

    if (!fallbackRouteAddress) {
        return null;
    }

    try {
        return new URL(fallbackRouteAddress, window.location.origin);
    } catch {
        return null;
    }
}

/**
 * Returns the requested startup URL that should be evaluated by app routing policy.
 * @param {Location} currentLocation
 * @returns {URL}
 */
function getRequestedStartupUrl(currentLocation) {
    return getFallbackRouteUrl() ?? new URL(currentLocation.href);
}

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
 * @param {Location} currentLocation
 * @returns {InitialRouteResolution}
 */
export function resolveInitialRoute(currentLocation) {
    const requestedUrl = getRequestedStartupUrl(currentLocation);

    if (shouldStartAtHome(requestedUrl.pathname)) {
        return {
            pathname: HOME_PATH,
            address: HOME_PATH,
        };
    }

    return {
        pathname: requestedUrl.pathname,
        address: createRouteAddress(requestedUrl.pathname, requestedUrl.search, requestedUrl.hash),
    };
}

/**
 * Keeps the browser URL aligned with the resolved startup route.
 * @param {string} routeAddress
 * @returns {void}
 */
export function syncInitialRoutePath(routeAddress) {
    const currentRouteAddress = createRouteAddress(
        window.location.pathname,
        window.location.search,
        window.location.hash,
    );

    if (currentRouteAddress === routeAddress) {
        return;
    }

    window.history.replaceState(null, '', routeAddress);
}
