import { applyLanguage } from './apply-language';
import { DEFAULT_SITE_NAMESPACES, FALLBACK_LANGUAGE } from './config';
import { getI18n, initI18nEngine } from './engine';
import { initLanguageToggle } from './init-language-toggle';
import { loadRequiredNamespaces } from './load-required-namespaces';
import { updateLanguageToggle } from './update-language-toggle';

/**
 * Initializes the i18n system for the application.
 * This initializes the shared engine, loads the required namespaces,
 * applies the initial language, and wires the language toggle UI.
 * @param {string[]} [namespaces=DEFAULT_SITE_NAMESPACES]
 * @returns {Promise<string>}
 */
export async function initLanguage(namespaces = DEFAULT_SITE_NAMESPACES) {
    await initI18nEngine();
    await loadRequiredNamespaces(namespaces);

    const i18n = getI18n();
    const initialLanguage = i18n.resolvedLanguage || i18n.language || FALLBACK_LANGUAGE;
    const activeLanguage = await applyLanguage(initialLanguage);

    initLanguageToggle();
    updateLanguageToggle(activeLanguage);

    return activeLanguage;
}
