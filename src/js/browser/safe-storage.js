/**
 * Creates a guarded storage adapter that disables itself after browser storage fails.
 * @param {() => Storage} resolveStorage
 * @returns {{getItem: (key: string) => string | null, setItem: (key: string, value: string) => void, removeItem: (key: string) => void}}
 */
export function createSafeStorage(resolveStorage) {
    let isStorageUnavailable = false;

    /**
     * Marks this adapter as unavailable for the current runtime.
     * @returns {void}
     */
    function markStorageUnavailable() {
        isStorageUnavailable = true;
    }

    /**
     * Returns browser storage when it can be used safely.
     * @returns {Storage | null}
     */
    function getStorage() {
        if (isStorageUnavailable) {
            return null;
        }

        try {
            return resolveStorage();
        } catch {
            markStorageUnavailable();

            return null;
        }
    }

    /**
     * Reads a value from storage.
     * @param {string} key
     * @returns {string | null}
     */
    function getItem(key) {
        const storage = getStorage();

        if (!storage) {
            return null;
        }

        try {
            return storage.getItem(key);
        } catch {
            markStorageUnavailable();

            return null;
        }
    }

    /**
     * Writes a value to storage.
     * @param {string} key
     * @param {string} value
     * @returns {void}
     */
    function setItem(key, value) {
        const storage = getStorage();

        if (!storage) {
            return;
        }

        try {
            storage.setItem(key, value);
        } catch {
            markStorageUnavailable();
        }
    }

    /**
     * Removes a value from storage.
     * @param {string} key
     * @returns {void}
     */
    function removeItem(key) {
        const storage = getStorage();

        if (!storage) {
            return;
        }

        try {
            storage.removeItem(key);
        } catch {
            markStorageUnavailable();
        }
    }

    return {
        getItem,
        setItem,
        removeItem,
    };
}
