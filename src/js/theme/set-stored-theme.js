import { THEME_STORAGE_KEY } from './constants';

/**
 * Stores the user's selected theme in localStorage.
 * @param {'light' | 'dark'} theme - The theme to persist.
 */
export function setStoredTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}
