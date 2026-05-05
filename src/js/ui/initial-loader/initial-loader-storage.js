import { INITIAL_LOADER_STORAGE_KEY } from './constants';

let isStorageUnavailable = false;

/**
 * Marks initial-loader storage as unavailable for the current runtime.
 * @returns {void}
 */
function markInitialLoaderStorageUnavailable() {
    isStorageUnavailable = true;
}

/**
 * Returns local storage when it is available for persistence.
 * @returns {Storage | null}
 */
function getInitialLoaderStorage() {
    if (isStorageUnavailable) {
        return null;
    }

    try {
        return window.localStorage;
    } catch {
        markInitialLoaderStorageUnavailable();

        return null;
    }
}

/**
 * Returns whether this browser has already completed the initial loader.
 * @returns {boolean}
 */
export function hasSeenInitialLoader() {
    const storage = getInitialLoaderStorage();

    if (!storage) {
        return false;
    }

    try {
        return storage.getItem(INITIAL_LOADER_STORAGE_KEY) === 'true';
    } catch {
        markInitialLoaderStorageUnavailable();

        return false;
    }
}

/**
 * Persists that this browser has completed the initial loader.
 * @returns {void}
 */
export function markInitialLoaderSeen() {
    const storage = getInitialLoaderStorage();

    if (!storage) {
        return;
    }

    try {
        storage.setItem(INITIAL_LOADER_STORAGE_KEY, 'true');
    } catch {
        markInitialLoaderStorageUnavailable();
    }
}
