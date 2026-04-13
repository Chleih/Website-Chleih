import { LANGUAGE_STORAGE_KEY } from './constants';
import { normalizeLanguage } from './normalize-language';

/**
 * Stores the user's selected language in localStorage.
 * @param {string} language
 */
export function setStoredLanguage(language) {
    const normalizedLanguage = normalizeLanguage(language);

    if (!normalizedLanguage) {
        return;
    }

    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
    } catch {
        // Intentionally ignored.
    }
}
