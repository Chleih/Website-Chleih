import { DARK_THEME, LIGHT_THEME } from './constants';

/**
 * Detects the user's system theme preference in terms of theme.
 * Falls back to light mode if detection is not supported or fails.
 * @returns {'light' | 'dark'} The detected system theme.
 */
export function detectSystemTheme() {
    try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
    } catch {
        return LIGHT_THEME;
    }
}
