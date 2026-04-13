import { SUPPORTED_LANGUAGES } from './constants';

/**
 * Normalizes a language value into one of the supported application languages.
 * Examples:
 * - "en" -> "en"
 * - "en-GB" -> "en"
 * - "da-DK" -> "da"
 * @param {string | null | undefined} language
 * @returns {'da' | 'en' | null}
 */
export function normalizeLanguage(language) {
    if (typeof language !== 'string') {
        return null;
    }

    const normalizedLanguage = language.trim().toLowerCase();
    const [baseLanguage] = normalizedLanguage.split('-');

    return SUPPORTED_LANGUAGES.includes(baseLanguage) ? baseLanguage : null;
}
