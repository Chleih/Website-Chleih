import { notFoundRoute, routes } from './routes';

/**
 * Normalizes a route path for matching.
 * @param {string} pathname
 * @returns {string}
 */
export function normalizePathname(pathname) {
    const normalizedPathname = pathname.replace(/\/+$/, '');

    return normalizedPathname || '/';
}

/**
 * Finds a route matching the provided path.
 * @param {string} pathname
 * @returns {import('./types').RouteDefinition | undefined}
 */
function findRoute(pathname) {
    const normalizedPathname = normalizePathname(pathname);

    return routes.find((route) => route.path === normalizedPathname);
}

/**
 * Returns whether the provided path belongs to a registered app route.
 * @param {string} pathname
 * @returns {boolean}
 */
export function isKnownRoutePath(pathname) {
    return Boolean(findRoute(pathname));
}

/**
 * Resolves the route that should render for the provided path.
 * @param {string} pathname
 * @returns {import('./types').RouteDefinition}
 */
export function resolveRoute(pathname) {
    return findRoute(pathname) ?? notFoundRoute;
}
