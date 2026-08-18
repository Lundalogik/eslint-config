/**
 * Gives `npm run lint` some TypeScript-only syntax to parse.
 *
 * `typescript-eslint`'s base config sets a parser with no `files` key, so this
 * repository's JavaScript already goes through `typescript-estree`, and no
 * block in eslint.config.js matches `.ts` without also matching `.js`. What no
 * `.js` file can reach is TypeScript-only syntax -- type annotations,
 * `interface` -- and the TypeScript-aware rules that fire on those nodes.
 *
 * This does not guard against an unusable `typescript`. `eslint.config.js`
 * imports `typescript-eslint` eagerly, and that package throws at module load
 * for an unsupported major, before any file is selected -- the lint here would
 * fail with no `.ts` file present at all. The pinned
 * `devDependencies.typescript` is what keeps that from happening.
 *
 * Deliberately dull: not a rule test, just valid TypeScript that the published
 * config accepts. Excluded from `files` in package.json, so never published.
 *
 * See .github/workflows/typescript-major-watch.yml, which lints this file
 * against the newest published TypeScript to find out whether the `typescript`
 * peer range can be widened.
 */

/**
 * Shape used by {@link describeFixture}.
 */
export interface ParserSmokeFixture {
    /** Human readable name. */
    name: string;

    /** Arbitrary number, used to give the parser an expression to chew on. */
    count: number;
}

/**
 * Renders a fixture as a string.
 *
 * @param fixture - the fixture to describe.
 * @returns a description of the fixture.
 */
export function describeFixture(fixture: ParserSmokeFixture): string {
    const { name, count } = fixture;

    return `${name}: ${String(count)}`;
}
