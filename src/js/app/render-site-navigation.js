import { getRequiredElement } from '../dom/required-element';
import { navigationPageDefinitions } from '../router/page-definitions';
import { SITE_NAVIGATION_LIST_SELECTOR } from '../router/constants';

/**
 * Creates a router-enabled navigation link for a page definition.
 * @param {{path: string, label: string}} pageDefinition
 * @returns {HTMLAnchorElement}
 */
function createNavigationLink(pageDefinition) {
    const link = document.createElement('a');

    link.classList.add('site-navigation__link');
    link.href = pageDefinition.path;
    link.textContent = pageDefinition.label;
    link.dataset.routerLink = '';

    return link;
}

/**
 * Creates a navigation list item for a page definition.
 * @param {{path: string, label: string}} pageDefinition
 * @returns {HTMLLIElement}
 */
function createNavigationItem(pageDefinition) {
    const item = document.createElement('li');

    item.classList.add('site-navigation__item');
    item.append(createNavigationLink(pageDefinition));

    return item;
}

/**
 * Renders primary navigation from route page definitions.
 * @param {ParentNode} root
 * @returns {void}
 */
export function renderSiteNavigation(root) {
    const navigationList = getRequiredElement(root, SITE_NAVIGATION_LIST_SELECTOR, HTMLUListElement);

    navigationList.replaceChildren(...navigationPageDefinitions.map(createNavigationItem));
}
