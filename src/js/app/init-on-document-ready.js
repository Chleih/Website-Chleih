/**
 * Creates the DOM-ready listener that runs the provided initializer.
 * @param {() => void | Promise<void>} initializer
 * @returns {() => Promise<void>}
 */
function createDocumentReadyListener(initializer) {
    /**
     * Handles DOM readiness by delegating to the application initializer.
     * @returns {Promise<void>}
     */
    return async function handleDocumentReady() {
        await initializer();
    };
}

/**
 * Runs an initializer once the initial document is ready.
 * @param {() => void | Promise<void>} initializer
 * @returns {void}
 */
export function initOnDocumentReady(initializer) {
    document.addEventListener(
        'DOMContentLoaded',
        createDocumentReadyListener(initializer),
        { once: true },
    );
}
