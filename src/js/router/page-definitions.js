export const NOT_FOUND_PAGE_NAME = 'not-found';

export const appPageDefinitions = [
    {
        name: 'home',
        path: '/',
        label: 'Home',
        title: 'Mohamad Chleih | Portfolio',
        description:
            'Portfolio website of Mohamad Chleih, a software engineer focused on clean architecture, backend systems, performance, and maintainable software.',
        navVisible: true,
    },
    {
        name: 'work',
        path: '/work',
        label: 'Work',
        title: 'Work | Mohamad Chleih',
        description: 'Selected work and software projects by Mohamad Chleih.',
        navVisible: true,
    },
    {
        name: 'stack',
        path: '/stack',
        label: 'Stack',
        title: 'Stack | Mohamad Chleih',
        description: 'Tools, technologies, and engineering practices used by Mohamad Chleih.',
        navVisible: true,
    },
    {
        name: 'about',
        path: '/about',
        label: 'About',
        title: 'About | Mohamad Chleih',
        description:
            'Learn more about Mohamad Chleih, his background, software engineering experience, and professional focus.',
        navVisible: true,
    },
    {
        name: 'contact',
        path: '/contact',
        label: 'Contact',
        title: 'Contact | Mohamad Chleih',
        description: 'Contact Mohamad Chleih for software work, collaboration, and technical conversations.',
        navVisible: true,
    },
];

export const notFoundPageDefinition = {
    name: NOT_FOUND_PAGE_NAME,
    path: '/404',
    title: 'Page Not Found | Mohamad Chleih',
    description: "Fallback page for Mohamad Chleih's portfolio website when a requested page cannot be found.",
    navVisible: false,
};

export const navigationPageDefinitions = appPageDefinitions.filter((pageDefinition) => pageDefinition.navVisible);
