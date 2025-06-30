import { readFileSync } from 'node:fs';
import path from 'node:path';

const __dirname = import.meta.dirname;

export default {
    branches: [
        'main',
        '+([0-9])?(.{+([0-9]),x}).x',
        { name: 'dev', prerelease: true },
        { name: 'beta', prerelease: true },
        { name: 'alpha', prerelease: true },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                writerOpts: {
                    commitPartial: readFileSync(
                        path.join(__dirname, 'commit.hbs'),
                        'utf8'
                    ),
                },
            },
        ],
        '@semantic-release/changelog',
        '@semantic-release/npm',
        '@semantic-release/git',
        '@semantic-release/github',
    ],
    npmPublish: true,
};
