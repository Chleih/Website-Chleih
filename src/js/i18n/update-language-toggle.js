import { LANGUAGE_BUTTON_SELECTOR } from './constants';
import { normalizeLanguage } from './normalize-language';

/**
 * Updates the visual and accessibility state of the language toggle controls.
 * @param {string} activeLanguage
 */
export function updateLanguageToggle(activeLanguage) {
    const languageButtons = document.querySelectorAll(LANGUAGE_BUTTON_SELECTOR);

    if (!languageButtons.length) {
        return;
    }

    languageButtons.forEach((button) => {
        const buttonLanguage = normalizeLanguage(button.dataset.language);
        const isActive = buttonLanguage === activeLanguage;

        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
        button.dataset.active = String(isActive);
    });
}
