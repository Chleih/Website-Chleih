import { FALLBACK_LANGUAGE } from './constants';
import { normalizeLanguage } from './normalize-language';

/**
 * Detects the user's preferred browser language.
 * Falls back to the application's fallback language when no supported
 * browser language can be resolved.
 * @returns {'da' | 'en'}
 */
export function detectBrowserLanguage() {
    try {
        const browserLanguages = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language];

        for (const language of browserLanguages) {
            const normalizedLanguage = normalizeLanguage(language);

            if (normalizedLanguage) {
                return normalizedLanguage;
            }
        }

        return FALLBACK_LANGUAGE;
    } catch {
        return FALLBACK_LANGUAGE;
    }
}
