import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['src/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
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
                CustomEvent: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',

                // Browser timing / animation APIs
                setTimeout: 'readonly',
                requestAnimationFrame: 'readonly',

                // Development/debugging
                console: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },
];
