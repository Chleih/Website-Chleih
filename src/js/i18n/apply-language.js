import { FALLBACK_LANGUAGE } from './config';
import { getI18n } from './engine';
import { syncTranslations } from './sync-translations';

/**
 * Applies the provided language to the application and synchronizes all
 * registered DOM translations.
 * @param {string} language
 * @returns {Promise<string>}
 */
export async function applyLanguage(language) {
    const i18n = getI18n();
    const nextLanguage = language || i18n.resolvedLanguage || i18n.language || FALLBACK_LANGUAGE;

    await i18n.changeLanguage(nextLanguage);

    const activeLanguage = i18n.resolvedLanguage || i18n.language || FALLBACK_LANGUAGE;

    document.documentElement.lang = activeLanguage;
    document.documentElement.dataset.language = activeLanguage;

    syncTranslations();

    return activeLanguage;
}
