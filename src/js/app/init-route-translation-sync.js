import { syncTranslations } from '../i18n/sync-translations';
import { ROUTE_CHANGED_EVENT } from '../router';

/**
 * Keeps translated route content synchronized after router navigation.
 * @returns {void}
 */
export function initRouteTranslationSync() {
    document.addEventListener(ROUTE_CHANGED_EVENT, syncTranslations);
}
