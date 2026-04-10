import { applyTheme } from './apply-theme';
import { detectSystemTheme } from './detect-system-theme';
import { getStoredTheme } from './get-stored-theme';

/**
 * Resolves and applies the initial theme when the application starts.
 * Priority:
 * 1. Stored user preference
 * 2. System theme preference
 *
 * Applies the resolved theme to the document and returns it.
 * @returns {'light' | 'dark'} The active theme that was applied.
 */
export function bootstrapTheme() {
    const storedTheme = getStoredTheme();
    const activeTheme = storedTheme ?? detectSystemTheme();

    applyTheme(activeTheme);

    return activeTheme;
}
