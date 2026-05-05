import {
    HOME_PATH,
    INITIAL_LOADER_EXIT_MS,
    INITIAL_LOADER_EXITING_CLASS,
    INITIAL_LOADER_MIN_VISIBLE_MS,
    INITIAL_LOADER_SELECTOR,
    INITIAL_LOADER_VISIBLE_CLASS,
} from './constants';

/**
 * Resolves after the provided duration.
 * @param {number} duration
 * @returns {Promise<void>}
 */
function delay(duration) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, duration);
    });
}

/**
 * Normalizes a pathname for route matching.
 * @param {string} pathname
 * @returns {string}
 */
function normalizePathname(pathname) {
    const normalizedPathname = pathname.replace(/\/+$/, '');

    return normalizedPathname || HOME_PATH;
}

/**
 * Test strategy: show on every full page load of the landing page.
 * Later this can be replaced with a first-visit/session strategy without
 * changing application startup.
 * @param {string} pathname
 * @returns {boolean}
 */
function shouldShowInitialLoader(pathname) {
    return normalizePathname(pathname) === HOME_PATH;
}

/**
 * Controls the visibility lifecycle for the initial page loader.
 */
export class InitialLoaderController {
    /**
     * Creates a controller for the provided initial loader element.
     * @param {HTMLElement} loaderElement
     */
    constructor(loaderElement) {
        this.loaderElement = loaderElement;
        this.startedAt = 0;
    }

    /**
     * Makes the initial loader visible and starts the minimum-duration timer.
     * @returns {void}
     */
    show() {
        this.startedAt = window.performance.now();
        this.loaderElement.hidden = false;
        this.loaderElement.classList.add(INITIAL_LOADER_VISIBLE_CLASS);
    }

    /**
     * Hides the initial loader after its minimum visible duration has elapsed.
     * @returns {Promise<void>}
     */
    async hide() {
        const elapsed = window.performance.now() - this.startedAt;
        const remainingDuration = Math.max(INITIAL_LOADER_MIN_VISIBLE_MS - elapsed, 0);

        await delay(remainingDuration);

        this.loaderElement.classList.add(INITIAL_LOADER_EXITING_CLASS);
        this.loaderElement.classList.remove(INITIAL_LOADER_VISIBLE_CLASS);

        await delay(INITIAL_LOADER_EXIT_MS);

        this.loaderElement.hidden = true;
        this.loaderElement.classList.remove(INITIAL_LOADER_EXITING_CLASS);
    }
}

/**
 * Creates an initial loader controller when the current route should show one.
 * @param {string} pathname
 * @returns {InitialLoaderController | null}
 */
export function createInitialLoader(pathname) {
    if (!shouldShowInitialLoader(pathname)) {
        return null;
    }

    const loaderElement = document.querySelector(INITIAL_LOADER_SELECTOR);

    if (!(loaderElement instanceof HTMLElement)) {
        return null;
    }

    return new InitialLoaderController(loaderElement);
}

/**
 * Runs an async task while the initial loader is visible for the active route.
 * @param {string} pathname
 * @param {() => void | Promise<void>} task
 * @returns {Promise<void>}
 */
export async function runWithInitialLoader(pathname, task) {
    const initialLoader = createInitialLoader(pathname);

    initialLoader?.show();

    try {
        await task();
    } finally {
        await initialLoader?.hide();
    }
}
