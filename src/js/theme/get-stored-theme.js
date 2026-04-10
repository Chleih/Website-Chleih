import { DARK_THEME, LIGHT_THEME, THEME_STORAGE_KEY } from './constants';

/**
 * Retrieves the user's stored theme preference from localStorage.
 * @returns {'light' | 'dark' | null} The stored theme or null if not found.
 */
export function getStoredTheme() {
    // TODO: We might simply be able to return the theme here
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme === LIGHT_THEME || theme === DARK_THEME ? theme : null;
}
