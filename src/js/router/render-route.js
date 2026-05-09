import { getRequiredElement } from '../dom/required-element';
import { ROUTE_CHANGED_EVENT, ROUTER_LINK_SELECTOR, ROUTER_OUTLET_SELECTOR } from './constants';
import { focusRouteContent, syncRouteDocumentMetadata } from './route-document';
import { normalizePathname, resolveRoute } from './route-resolution';

/**
 * Updates navigation link state for the active route.
 * @param {string} pathname
 * @returns {void}
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
 * Announces that a route has finished rendering.
 * @param {import('./types').RouteDefinition} route
 * @returns {void}
 */
function dispatchRouteChangedEvent(route) {
    document.dispatchEvent(
        new CustomEvent(ROUTE_CHANGED_EVENT, {
            detail: {
                name: route.name,
                path: route.path,
            },
        }),
    );
}

/**
 * Renders the route matching the provided path into the route outlet.
 * @param {string} pathname
 * @param {{shouldFocusRoute?: boolean}} [options]
 * @returns {Promise<import('./types').RouteDefinition>}
 */
export async function renderRoute(pathname, options = {}) {
    const { shouldFocusRoute = true } = options;
    const route = resolveRoute(pathname);
    const routerOutlet = getRequiredElement(document, ROUTER_OUTLET_SELECTOR, HTMLElement);

    syncRouteDocumentMetadata(route);
    routerOutlet.innerHTML = route.template;
    updateActiveNavigation(route.path);
    await route.afterRender?.();

    if (shouldFocusRoute) {
        focusRouteContent(routerOutlet);
    }

    dispatchRouteChangedEvent(route);

    return route;
}
