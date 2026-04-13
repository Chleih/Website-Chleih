import { COMMON_NAMESPACE, SITE_NAMESPACES } from './constants';

export const SUPPORTED_LANGUAGES = ['da', 'en'];
export const FALLBACK_LANGUAGE = 'en';
export const LANGUAGE_STORAGE_KEY = 'website-language';

export const DEFAULT_SITE_NAMESPACES = SITE_NAMESPACES;

export const i18nConfig = {
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: FALLBACK_LANGUAGE,
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    defaultNS: COMMON_NAMESPACE,
    fallbackNS: COMMON_NAMESPACE,
    ns: [],
    partialBundledLanguages: true,
    resources: {},
    interpolation: {
        escapeValue: false,
    },
    returnEmptyString: false,
    debug: import.meta.env.DEV,
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: LANGUAGE_STORAGE_KEY,
        htmlTag: document.documentElement,
    },
};
