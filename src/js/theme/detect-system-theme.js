import { DARK_THEME, LIGHT_THEME } from './constants';

export function detectSystemTheme() {
    try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
    } catch {
        return LIGHT_THEME;
    }
}
