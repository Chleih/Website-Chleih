import { createSafeStorage } from '../browser/safe-storage';

const FALLBACK_ROUTE_STORAGE_KEY = 'website-router-fallback-route';

const fallbackRouteStorage = createSafeStorage(() => window.sessionStorage);

/**
 * Stores the browser route address that reached the hosting fallback.
 * @param {string} routeAddress
 * @returns {void}
 */
export function storeFallbackRouteAddress(routeAddress) {
    fallbackRouteStorage.setItem(FALLBACK_ROUTE_STORAGE_KEY, routeAddress);
}

/**
 * Returns and clears the browser route address captured by the hosting fallback.
 * @returns {string | null}
 */
export function consumeFallbackRouteAddress() {
    const routeAddress = fallbackRouteStorage.getItem(FALLBACK_ROUTE_STORAGE_KEY);

    fallbackRouteStorage.removeItem(FALLBACK_ROUTE_STORAGE_KEY);

    return routeAddress;
}
