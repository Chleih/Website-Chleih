import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const CHECKED_DIRECTORIES = ['src/js', 'scripts'];
const ROOT_CONFIG_FILE_SUFFIX = '.config.js';

/**
 * Returns JavaScript files found recursively inside a directory.
 * @param {string} directory
 * @returns {string[]}
 */
function getJavaScriptFiles(directory) {
    const entries = readdirSync(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const entryPath = join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...getJavaScriptFiles(entryPath));
            continue;
        }

        if (entry.name.endsWith('.js')) {
            files.push(entryPath);
        }
    }

    return files;
}

/**
 * Returns root-level JavaScript config files that should be syntax checked.
 * @returns {string[]}
 */
function getRootConfigJavaScriptFiles() {
    const entries = readdirSync('.', { withFileTypes: true });

    return entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(ROOT_CONFIG_FILE_SUFFIX))
        .map((entry) => entry.name);
}

/**
 * Returns all JavaScript files covered by the syntax check.
 * @returns {string[]}
 */
function getCheckedJavaScriptFiles() {
    return [...CHECKED_DIRECTORIES.flatMap(getJavaScriptFiles), ...getRootConfigJavaScriptFiles()].sort();
}

/**
 * Runs Node's syntax checker for a single JavaScript file.
 * @param {string} filePath
 * @returns {number}
 */
function checkJavaScriptFile(filePath) {
    const result = spawnSync(process.execPath, ['--check', filePath], {
        stdio: 'inherit',
    });

    return result.status ?? 1;
}

/**
 * Runs JavaScript syntax validation for project source and tooling scripts.
 * @returns {void}
 */
function checkJavaScriptSyntax() {
    const files = getCheckedJavaScriptFiles();

    for (const file of files) {
        const status = checkJavaScriptFile(file);

        if (status !== 0) {
            process.exit(status);
        }
    }
}

checkJavaScriptSyntax();
