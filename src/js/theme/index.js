import { bootstrapTheme } from './bootstrap-theme';
import { initThemeToggle } from './init-theme-toggle';
import { updateThemeToggle } from './update-theme-toggle';

/**
 * Initializes the theme system for the application.
 * Applies the initial theme, updates the toggle UI to match
 * the active theme, and registers the theme toggle interactions.
 * @returns {void}
 */
export function initTheme() {
    const activeTheme = bootstrapTheme();

    updateThemeToggle(activeTheme);
    initThemeToggle();
}
