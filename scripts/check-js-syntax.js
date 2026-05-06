import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const CHECKED_DIRECTORIES = ['src/js', 'scripts'];

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
    const files = CHECKED_DIRECTORIES.flatMap(getJavaScriptFiles);

    for (const file of files) {
        const status = checkJavaScriptFile(file);

        if (status !== 0) {
            process.exit(status);
        }
    }
}

checkJavaScriptSyntax();
