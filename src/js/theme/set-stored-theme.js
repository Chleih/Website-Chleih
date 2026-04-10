import { THEME_STORAGE_KEY } from './constants';

export function setStoredTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}
