const ROUTER_REDIRECT_STORAGE_KEY = 'website-router-redirect';

/**
 * Restores a clean route after the static-host 404 fallback redirects to the app entry.
 */
export function restoreRedirectPath() {
    const redirectPath = sessionStorage.getItem(ROUTER_REDIRECT_STORAGE_KEY);

    if (!redirectPath) {
        return;
    }

    sessionStorage.removeItem(ROUTER_REDIRECT_STORAGE_KEY);
    window.history.replaceState(null, '', redirectPath);
}
