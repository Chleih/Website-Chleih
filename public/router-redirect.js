(() => {
    const redirectPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    sessionStorage.setItem('website-router-redirect', redirectPath);
    window.location.replace('/');
})();
