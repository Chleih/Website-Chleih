import { applyTheme } from './apply-theme';
import { DARK_THEME, LIGHT_THEME } from './constants';
import { setStoredTheme } from './set-stored-theme';
import { updateThemeToggle } from './update-theme-toggle';

/**
 * Returns the single theme toggle button from the DOM.
 * @returns {HTMLButtonElement | null}
 */
function getThemeToggleButton() {
    return document.getElementById('theme-toggle-btn');
}

/**
 * Applies the provided theme, persists it, and synchronizes the toggle UI.
 * @param {'light' | 'dark'} theme
 */
function selectTheme(theme) {
    applyTheme(theme);
    setStoredTheme(theme);
    updateThemeToggle(theme);
}

/**
 * Returns the theme configured as the next theme on the toggle button.
 * @param {HTMLButtonElement} button
 * @returns {'light' | 'dark' | null}
 */
function getNextThemeFromButton(button) {
    const nextTheme = button.dataset.nextTheme;

    if (nextTheme !== LIGHT_THEME && nextTheme !== DARK_THEME) {
        return null;
    }

    return nextTheme;
}

/**
 * Handles a click on the single theme toggle button.
 * @param {Event} event
 */
function handleThemeToggleClick(event) {
    const button = event.currentTarget;

    if (!button) {
        return;
    }

    const nextTheme = getNextThemeFromButton(button);

    if (!nextTheme) {
        return;
    }

    selectTheme(nextTheme);
}

/**
 * Initializes the single theme toggle control.
 */
export function initThemeToggle() {
    const themeToggleButton = getThemeToggleButton();

    if (!themeToggleButton) {
        return;
    }

    if (themeToggleButton.dataset.themeBound === 'true') {
        return;
    }

    themeToggleButton.dataset.themeBound = 'true';
    themeToggleButton.addEventListener('click', handleThemeToggleClick);
}
