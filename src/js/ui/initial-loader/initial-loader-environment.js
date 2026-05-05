import { INITIAL_LOADER_DEVELOPMENT_HOSTS } from './constants';

/**
 * Returns whether the current runtime is a local development host.
 * @returns {boolean}
 */
function isInitialLoaderDevelopmentHost() {
    return INITIAL_LOADER_DEVELOPMENT_HOSTS.includes(window.location.hostname);
}

/**
 * Returns whether the initial loader should be forced for development testing.
 * @returns {boolean}
 */
export function shouldForceInitialLoader() {
    return isInitialLoaderDevelopmentHost();
}
