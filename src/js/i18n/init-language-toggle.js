import { applyLanguage } from './apply-language';
import { LANGUAGE_BUTTON_SELECTOR } from './constants';
import { normalizeLanguage } from './normalize-language';
import { setStoredLanguage } from './set-stored-language';
import { updateLanguageToggle } from './update-language-toggle';

/**
 * Initializes the language toggle controls.
 * Adds click handlers to all language option buttons.
 */
export function initLanguageToggle() {
    const languageButtons = document.querySelectorAll(LANGUAGE_BUTTON_SELECTOR);

    if (!languageButtons.length) {
        return;
    }

    languageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedLanguage = normalizeLanguage(button.dataset.language);

            if (!selectedLanguage) {
                return;
            }

            applyLanguage(selectedLanguage);
            setStoredLanguage(selectedLanguage);
            updateLanguageToggle(selectedLanguage);
        });
    });
}
