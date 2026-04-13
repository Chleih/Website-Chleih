import { TRANSLATION_ATTRIBUTE_MAP, TRANSLATION_KEY_ATTRIBUTE } from './constants';
import { getI18n } from './engine';

/**
 * Applies a text translation to a single element.
 * @param {Element} element
 * @param {import('i18next').i18n} i18n
 */
function applyTextTranslation(element, i18n) {
    const translationKey = element.getAttribute(TRANSLATION_KEY_ATTRIBUTE);

    if (!translationKey) {
        return;
    }

    element.textContent = i18n.t(translationKey);
}

/**
 * Splits a raw attribute binding string into individual bindings.
 * @param {string} attributeMap
 * @returns {string[]}
 */
function getAttributeBindings(attributeMap) {
    const bindings = [];
    const rawBindings = attributeMap.split(';');

    for (const rawBinding of rawBindings) {
        const normalizedBinding = rawBinding.trim();

        if (normalizedBinding) {
            bindings.push(normalizedBinding);
        }
    }

    return bindings;
}

/**
 * Parses a single attribute translation binding.
 * @param {string} binding
 * @returns {{ attributeName: string, translationKey: string } | null}
 */
function parseAttributeBinding(binding) {
    const separatorIndex = binding.indexOf('=');

    if (separatorIndex === -1) {
        return null;
    }

    const attributeName = binding.slice(0, separatorIndex).trim();
    const translationKey = binding.slice(separatorIndex + 1).trim();

    if (!attributeName || !translationKey) {
        return null;
    }

    return {
        attributeName,
        translationKey,
    };
}

/**
 * Applies attribute translations to a single element.
 * @param {Element} element
 * @param {import('i18next').i18n} i18n
 */
function applyAttributeTranslations(element, i18n) {
    const attributeMap = element.getAttribute(TRANSLATION_ATTRIBUTE_MAP);

    if (!attributeMap) {
        return;
    }

    const bindings = getAttributeBindings(attributeMap);

    for (const binding of bindings) {
        const parsedBinding = parseAttributeBinding(binding);

        if (!parsedBinding) {
            continue;
        }

        element.setAttribute(parsedBinding.attributeName, i18n.t(parsedBinding.translationKey));
    }
}

/**
 * Synchronizes all DOM translations for elements that declare i18n bindings.
 */
export function syncTranslations() {
    const i18n = getI18n();
    const textElements = document.querySelectorAll(`[${TRANSLATION_KEY_ATTRIBUTE}]`);
    const attributeElements = document.querySelectorAll(`[${TRANSLATION_ATTRIBUTE_MAP}]`);

    for (const element of textElements) {
        applyTextTranslation(element, i18n);
    }

    for (const element of attributeElements) {
        applyAttributeTranslations(element, i18n);
    }
}
