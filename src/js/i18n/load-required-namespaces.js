import { getI18n, initI18nEngine } from './engine';

/**
 * Returns a deduplicated list of non-empty namespace names.
 * @param {string[]} namespaces
 * @returns {string[]}
 */
function getUniqueNamespaces(namespaces) {
    const uniqueNamespaces = [];
    const seenNamespaces = new Set();

    for (const namespace of namespaces) {
        if (!namespace || seenNamespaces.has(namespace)) {
            continue;
        }

        seenNamespaces.add(namespace);
        uniqueNamespaces.push(namespace);
    }

    return uniqueNamespaces;
}

/**
 * Returns the namespaces that have not yet been loaded by i18next.
 * @param {import('i18next').i18n} i18n
 * @param {string[]} namespaces
 * @returns {string[]}
 */
function getNamespacesToLoad(i18n, namespaces) {
    const namespacesToLoad = [];

    for (const namespace of namespaces) {
        if (!i18n.hasLoadedNamespace(namespace)) {
            namespacesToLoad.push(namespace);
        }
    }

    return namespacesToLoad;
}

/**
 * Ensures that the provided namespaces are loaded into the shared i18n engine.
 * @param {string[]} [namespaces=[]]
 * @returns {Promise<void>}
 */
export async function loadRequiredNamespaces(namespaces = []) {
    await initI18nEngine();

    const i18n = getI18n();
    const uniqueNamespaces = getUniqueNamespaces(namespaces);

    if (!uniqueNamespaces.length) {
        return;
    }

    const namespacesToLoad = getNamespacesToLoad(i18n, uniqueNamespaces);

    if (!namespacesToLoad.length) {
        return;
    }

    await i18n.loadNamespaces(namespacesToLoad);
}
