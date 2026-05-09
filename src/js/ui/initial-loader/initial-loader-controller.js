import {
    INITIAL_LOADER_ACTIVE_ROOT_CLASS,
    INITIAL_LOADER_ANIMATION_FALLBACK_MS,
    INITIAL_LOADER_ANIMATION_SELECTOR,
    INITIAL_LOADER_EXIT_MS,
    INITIAL_LOADER_EXITING_CLASS,
    INITIAL_LOADER_MIN_VISIBLE_MS,
    INITIAL_LOADER_SELECTOR,
    INITIAL_LOADER_VISIBLE_CLASS,
} from './constants';
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
 * Returns finite animations from an element and its children.
 * @param {HTMLElement} animationRoot
 * @returns {Animation[]}
 */
function getFiniteAnimations(animationRoot) {
    return animationRoot
        .getAnimations({ subtree: true })
        .filter((animation) => animation.effect?.getTiming().iterations !== Infinity);
}

/**
 * Returns whether the browser should run the first-entry loader experience.
 * @returns {boolean}
 */
export function shouldRunInitialEntryExperience() {
    return !hasSeenInitialLoader();
}

/**
 * Returns whether the initial loader should be shown.
 * @returns {boolean}
 */
function shouldShowInitialLoader() {
    return shouldRunInitialEntryExperience();
}

/**
 * Controls the visibility lifecycle for the initial page loader.
 */
class InitialLoaderController {
    /**
     * Creates a controller for the provided initial loader element.
     * @param {HTMLElement} loaderElement
     */
    constructor(loaderElement) {
        this.loaderElement = loaderElement;
        this.startedAt = 0;
    }

    /**
     * Marks the document as being behind the initial loader.
     * @returns {void}
     */
    activatePageAnimationGate() {
        document.documentElement.classList.add(INITIAL_LOADER_ACTIVE_ROOT_CLASS);
    }

    /**
     * Allows deferred page entrance animations to start.
     * @returns {void}
     */
    releasePageAnimationGate() {
        document.documentElement.classList.remove(INITIAL_LOADER_ACTIVE_ROOT_CLASS);
    }

    /**
     * Makes the initial loader visible.
     * @returns {void}
     */
    show() {
        this.startedAt = window.performance.now();
        this.activatePageAnimationGate();
        this.loaderElement.hidden = false;
        this.loaderElement.classList.add(INITIAL_LOADER_VISIBLE_CLASS);
    }

    /**
     * Waits until the blueprint animation sequence has completed.
     * @returns {Promise<void>}
     */
    async waitForBlueprintAnimation() {
        const animationRoot = this.loaderElement.querySelector(INITIAL_LOADER_ANIMATION_SELECTOR);

        if (!(animationRoot instanceof HTMLElement)) {
            return;
        }

        if (typeof animationRoot.getAnimations !== 'function') {
            await delay(INITIAL_LOADER_ANIMATION_FALLBACK_MS);
            return;
        }

        await Promise.allSettled(getFiniteAnimations(animationRoot).map((animation) => animation.finished));
    }

    /**
     * Waits until the loader has been visible long enough to feel intentional.
     * @returns {Promise<void>}
     */
    async waitForMinimumVisibleDuration() {
        const elapsed = window.performance.now() - this.startedAt;
        const remainingDuration = Math.max(INITIAL_LOADER_MIN_VISIBLE_MS - elapsed, 0);

        await delay(remainingDuration);
    }

    /**
     * Hides the initial loader after its blueprint animation has completed.
     * @returns {Promise<void>}
     */
    async hide() {
        await Promise.all([this.waitForBlueprintAnimation(), this.waitForMinimumVisibleDuration()]);

        this.loaderElement.classList.add(INITIAL_LOADER_EXITING_CLASS);
        this.loaderElement.classList.remove(INITIAL_LOADER_VISIBLE_CLASS);

        await delay(INITIAL_LOADER_EXIT_MS);

        this.loaderElement.hidden = true;
        this.loaderElement.classList.remove(INITIAL_LOADER_EXITING_CLASS);
        this.releasePageAnimationGate();
    }
}

/**
 * Creates an initial loader controller when the current browser should see one.
 * @returns {InitialLoaderController | null}
 */
function createInitialLoader() {
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
