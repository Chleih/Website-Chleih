const META_DESCRIPTION_SELECTOR = 'meta[name="description"]';

/**
 * Returns the page description meta element, creating one when needed.
 * @returns {HTMLMetaElement}
 */
function getDescriptionMetaElement() {
    const existingElement = document.querySelector(META_DESCRIPTION_SELECTOR);

    if (existingElement instanceof HTMLMetaElement) {
        return existingElement;
    }

    const metaElement = document.createElement('meta');

    metaElement.name = 'description';
    document.head.append(metaElement);

    return metaElement;
}

/**
 * Synchronizes document-level metadata with the rendered route.
 * @param {import('./types').RouteDefinition} route
 * @returns {void}
 */
export function syncRouteDocumentMetadata(route) {
    document.title = route.title;
    getDescriptionMetaElement().content = route.description;
}

/**
 * Moves focus to the route outlet after client-side navigation.
 * @param {HTMLElement} routerOutlet
 * @returns {void}
 */
export function focusRouteContent(routerOutlet) {
    routerOutlet.focus({ preventScroll: true });
}
