import { bootstrapLanguage } from './bootstrap-language';
import { initLanguageToggle } from './init-language-toggle';
import { updateLanguageToggle } from './update-language-toggle';

/**
 * Initializes the i18n system for the application.
 * Applies the initial language, updates the toggle UI,
 * and registers the language toggle interactions.
 * @returns {'da' | 'en'}
 */
export function initLanguage() {
    const activeLanguage = bootstrapLanguage();

    updateLanguageToggle(activeLanguage);
    initLanguageToggle();

    return activeLanguage;
}
