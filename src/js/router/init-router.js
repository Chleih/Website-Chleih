import { ROUTER_LINK_SELECTOR } from './constants';
import { renderRoute } from './render-route';

/**
 * Returns whether a click should keep the browser's default navigation behavior.
 * @param {MouseEvent} event
 * @returns {boolean}
 */
function shouldIgnoreClick(event) {
    return event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/**
 * Returns the router link element that was clicked, when one exists.
 * @param {EventTarget | null} target
 * @returns {HTMLAnchorElement | null}
 */
function getClickedRouterLink(target) {
    if (!(target instanceof Element)) {
        return null;
    }

    const link = target.closest(ROUTER_LINK_SELECTOR);

    if (!(link instanceof HTMLAnchorElement)) {
        return null;
    }

    return link;
}

/**
 * Navigates to an internal route and runs the configured route-change effect.
 * @param {URL} url
 */
async function navigateToRoute(url) {
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
    await renderRoute(url.pathname);
}

/**
 * Handles route-link clicks without leaving the single app entry.
 * @param {MouseEvent} event
 */
async function handleRouterLinkClick(event) {
    if (shouldIgnoreClick(event)) {
        return;
    }

    const link = getClickedRouterLink(event.target);

    if (!link) {
        return;
    }

    const url = new URL(link.href);

    if (url.origin !== window.location.origin) {
        return;
    }

    event.preventDefault();

    if (`${url.pathname}${url.search}${url.hash}` === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        return;
    }

    await navigateToRoute(url);
}

/**
 * Initializes browser navigation for internal route links and back/forward events.
 */
export function initRouter() {
    document.addEventListener('click', async (event) => {
        await handleRouterLinkClick(event);
    });

    window.addEventListener('popstate', async () => {
        await renderRoute(window.location.pathname);
    });
}
