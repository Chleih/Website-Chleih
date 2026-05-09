import js from '@eslint/js';

const sharedGlobals = {
    console: 'readonly',
};

const browserGlobals = {
    ...sharedGlobals,

    // Browser runtime globals
    document: 'readonly',
    window: 'readonly',
    navigator: 'readonly',
    localStorage: 'readonly',

    // Browser constructors / types used in JSDoc and runtime code
    Element: 'readonly',
    HTMLElement: 'readonly',
    HTMLAnchorElement: 'readonly',
    HTMLButtonElement: 'readonly',
    HTMLMetaElement: 'readonly',
    HTMLUListElement: 'readonly',
    CustomEvent: 'readonly',
    URL: 'readonly',
    URLSearchParams: 'readonly',

    // Browser timing / animation APIs
    setTimeout: 'readonly',
    requestAnimationFrame: 'readonly',
};

const nodeGlobals = {
    ...sharedGlobals,
    process: 'readonly',
};

export default [
    js.configs.recommended,
    {
        files: ['src/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: browserGlobals,
        },
        rules: {
            'no-unused-vars': 'error',
            'no-console': 'off',
        },
    },
    {
        files: ['scripts/**/*.js', '*.config.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: nodeGlobals,
        },
        rules: {
            'no-unused-vars': 'error',
            'no-console': 'off',
        },
    },
];
