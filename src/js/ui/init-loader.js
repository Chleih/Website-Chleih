import {
    CONTENT_HIDDEN_CLASS,
    CONTENT_VISIBLE_CLASS,
    FIRST_VISIT_STORAGE_KEY,
    LOADER_VISIBLE_CLASS,
} from './constants';

function showMainContent(mainContent) {
    mainContent.classList.remove(CONTENT_HIDDEN_CLASS);
    mainContent.classList.add(CONTENT_VISIBLE_CLASS);
}

function showLoader(loadingScreen) {
    loadingScreen.classList.add(LOADER_VISIBLE_CLASS);
}

function hideLoader(loadingScreen) {
    loadingScreen.classList.remove(LOADER_VISIBLE_CLASS);
}

export function initLoader() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.querySelector('.content-wrapper-container');

    const urlParams = new URLSearchParams(window.location.search);
    const isTestingMode = urlParams.get('testing') === 'true';
    const isFirstVisit = !localStorage.getItem(FIRST_VISIT_STORAGE_KEY);

    showLoader(loadingScreen);

    if (isFirstVisit || isTestingMode) {
        localStorage.setItem(FIRST_VISIT_STORAGE_KEY, 'true');

        window.setTimeout(() => {
            hideLoader(loadingScreen);

            window.setTimeout(() => {
                showMainContent(mainContent);
            }, 500);
        }, 1000);

        return;
    }

    loadingScreen.classList.remove(LOADER_VISIBLE_CLASS);
    showMainContent(mainContent);
}
