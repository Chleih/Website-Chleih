import { ROUTER_LINK_SELECTOR, ROUTER_OUTLET_SELECTOR } from './constants';
import { notFoundRoute, routes } from './routes';

/**
 * Normalizes a route path for matching.
 * @param {string} pathname
 * @returns {string}
 */
function normalizePathname(pathname) {
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
 * Loads a route template from its lazy page module.
 * @param {import('./types').RouteDefinition} route
 * @returns {Promise<string>}
 */
async function loadRouteTemplate(route) {
    const pageModule = await route.template();

    return pageModule.default;
}

/**
 * Updates navigation link state for the active route.
 * @param {string} pathname
 */
function updateActiveNavigation(pathname) {
    const normalizedPathname = normalizePathname(pathname);
    const routerLinks = document.querySelectorAll(ROUTER_LINK_SELECTOR);

    for (const link of routerLinks) {
        if (!(link instanceof HTMLAnchorElement) || !link.classList.contains('site-navigation__link')) {
            continue;
        }

        const linkPathname = normalizePathname(new URL(link.href).pathname);
        const isActive = linkPathname === normalizedPathname;

        link.classList.toggle('is-active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'page');
            continue;
        }

        link.removeAttribute('aria-current');
    }
}

/**
 * Renders the route matching the provided path into the route outlet.
 * @param {string} pathname
 * @returns {Promise<import('./types').RouteDefinition>}
 */
export async function renderRoute(pathname) {
    const route = findRoute(pathname) ?? notFoundRoute;
    const routerOutlet = document.querySelector(ROUTER_OUTLET_SELECTOR);

    const template = await loadRouteTemplate(route);

    routerOutlet.innerHTML = template;
    updateActiveNavigation(route.path);
    await route.afterRender?.();

    return route;
}
