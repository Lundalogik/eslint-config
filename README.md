# Lime Frontend Lint

Reusable lint rules for use in other packages.

## Installation

Install using **npm**:

```sh
npm i -D @limetech/eslint-config
```

Then put a file called `eslint.config.mjs` in your package root, with the following content:

```js
import { defineConfig } from 'eslint/config';
import config from '@limetech/eslint-config';

export default defineConfig([...config]);
```

Finally, add a script for running eslint to your `package.json`, for example:

```json
{
  …
  "scripts": {
    "lint": "eslint --max-warnings=0",
    "lint:fix": "eslint --fix --max-warnings=0"
  },
}
```

You can then use `npm run lint` in your CI workflows, as it will fail on any
warnings or errors. On your own machine, you would typically run
`npm run lint:fix` instead, to have eslint automatically fix as many of the
problems as possible, and only output warnings or errors for problems that
cannot be fixed automatically.

This package also exposes a reusable Prettier config that can be used to lint and format other files not natively covered by ESLint, such as CSS/SCSS files. To use it, create a `.prettierrc.mjs` file in your package root with the following content:

```js
export { default } from '@limetech/eslint-config/prettier.config.js';
```