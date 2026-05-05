import { FALLBACK_LANGUAGE } from './config';
import { LANGUAGE_BUTTON_SELECTOR } from './constants';
import { getI18n } from './engine';

/**
 * Updates the visual and accessibility state of a single language button.
 * @param {HTMLButtonElement} button
 * @param {string} activeLanguage
 * @returns {void}
 */
function updateLanguageButtonState(button, activeLanguage) {
    const buttonLanguage = button.dataset.language;
    const isActive = buttonLanguage === activeLanguage;

    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
    button.dataset.active = String(isActive);
}

/**
 * Updates the visual and accessibility state of the language toggle controls.
 * @param {string} [activeLanguage]
 * @returns {void}
 */
export function updateLanguageToggle(activeLanguage) {
    const languageButtons = document.querySelectorAll(LANGUAGE_BUTTON_SELECTOR);

    if (!languageButtons.length) {
        return;
    }

    const i18n = getI18n();
    const resolvedLanguage = activeLanguage || i18n.resolvedLanguage || i18n.language || FALLBACK_LANGUAGE;

    for (const button of languageButtons) {
        updateLanguageButtonState(/** @type {HTMLButtonElement} */ (button), resolvedLanguage);
    }
}
