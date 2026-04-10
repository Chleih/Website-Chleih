import { applyTheme } from './apply-theme';
import { detectSystemTheme } from './detect-system-theme';
import { getStoredTheme } from './get-stored-theme';

export function bootstrapTheme() {
    const storedTheme = getStoredTheme();
    const activeTheme = storedTheme ?? detectSystemTheme();

    applyTheme(activeTheme);

    return activeTheme;
}
