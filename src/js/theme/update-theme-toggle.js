import { DARK_THEME, LIGHT_THEME } from './constants';

/**
 * Updates the visual state of the theme toggle controls.
 * Shows the filled icon for the currently active theme
 * and the outlined icon for the inactive theme.
 * @param {'light' | 'dark'} activeTheme - The currently active theme.
 */
export function updateThemeToggle(activeTheme) {
    const lightBtn = document.getElementById('light-mode-btn');
    const darkBtn = document.getElementById('dark-mode-btn');

    const lightActive = activeTheme === LIGHT_THEME;
    const darkActive = activeTheme === DARK_THEME;

    lightBtn.querySelector('.bi-square')?.style.setProperty('display', lightActive ? 'none' : 'inline-block');
    lightBtn.querySelector('.bi-square-fill')?.style.setProperty('display', lightActive ? 'inline-block' : 'none');

    darkBtn.querySelector('.bi-square')?.style.setProperty('display', darkActive ? 'none' : 'inline-block');
    darkBtn.querySelector('.bi-square-fill')?.style.setProperty('display', darkActive ? 'inline-block' : 'none');
}
