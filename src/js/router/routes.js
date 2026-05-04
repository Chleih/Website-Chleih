import aboutTemplate from '../../html/pages/about.html?raw';
import contactTemplate from '../../html/pages/contact.html?raw';
import homeTemplate from '../../html/pages/home.html?raw';
import notFoundTemplate from '../../html/pages/not-found.html?raw';
import stackTemplate from '../../html/pages/stack.html?raw';
import workTemplate from '../../html/pages/work.html?raw';

export const routes = [
    {
        path: '/',
        template: homeTemplate,
    },
    {
        path: '/about',
        template: aboutTemplate,
    },
    {
        path: '/work',
        template: workTemplate,
    },
    {
        path: '/stack',
        template: stackTemplate,
    },
    {
        path: '/contact',
        template: contactTemplate,
    },
];

export const notFoundRoute = {
    path: '/404',
    template: notFoundTemplate,
};
