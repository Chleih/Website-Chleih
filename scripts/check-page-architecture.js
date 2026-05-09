import { existsSync, readdirSync } from 'node:fs';
import { join, parse } from 'node:path';
import { NOT_FOUND_PAGE_NAME, appPageDefinitions } from '../src/js/router/page-definitions.js';

const HTML_PAGES_DIRECTORY = 'src/html/pages';
const SCSS_PAGES_DIRECTORY = 'src/scss/pages';
const HOME_PAGE_NAME = 'home';

/**
 * Returns file base names for files with the provided extension.
 * @param {string} directory
 * @param {string} extension
 * @returns {string[]}
 */
function getFileBaseNames(directory, extension) {
    return readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
        .map((entry) => parse(entry.name).name)
        .sort();
}

/**
 * Returns child directory names from a directory.
 * @param {string} directory
 * @returns {string[]}
 */
function getChildDirectoryNames(directory) {
    return readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
}

/**
 * Returns whether a route path mirrors its page name.
 * @param {{name: string, path: string}} pageDefinition
 * @returns {boolean}
 */
function hasMirroredRoutePath(pageDefinition) {
    const expectedPath = pageDefinition.name === HOME_PAGE_NAME ? '/' : `/${pageDefinition.name}`;

    return pageDefinition.path === expectedPath;
}

/**
 * Records an architecture violation when a condition is not met.
 * @param {boolean} condition
 * @param {string} message
 * @param {string[]} violations
 * @returns {void}
 */
function assertArchitectureRule(condition, message, violations) {
    if (!condition) {
        violations.push(message);
    }
}

/**
 * Throws when page files, route names, or page style folders drift apart.
 * @returns {void}
 */
function checkPageArchitecture() {
    const htmlPageNames = getFileBaseNames(HTML_PAGES_DIRECTORY, '.html');
    const appPageNames = appPageDefinitions.map((pageDefinition) => pageDefinition.name).sort();
    const scssPageDirectoryNames = getChildDirectoryNames(SCSS_PAGES_DIRECTORY);
    const routableHtmlPageNames = htmlPageNames.filter((pageName) => pageName !== NOT_FOUND_PAGE_NAME).sort();
    const violations = [];

    assertArchitectureRule(
        htmlPageNames.includes(NOT_FOUND_PAGE_NAME),
        `Missing ${join(HTML_PAGES_DIRECTORY, `${NOT_FOUND_PAGE_NAME}.html`)}.`,
        violations,
    );

    for (const pageName of routableHtmlPageNames) {
        assertArchitectureRule(
            appPageNames.includes(pageName),
            `HTML page "${pageName}" does not have a matching app route definition.`,
            violations,
        );
    }

    for (const pageDefinition of appPageDefinitions) {
        assertArchitectureRule(
            routableHtmlPageNames.includes(pageDefinition.name),
            `Route "${pageDefinition.name}" does not have a matching HTML page file.`,
            violations,
        );
        assertArchitectureRule(
            hasMirroredRoutePath(pageDefinition),
            `Route "${pageDefinition.name}" should use path "${
                pageDefinition.name === HOME_PAGE_NAME ? '/' : `/${pageDefinition.name}`
            }".`,
            violations,
        );
    }

    for (const pageDirectoryName of scssPageDirectoryNames) {
        assertArchitectureRule(
            htmlPageNames.includes(pageDirectoryName),
            `SCSS page folder "${pageDirectoryName}" does not mirror an HTML page file.`,
            violations,
        );
        assertArchitectureRule(
            existsSync(join(SCSS_PAGES_DIRECTORY, pageDirectoryName, '_index.scss')),
            `SCSS page folder "${pageDirectoryName}" must expose an _index.scss entry.`,
            violations,
        );
    }

    if (violations.length > 0) {
        throw new Error(`Page architecture check failed:\n- ${violations.join('\n- ')}`);
    }
}

checkPageArchitecture();
