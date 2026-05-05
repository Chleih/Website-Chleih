import { initializeApplication } from './initialize-application';
import { initOnDocumentReady } from './init-on-document-ready';

/**
 * Starts the application once the initial document is ready.
 * @returns {void}
 */
export function startApplication() {
    initOnDocumentReady(initializeApplication);
}
