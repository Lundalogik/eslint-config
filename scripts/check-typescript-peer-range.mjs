/**
 * Fails if the `typescript` peer range we advertise has drifted away from the
 * one `typescript-eslint` actually enforces.
 *
 * We re-declare that range instead of leaving it implicit because
 * `typescript-eslint` is a normal dependency of this package, not a peer. npm
 * is therefore free to satisfy its `typescript` peer with a copy nested under
 * `node_modules/@limetech/eslint-config`, while the consumer's own
 * `node_modules/typescript` -- the one `ts-api-utils` resolves, and the one the
 * editor uses -- is something else entirely. That split installs cleanly and
 * then dies at lint time (Lundalogik/limepkg-ai-agents#97). Declaring the peer
 * ourselves puts the conflict back where it belongs: `npm ci`.
 *
 * A re-declared range is a copy, and copies rot. `typescript-eslint` widens its
 * range whenever it adopts a new TypeScript, and Dependabot brings that in here
 * as a lockfile-only bump that would otherwise look like any other. This check
 * turns that bump red so the advertised range is updated in the same PR.
 *
 * Deliberately offline: it compares against the installed tree, never the
 * registry, so it is deterministic and cannot fail because of something
 * published this morning.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Reads and parses a JSON file.
 *
 * @param filePath - absolute path to the file.
 * @returns the parsed contents.
 */
function readJson(filePath) {
    return JSON.parse(readFileSync(filePath, 'utf8'));
}

const ourManifest = readJson(path.join(repoRoot, 'package.json'));

/**
 * Reads the installed typescript-eslint manifest.
 *
 * @returns the parsed manifest, or undefined if it is not installed.
 */
function readUpstreamManifest() {
    try {
        return readJson(
            path.join(
                repoRoot,
                'node_modules',
                'typescript-eslint',
                'package.json'
            )
        );
    } catch {
        // Overwhelmingly likely to be no install at all, which would otherwise
        // surface as a bare ENOENT stack rather than the advice below.
        return;
    }
}

const upstreamManifest = readUpstreamManifest();

const declared = ourManifest.peerDependencies?.typescript;
const devDeclared = ourManifest.devDependencies?.typescript;
const upstream = upstreamManifest?.peerDependencies?.typescript;

if (!upstreamManifest) {
    console.error(
        'Could not read the installed typescript-eslint. Run `npm ci` first.'
    );
    process.exitCode = 1;
} else if (upstream === undefined) {
    console.error(
        `typescript-eslint@${upstreamManifest.version} declares no \`typescript\` ` +
            'peer range. If upstream really has dropped it, this check has ' +
            'nothing left to compare against and should be reconsidered.'
    );
    process.exitCode = 1;
} else {
    // Checked independently rather than as a chain. When upstream widens its
    // range, both of our copies go stale at once -- that is the normal case
    // this script exists for -- and reporting them one at a time would cost a
    // second CI round trip on a Dependabot PR whose automerge is already off.
    const problems = [];

    if (declared !== upstream) {
        problems.push(
            [
                'The `typescript` peer range in package.json has drifted.',
                '',
                `  peerDependencies.typescript:       ${declared ?? '(nothing)'}`,
                `  typescript-eslint@${upstreamManifest.version} requires: ${upstream}`,
                '',
                'Raising the upper bound is a `feat`: it lets consumers move to a',
                'TypeScript they could not install before. Raising the lower bound',
                'is breaking -- any consumer below the new floor stops being able to',
                'run `npm ci` at all -- so check where consumers actually sit before',
                'releasing that as a minor.',
            ].join('\n')
        );
    }

    if (devDeclared !== upstream) {
        problems.push(
            [
                'The `typescript` devDependency has drifted from that range.',
                '',
                `  devDependencies.typescript:       ${devDeclared ?? '(nothing)'}`,
                `  typescript-eslint@${upstreamManifest.version} requires: ${upstream}`,
                '',
                'It is deliberately the same string as the peer range: this copy is',
                'what lints the TypeScript fixture here, so it has to be a version',
                'consumers are permitted to use.',
            ].join('\n')
        );
    }

    if (problems.length === 0) {
        console.log(
            `✅ typescript peer range matches typescript-eslint@${upstreamManifest.version}: ${upstream}`
        );
    } else {
        const remedy = [
            'To fix: set both ranges in package.json to the one above, then run',
            '`npm install` so package-lock.json carries them too, and',
            '`npm update typescript` to move the pin within the new range.',
            'Note that `npm i -D typescript@X` is not the command you want -- it',
            'rewrites the spec to `^X` and trips this check again.',
        ].join('\n');

        console.error([...problems, remedy].join('\n\n'));
        process.exitCode = 1;
    }
}
