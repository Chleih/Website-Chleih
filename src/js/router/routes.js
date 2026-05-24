import aboutTemplate from '../../html/pages/about.html?raw';
import contactTemplate from '../../html/pages/contact.html?raw';
import homeTemplate from '../../html/pages/home.html?raw';
import notFoundTemplate from '../../html/pages/not-found.html?raw';
import stackTemplate from '../../html/pages/stack.html?raw';
import workTemplate from '../../html/pages/work.html?raw';
import { appPageDefinitions, notFoundPageDefinition } from './page-definitions';
import { resolveRouteTemplateAssets } from './route-template-assets';

const pageTemplates = {
    home: resolveRouteTemplateAssets(homeTemplate),
    about: resolveRouteTemplateAssets(aboutTemplate),
    work: resolveRouteTemplateAssets(workTemplate),
    stack: resolveRouteTemplateAssets(stackTemplate),
    contact: resolveRouteTemplateAssets(contactTemplate),
};

export const routes = appPageDefinitions.map((pageDefinition) => ({
    ...pageDefinition,
    template: pageTemplates[pageDefinition.name],
}));

export const notFoundRoute = {
    ...notFoundPageDefinition,
    template: notFoundTemplate,
};
