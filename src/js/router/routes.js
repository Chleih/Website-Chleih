export const routes = [
    {
        path: '/',
        template: () => import('../../html/pages/home.html?raw'),
    },
    {
        path: '/about',
        template: () => import('../../html/pages/about.html?raw'),
    },
    {
        path: '/projects',
        template: () => import('../../html/pages/projects.html?raw'),
    },
    {
        path: '/skills',
        template: () => import('../../html/pages/skills.html?raw'),
    },
    {
        path: '/contact',
        template: () => import('../../html/pages/contact.html?raw'),
    },
];

export const notFoundRoute = {
    path: '/404',
    template: () => import('../../html/pages/not-found.html?raw'),
};
