import { LANGUAGE_STORAGE_KEY } from './constants';
import { normalizeLanguage } from './normalize-language';

/**
 * Retrieves the user's stored language preference from localStorage.
 * @returns {'da' | 'en' | null}
 */
export function getStoredLanguage() {
    try {
        const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return normalizeLanguage(storedLanguage);
    } catch {
        return null;
    }
}
