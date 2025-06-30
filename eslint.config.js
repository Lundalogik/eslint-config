import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import ban from 'eslint-plugin-ban';
import jsdoc from 'eslint-plugin-jsdoc';
import prettierConfig from './prettier.config.js';
import json from '@eslint/json';
import unicorn from 'eslint-plugin-unicorn';

export default defineConfig([
    {
        ignores: [
            '.github/*',
            '.vscode/*',
            '.stencil/*',
            'bin/*',
            'coverage/*',
            'dist/*',
            'doc/*',
            'etc/*',
            'loader/*',
            'node_modules/*',
            'temp/*',
            'www/*',
            '**/components.d.ts',
        ],
    },
    {
        files: ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
        languageOptions: { globals: globals.node },
    },
    tseslint.configs.recommended,
    {
        files: ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
        ...unicorn.configs.recommended,
    },
    {
        files: ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
        ...sonarjs.configs.recommended,
    },
    prettierRecommended,
    {
        rules: {
            'prettier/prettier': ['error', prettierConfig],
        },
    },
    {
        plugins: { json },
        files: ['**/*.json'],
        ignores: ['package*.json'],
        language: 'json/json',
        rules: {
            'json/no-duplicate-keys': 'error',
            'prettier/prettier': [
                'error',
                {
                    parser: 'jsonc',
                    tabWidth: 2,
                    trailingComma: 'none',
                },
            ],
        },
    },
    {
        files: ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
        ...jsdoc.configs['flat/recommended-typescript'],
    },
    {
        files: ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
        rules: {
            '@typescript-eslint/no-empty-object-type': [
                'error',
                {
                    allowInterfaces: 'always',
                },
            ],
            'jsdoc/check-tag-names': 'off',
            'jsdoc/require-jsdoc': [
                'warn',
                {
                    publicOnly: true,
                },
            ],
            'jsdoc/tag-lines': 'off',
            'sonarjs/no-unused-vars': 'off',
            'sonarjs/todo-tag': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'unicorn/no-null': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-callback-reference': 'off',
            'unicorn/prefer-global-this': 'off',
            'unicorn/prefer-switch': 'off',
            'unicorn/prefer-ternary': 'off',
            'unicorn/consistent-function-scoping': 'off',
            'unicorn/no-useless-undefined': [
                'error',
                {
                    checkArguments: false,
                    checkArrowFunctionBody: false,
                },
            ],
        },
    },
    {
        files: ['**/*.{spec,e2e,test}.{ts,js,tsx,jsx}'],
        plugins: { ban: ban },
        rules: {
            'sonarjs/no-duplicate-string': 'off',
            'sonarjs/no-identical-functions': 'off',
            'no-console': 'off',
            'no-magic-numbers': 'off',
            camelcase: 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'sonarjs/no-nested-functions': 'off',
            'sonarjs/pseudo-random': 'off',
            'unicorn/prefer-structured-clone': 'off',
            'ban/ban': [
                'error',
                {
                    name: ['describe', 'only'],
                    message: "don't focus tests",
                },
                {
                    name: 'fdescribe',
                    message: "don't focus tests",
                },
                {
                    name: ['it', 'only'],
                    message: "don't focus tests",
                },
                {
                    name: 'fit',
                    message: "don't focus tests",
                },
                {
                    name: ['test', 'only'],
                    message: "don't focus tests",
                },
                {
                    name: 'ftest',
                    message: "don't focus tests",
                },
            ],
        },
    },
    {
        files: ['**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^h$|^_',
                    ignoreRestSiblings: true,
                },
            ],
            'sonarjs/unused-import': 'off',
        },
    },
]);
