const FALLBACK_ROUTE_STORAGE_KEY = 'website-router-fallback-route';

let isFallbackRouteStorageUnavailable = false;

/**
 * Marks fallback-route storage as unavailable for the current runtime.
 * @returns {void}
 */
function markFallbackRouteStorageUnavailable() {
    isFallbackRouteStorageUnavailable = true;
}

/**
 * Returns session storage when it is available for temporary fallback routing.
 * @returns {Storage | null}
 */
function getFallbackRouteStorage() {
    if (isFallbackRouteStorageUnavailable) {
        return null;
    }

    try {
        return window.sessionStorage;
    } catch {
        markFallbackRouteStorageUnavailable();

        return null;
    }
}

/**
 * Stores the browser route address that reached the hosting fallback.
 * @param {string} routeAddress
 * @returns {void}
 */
export function storeFallbackRouteAddress(routeAddress) {
    const storage = getFallbackRouteStorage();

    if (!storage) {
        return;
    }

    try {
        storage.setItem(FALLBACK_ROUTE_STORAGE_KEY, routeAddress);
    } catch {
        markFallbackRouteStorageUnavailable();
    }
}

/**
 * Returns and clears the browser route address captured by the hosting fallback.
 * @returns {string | null}
 */
export function consumeFallbackRouteAddress() {
    const storage = getFallbackRouteStorage();

    if (!storage) {
        return null;
    }

    try {
        const routeAddress = storage.getItem(FALLBACK_ROUTE_STORAGE_KEY);

        storage.removeItem(FALLBACK_ROUTE_STORAGE_KEY);

        return routeAddress;
    } catch {
        markFallbackRouteStorageUnavailable();

        return null;
    }
}
