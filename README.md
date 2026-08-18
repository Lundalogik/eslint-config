# Lime Frontend Lint

Reusable lint rules for use in other packages.

## Installation

Install using **npm**:

```sh
npm i -D @limetech/eslint-config
```

If your package contains TypeScript, you also need `typescript` installed, within
the range this package declares as an optional peer dependency. That range is not
a preference of ours — it is the range `typescript-eslint` supports, mirrored here
so that a TypeScript your linter cannot parse is refused by `npm ci` rather than
crashing halfway through a lint run. See
[Holding a TypeScript major](#holding-a-typescript-major) below.

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

## Holding a TypeScript major

`typescript` is an optional peer dependency of this package, pinned to the range
`typescript-eslint` supports. Consumers doing no type-aware linting still need it:
`typescript-eslint` parses with it, and `typescript-estree` reads the TypeScript
compiler API at import time.

That is why a new TypeScript major cannot simply be adopted. TypeScript 7 is the
native compiler rewrite — its npm package ships platform binaries and no longer
exposes `ts.SyntaxKind` or `ts.TypeFlags` at all — so linting stops working until
`typescript-eslint` supports it ([typescript-eslint#10940][tse-issue]).

Consumers should therefore hold `typescript` at its current major in
`.github/dependabot.yml`:

```yaml
    ignore:
      - dependency-name: 'typescript'
        update-types: ['version-update:semver-major']
```

Note that a TypeScript *minor* can be refused the same way. The peer range's upper
bound tracks `typescript-eslint`'s, which is minor-granular (`<X.Y.0`), so a minor
released ahead of their adoption is out of range even though a major-only hold does
not stop it. Such a bump waits for a widened range rather than being forced through
with `--legacy-peer-deps`.

The protection is also npm-specific: Yarn treats a peer mismatch as a warning and
pnpm ships `strict-peer-dependencies=false`, so a consumer on either gets the
documentation but not the refusal.

When `typescript-eslint` widens its supported range, Dependabot opens a PR here
that bumps it — a new major included, because `.github/dependabot.yml` uses
`versioning-strategy: increase-if-necessary`. `check:peer-range` fails that PR and
prints the range to adopt; widen `peerDependencies.typescript` to match in the
same PR and release. Consumers pick that up with their next
`@limetech/eslint-config` bump, and can then drop the `typescript` hold above.

[tse-issue]: https://github.com/typescript-eslint/typescript-eslint/issues/10940
