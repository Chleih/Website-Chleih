import notFoundTemplate from '../../html/pages/not-found.html?raw';

const HOSTING_NOT_FOUND_ROOT_SELECTOR = '[data-hosting-not-found-root]';

/**
 * Renders the shared not-found fragment into the hosting fallback shell.
 * @returns {void}
 */
export function renderHostingNotFoundPage() {
    const rootElement = document.querySelector(HOSTING_NOT_FOUND_ROOT_SELECTOR);

    if (!(rootElement instanceof HTMLElement)) {
        return;
    }

    rootElement.innerHTML = notFoundTemplate;
}
