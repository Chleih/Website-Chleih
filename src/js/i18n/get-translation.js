import { FALLBACK_LANGUAGE } from './constants';
import { normalizeLanguage } from './normalize-language';
import { translations } from './translations';

function getNestedValue(object, key) {
    return key.split('.').reduce((currentValue, currentKeyPart) => {
        if (currentValue && typeof currentValue === 'object' && currentKeyPart in currentValue) {
            return currentValue[currentKeyPart];
        }

        return undefined;
    }, object);
}

/**
 * Resolves a translation value for a given language and key.
 * Falls back to the fallback language if the key is missing.
 * Returns the key itself if no translation is found.
 * @param {string} language
 * @param {string} key
 * @returns {string}
 */
export function getTranslation(language, key) {
    const normalizedLanguage = normalizeLanguage(language) ?? FALLBACK_LANGUAGE;
    const currentLanguageTranslations = translations[normalizedLanguage];
    const fallbackLanguageTranslations = translations[FALLBACK_LANGUAGE];

    const translatedValue =
        getNestedValue(currentLanguageTranslations, key) ?? getNestedValue(fallbackLanguageTranslations, key);

    if (typeof translatedValue === 'string') {
        return translatedValue;
    }

    if (import.meta.env.DEV) {
        console.warn(`Missing translation for key "${key}" in language "${normalizedLanguage}".`);
    }

    return key;
}
