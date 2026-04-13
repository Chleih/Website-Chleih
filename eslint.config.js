import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['src/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                document: 'readonly',
                window: 'readonly',
                localStorage: 'readonly',
                URLSearchParams: 'readonly',
                setTimeout: 'readonly',
                requestAnimationFrame: 'readonly',
                navigator: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },
];
