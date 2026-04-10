import { bootstrapTheme } from './bootstrap-theme';
import { initThemeToggle } from './init-theme-toggle';
import { updateThemeToggle } from './update-theme-toggle';

export function initTheme() {
    const activeTheme = bootstrapTheme();

    updateThemeToggle(activeTheme);
    initThemeToggle();
}
