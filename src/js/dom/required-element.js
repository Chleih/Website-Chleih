/**
 * Returns a required element or throws with a clear selector-specific error.
 * @template {Element} T
 * @param {ParentNode} root
 * @param {string} selector
 * @param {new (...args: never[]) => T} elementType
 * @returns {T}
 */
export function getRequiredElement(root, selector, elementType) {
    const element = root.querySelector(selector);

    if (!(element instanceof elementType)) {
        throw new Error(`Required element "${selector}" was not found.`);
    }

    return element;
}

/**
 * Returns a required element by id or throws with a clear id-specific error.
 * @param {string} id
 * @returns {HTMLElement}
 */
export function getRequiredElementById(id) {
    const element = document.getElementById(id);

    if (!(element instanceof HTMLElement)) {
        throw new Error(`Required element with id "${id}" was not found.`);
    }

    return element;
}
