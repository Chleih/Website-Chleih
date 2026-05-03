import homePageTemplate from '../html/pages/home.html?raw';
import '../scss/main.scss';
import { initLanguage } from './i18n';
import { initUi } from './ui';

/**
 * Renders the landing page into the root application entry point.
 */
function renderHomePage() {
    const applicationRoot = document.getElementById('app');

    applicationRoot.innerHTML = homePageTemplate;
}

/**
 * Initializes the application after the DOM is ready.
 */
async function initializeApplication() {
    renderHomePage();

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
