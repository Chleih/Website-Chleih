/**
 * Builds a browser route address from URL parts.
 * @param {string} pathname
 * @param {string} [search]
 * @param {string} [hash]
 * @returns {string}
 */
export function createRouteAddress(pathname, search = '', hash = '') {
    return `${pathname}${search}${hash}`;
}
