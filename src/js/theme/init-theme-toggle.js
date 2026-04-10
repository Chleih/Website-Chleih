import { applyTheme } from './apply-theme';
import { DARK_THEME, LIGHT_THEME } from './constants';
import { setStoredTheme } from './set-stored-theme';
import { updateThemeToggle } from './update-theme-toggle';

export function initThemeToggle() {
    const lightBtn = document.getElementById('light-mode-btn');
    const darkBtn = document.getElementById('dark-mode-btn');

    lightBtn.addEventListener('click', () => {
        applyTheme(LIGHT_THEME);
        setStoredTheme(LIGHT_THEME);
        updateThemeToggle(LIGHT_THEME);
    });

    darkBtn.addEventListener('click', () => {
        applyTheme(DARK_THEME);
        setStoredTheme(DARK_THEME);
        updateThemeToggle(DARK_THEME);
    });
}
