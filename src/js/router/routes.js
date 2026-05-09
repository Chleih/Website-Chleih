import aboutTemplate from '../../html/pages/about.html?raw';
import contactTemplate from '../../html/pages/contact.html?raw';
import homeTemplate from '../../html/pages/home.html?raw';
import notFoundTemplate from '../../html/pages/not-found.html?raw';
import stackTemplate from '../../html/pages/stack.html?raw';
import workTemplate from '../../html/pages/work.html?raw';
import { NOT_FOUND_PAGE_NAME, appPageDefinitions } from './page-definitions';

const pageTemplates = {
    home: homeTemplate,
    about: aboutTemplate,
    work: workTemplate,
    stack: stackTemplate,
    contact: contactTemplate,
};

export const routes = appPageDefinitions.map((pageDefinition) => ({
    ...pageDefinition,
    template: pageTemplates[pageDefinition.name],
}));

export const notFoundRoute = {
    name: NOT_FOUND_PAGE_NAME,
    path: '/404',
    template: notFoundTemplate,
};
