import {
    INITIAL_LOADER_EXIT_MS,
    INITIAL_LOADER_EXITING_CLASS,
    INITIAL_LOADER_LINE_FALLBACK_MS,
    INITIAL_LOADER_LINE_SELECTOR,
    INITIAL_LOADER_SELECTOR,
    INITIAL_LOADER_VISIBLE_CLASS,
} from './constants';
import { shouldForceInitialLoader } from './initial-loader-environment';
import { hasSeenInitialLoader, markInitialLoaderSeen } from './initial-loader-storage';

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
 * Returns whether the initial loader should be shown.
 * @returns {boolean}
 */
export function shouldShowInitialLoader() {
    return shouldForceInitialLoader() || !hasSeenInitialLoader();
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
    }

    /**
     * Makes the initial loader visible.
     * @returns {void}
     */
    show() {
        this.loaderElement.hidden = false;
        this.loaderElement.classList.add(INITIAL_LOADER_VISIBLE_CLASS);
    }

    /**
     * Waits until the signature line has had enough time to finish drawing.
     * @returns {Promise<void>}
     */
    async waitForSignatureLine() {
        const signatureLine = this.loaderElement.querySelector(INITIAL_LOADER_LINE_SELECTOR);

        if (!(signatureLine instanceof HTMLElement)) {
            return;
        }

        if (typeof signatureLine.getAnimations !== 'function') {
            await delay(INITIAL_LOADER_LINE_FALLBACK_MS);
            return;
        }

        await Promise.allSettled(signatureLine.getAnimations().map((animation) => animation.finished));
    }

    /**
     * Hides the initial loader after its signature animation has completed.
     * @returns {Promise<void>}
     */
    async hide() {
        await this.waitForSignatureLine();

        this.loaderElement.classList.add(INITIAL_LOADER_EXITING_CLASS);
        this.loaderElement.classList.remove(INITIAL_LOADER_VISIBLE_CLASS);

        await delay(INITIAL_LOADER_EXIT_MS);

        this.loaderElement.hidden = true;
        this.loaderElement.classList.remove(INITIAL_LOADER_EXITING_CLASS);
    }
}

/**
 * Creates an initial loader controller when the current browser should see one.
 * @returns {InitialLoaderController | null}
 */
export function createInitialLoader() {
    if (!shouldShowInitialLoader()) {
        return null;
    }

    const loaderElement = document.querySelector(INITIAL_LOADER_SELECTOR);

    if (!(loaderElement instanceof HTMLElement)) {
        return null;
    }

    return new InitialLoaderController(loaderElement);
}

/**
 * Runs an async task while the initial loader is visible.
 * @param {() => void | Promise<void>} task
 * @returns {Promise<void>}
 */
export async function runWithInitialLoader(task) {
    const initialLoader = createInitialLoader();

    initialLoader?.show();

    try {
        await task();
    } finally {
        if (initialLoader) {
            await initialLoader.hide();
        }
    }

    if (initialLoader) {
        markInitialLoaderSeen();
    }
}
