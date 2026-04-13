import { applyLanguage } from './apply-language';
import { detectBrowserLanguage } from './detect-browser-language';
import { getStoredLanguage } from './get-stored-language';

/**
 * Resolves and applies the initial language when the application starts.
 * @returns {'da' | 'en'}
 */
export function bootstrapLanguage() {
    const storedLanguage = getStoredLanguage();
    const activeLanguage = storedLanguage ?? detectBrowserLanguage();

    applyLanguage(activeLanguage);

    return activeLanguage;
}
