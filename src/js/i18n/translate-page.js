import { TRANSLATION_ATTRIBUTE_MAP, TRANSLATION_KEY_ATTRIBUTE } from './constants';
import { getTranslation } from './get-translation';

function applyTextTranslation(element, language) {
    const translationKey = element.getAttribute(TRANSLATION_KEY_ATTRIBUTE);

    if (!translationKey) {
        return;
    }

    element.textContent = getTranslation(language, translationKey);
}

function applyAttributeTranslations(element, language) {
    const attributeMap = element.getAttribute(TRANSLATION_ATTRIBUTE_MAP);

    if (!attributeMap) {
        return;
    }

    const attributeEntries = attributeMap
        .split(';')
        .map((entry) => entry.trim())
        .filter(Boolean);

    for (const entry of attributeEntries) {
        const separatorIndex = entry.indexOf(':');

        if (separatorIndex === -1) {
            continue;
        }

        const attributeName = entry.slice(0, separatorIndex).trim();
        const translationKey = entry.slice(separatorIndex + 1).trim();

        if (!attributeName || !translationKey) {
            continue;
        }

        element.setAttribute(attributeName, getTranslation(language, translationKey));
    }
}

/**
 * Translates all elements on the page that declare translation bindings.
 * @param {string} language
 */
export function translatePage(language) {
    const textElements = document.querySelectorAll(`[${TRANSLATION_KEY_ATTRIBUTE}]`);
    const attributeElements = document.querySelectorAll(`[${TRANSLATION_ATTRIBUTE_MAP}]`);

    textElements.forEach((element) => {
        applyTextTranslation(element, language);
    });

    attributeElements.forEach((element) => {
        applyAttributeTranslations(element, language);
    });
}
