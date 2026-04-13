import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from './config';

const localeModules = import.meta.glob('../../resources/locales/*/*.json');

let i18nInstance = null;
let initPromise = null;

/**
 * Extracts the default export from a dynamically imported locale module.
 * @param {{ default: object }} module
 * @returns {object}
 */
function extractDefaultModuleExport(module) {
    return module.default;
}

/**
 * Builds the locale module path for a language and namespace.
 * @param {string} language
 * @param {string} namespace
 * @returns {string}
 */
function buildLocaleModulePath(language, namespace) {
    return `../../resources/locales/${language}/${namespace}.json`;
}

/**
 * Loads a locale JSON module for the provided language and namespace.
 * @param {string} language
 * @param {string} namespace
 * @returns {Promise<object>}
 */
function loadLocaleModule(language, namespace) {
    const modulePath = buildLocaleModulePath(language, namespace);
    const loader = localeModules[modulePath];

    if (!loader) {
        return Promise.reject(
            new Error(`Missing locale file for language "${language}" and namespace "${namespace}".`),
        );
    }

    return loader().then(extractDefaultModuleExport);
}

/**
 * Resolves the shared i18next instance after initialization.
 * @returns {import('i18next').i18n}
 * @throws {Error} When the i18n instance could not be created.
 */
function resolveInitializedInstance() {
    if (!i18nInstance) {
        throw new Error('The i18n engine failed to initialize.');
    }

    return i18nInstance;
}

/**
 * Returns the initialized shared i18next instance.
 * @returns {import('i18next').i18n}
 * @throws {Error} When the i18n engine has not been initialized yet.
 */
export function getI18n() {
    if (!i18nInstance) {
        throw new Error('The i18n engine has not been initialized yet.');
    }

    return i18nInstance;
}

/**
 * Initializes the shared i18next engine exactly once.
 * @returns {Promise<import('i18next').i18n>}
 */
export function initI18nEngine() {
    if (initPromise) {
        return initPromise;
    }

    i18nInstance = createInstance();

    initPromise = i18nInstance
        .use(LanguageDetector)
        .use(resourcesToBackend(loadLocaleModule))
        .init(i18nConfig)
        .then(resolveInitializedInstance);

    return initPromise;
}
