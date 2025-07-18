const config = {
    endOfLine: 'auto',
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    overrides: [
        {
            files: ['.prettierrc', '*.json'],
            options: {
                parser: 'json',
                tabWidth: 2,
            },
        },
    ],
};

export default config;
