import { DARK_THEME, LIGHT_THEME } from './constants';

/**
 * Returns the single theme toggle button from the DOM.
 * @returns {HTMLButtonElement | null}
 */
function getThemeToggleButton() {
    return document.getElementById('theme-toggle-btn');
}

/**
 * Returns a child element inside the theme toggle button.
 * @param {HTMLButtonElement} button
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
function getToggleChildElement(button, selector) {
    return button.querySelector(selector);
}

/**
 * Sets whether an element should be hidden.
 * @param {HTMLElement | null} element
 * @param {boolean} hidden
 */
function setHiddenState(element, hidden) {
    if (!element) {
        return;
    }

    element.hidden = hidden;
}

/**
 * Updates which icon is shown in the theme toggle button.
 * @param {HTMLButtonElement} button
 * @param {'light' | 'dark'} activeTheme
 */
function updateThemeToggleIcon(button, activeTheme) {
    const moonIcon = getToggleChildElement(button, '.theme-toggle-btn__icon--moon');
    const sunIcon = getToggleChildElement(button, '.theme-toggle-btn__icon--sun');

    const showMoonIcon = activeTheme === LIGHT_THEME;
    const showSunIcon = activeTheme === DARK_THEME;

    setHiddenState(moonIcon, !showMoonIcon);
    setHiddenState(sunIcon, !showSunIcon);
}

/**
 * Updates which accessible label is exposed by the theme toggle button.
 * @param {HTMLButtonElement} button
 * @param {'light' | 'dark'} activeTheme
 */
function updateThemeToggleLabel(button, activeTheme) {
    const darkModeLabel = getToggleChildElement(button, '.theme-toggle-btn__label--dark');
    const lightModeLabel = getToggleChildElement(button, '.theme-toggle-btn__label--light');

    const showDarkModeLabel = activeTheme === LIGHT_THEME;
    const showLightModeLabel = activeTheme === DARK_THEME;

    setHiddenState(darkModeLabel, !showDarkModeLabel);
    setHiddenState(lightModeLabel, !showLightModeLabel);
}

/**
 * Returns the next theme that should be applied when the button is clicked.
 * @param {'light' | 'dark'} activeTheme
 * @returns {'light' | 'dark'}
 */
function getNextTheme(activeTheme) {
    return activeTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
}

/**
 * Updates the visual and accessibility state of the single theme toggle button.
 * @param {'light' | 'dark'} activeTheme
 */
export function updateThemeToggle(activeTheme) {
    const themeToggleButton = getThemeToggleButton();

    if (!themeToggleButton) {
        return;
    }

    const nextTheme = getNextTheme(activeTheme);
    const isDarkThemeActive = activeTheme === DARK_THEME;

    themeToggleButton.classList.toggle('is-active', isDarkThemeActive);
    themeToggleButton.setAttribute('aria-pressed', String(isDarkThemeActive));
    themeToggleButton.dataset.active = String(isDarkThemeActive);
    themeToggleButton.dataset.nextTheme = nextTheme;

    updateThemeToggleIcon(themeToggleButton, activeTheme);
    updateThemeToggleLabel(themeToggleButton, activeTheme);
}
