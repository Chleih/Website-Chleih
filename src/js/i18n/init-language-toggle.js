import { applyLanguage } from './apply-language';
import { LANGUAGE_BUTTON_SELECTOR } from './constants';
import { updateLanguageToggle } from './update-language-toggle';

/**
 * Handles a language button click and applies the selected language.
 * @param {Event} event
 * @returns {Promise<void>}
 */
async function handleLanguageButtonClick(event) {
    const button = /** @type {HTMLButtonElement | null} */ (event.currentTarget);

    if (!button) {
        return;
    }

    const selectedLanguage = button.dataset.language;

    if (!selectedLanguage) {
        return;
    }

    const activeLanguage = await applyLanguage(selectedLanguage);
    updateLanguageToggle(activeLanguage);
}

/**
 * Binds the language toggle behavior to a single button once.
 * @param {HTMLButtonElement} button
 * @returns {void}
 */
function bindLanguageButton(button) {
    if (button.dataset.i18nBound === 'true') {
        return;
    }

    button.dataset.i18nBound = 'true';
    button.addEventListener('click', handleLanguageButtonClick);
}

/**
 * Initializes the language toggle controls.
 * @returns {void}
 */
export function initLanguageToggle() {
    const languageButtons = document.querySelectorAll(LANGUAGE_BUTTON_SELECTOR);

    if (!languageButtons.length) {
        return;
    }

    for (const button of languageButtons) {
        bindLanguageButton(/** @type {HTMLButtonElement} */ (button));
    }
}
