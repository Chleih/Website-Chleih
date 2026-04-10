import { DARK_THEME, LIGHT_THEME } from './constants';

/**
 * Applies the provided theme to the root HTML element.
 * Removes any previously applied theme classes and adds the new one.
 * @param {'light' | 'dark'} theme - The theme to apply.
 */
export function applyTheme(theme) {
    const root = document.documentElement;

    root.classList.remove(`${LIGHT_THEME}-mode`, `${DARK_THEME}-mode`);
    root.classList.add(`${theme}-mode`);
}
