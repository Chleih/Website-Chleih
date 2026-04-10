import { DARK_THEME, LIGHT_THEME, THEME_STORAGE_KEY } from './constants';

export function getStoredTheme() {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme === LIGHT_THEME || theme === DARK_THEME ? theme : null;
}
