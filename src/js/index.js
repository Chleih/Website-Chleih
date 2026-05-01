import '../scss/main.scss';
import { initLanguage } from './i18n';
import { initUi } from './ui';

/**
 * Initializes the application after the DOM is ready.
 */
async function initializeApplication() {
    await initLanguage();
    initUi();
}

/**
 * Registers the application bootstrap on DOMContentLoaded.
 */
function registerApplicationBootstrap() {
    document.addEventListener('DOMContentLoaded', async () => {
        await initializeApplication();
    });
}

registerApplicationBootstrap();
