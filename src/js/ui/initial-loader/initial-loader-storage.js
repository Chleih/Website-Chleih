import { createSafeStorage } from '../../browser/safe-storage';
import { INITIAL_LOADER_STORAGE_KEY } from './constants';

const initialLoaderStorage = createSafeStorage(() => window.localStorage);

/**
 * Returns whether this browser has already completed the initial loader.
 * @returns {boolean}
 */
export function hasSeenInitialLoader() {
    return initialLoaderStorage.getItem(INITIAL_LOADER_STORAGE_KEY) === 'true';
}

/**
 * Persists that this browser has completed the initial loader.
 * @returns {void}
 */
export function markInitialLoaderSeen() {
    initialLoaderStorage.setItem(INITIAL_LOADER_STORAGE_KEY, 'true');
}
