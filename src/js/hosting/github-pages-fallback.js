import { HOME_PATH } from '../router/constants';
import { createRouteAddress } from '../router/route-address';
import { storeFallbackRouteAddress } from './fallback-route-storage';
import { renderHostingNotFoundPage } from './render-hosting-not-found-page';

const FILE_EXTENSION_PATTERN = /\.[a-z0-9]+$/i;

/**
 * Returns the final path segment from a browser pathname.
 * @param {string} pathname
 * @returns {string}
 */
function getLastPathSegment(pathname) {
    return pathname.split('/').filter(Boolean).at(-1) ?? '';
}

/**
 * Returns whether a path looks like a direct file request instead of an app route.
 * @param {string} pathname
 * @returns {boolean}
 */
function isFileRequestPath(pathname) {
    return FILE_EXTENSION_PATTERN.test(getLastPathSegment(pathname));
}

/**
 * Returns whether the fallback request should be handed back to the app router.
 * @param {string} pathname
 * @returns {boolean}
 */
function shouldRedirectToApplication(pathname) {
    return !isFileRequestPath(pathname);
}

/**
 * Redirects GitHub Pages document fallback requests through the app entry.
 * @returns {void}
 */
function redirectDocumentRequestToApplication() {
    if (!shouldRedirectToApplication(window.location.pathname)) {
        renderHostingNotFoundPage();
        return;
    }

    storeFallbackRouteAddress(
        createRouteAddress(window.location.pathname, window.location.search, window.location.hash),
    );
    window.location.replace(HOME_PATH);
}

redirectDocumentRequestToApplication();
