import { FALLBACK_LANGUAGE } from './constants';
import { normalizeLanguage } from './normalize-language';
import { translatePage } from './translate-page';

/**
 * Applies the provided language to the document.
 * Updates the <html> language attribute and translates the page content.
 * @param {string} language
 * @returns {'da' | 'en'}
 */
export function applyLanguage(language) {
    const activeLanguage = normalizeLanguage(language) ?? FALLBACK_LANGUAGE;
    const root = document.documentElement;

    root.lang = activeLanguage;
    root.dataset.language = activeLanguage;

    translatePage(activeLanguage);

    return activeLanguage;
}
