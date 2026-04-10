import { DARK_THEME, LIGHT_THEME } from './constants';

export function applyTheme(theme) {
    const root = document.documentElement;

    root.classList.remove(`${LIGHT_THEME}-mode`, `${DARK_THEME}-mode`);
    root.classList.add(`${theme}-mode`);
}
