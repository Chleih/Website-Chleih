const ENABLED_ENV_VALUES = new Set(['1', 'true', 'yes', 'on']);

/**
 * Parses a boolean environment flag.
 * @param {string | boolean | undefined} value
 * @returns {boolean}
 */
function parseBooleanFlag(value) {
    if (typeof value === 'boolean') {
        return value;
    }

    return ENABLED_ENV_VALUES.has(String(value).toLowerCase());
}

/**
 * Returns whether the initial loader should be forced for explicit review.
 * @returns {boolean}
 */
export function shouldForceInitialLoader() {
    return parseBooleanFlag(import.meta.env.VITE_FORCE_INITIAL_LOADER);
}
