## [3.0.0](https://github.com/Lundalogik/eslint-config/compare/v2.0.2...v3.0.0) (2025-07-08)


### ⚠ BREAKING CHANGES

* **eslint:** Many rules might have changed, resulting in breaking builds

### Features


* **eslint:** update to ESLint 9 ([a126928](https://github.com/Lundalogik/eslint-config/commit/a12692869a5ccb97ac2abaead0e63a0c82235060))

### Bug Fixes


* remove __dirname leftover ([014c778](https://github.com/Lundalogik/eslint-config/commit/014c778f6bc3d0dfc3d038a4da3bb47013716ea8))

## [2.0.2](https://github.com/Lundalogik/eslint-config/compare/v2.0.1...v2.0.2) (2023-11-15)


### Bug Fixes


* **.eslintrc.js:** remove some test-related rules that was copied from lime-elements ([6315b4a](https://github.com/Lundalogik/eslint-config/commit/6315b4a3f47c2f2fb8fefe80152409860f6667d6))

## [2.0.1](https://github.com/Lundalogik/eslint-config/compare/v2.0.0...v2.0.1) (2023-10-31)


### Bug Fixes


* add postinstall script for copying `.prettierrc` to consumer project ([6481d5f](https://github.com/Lundalogik/eslint-config/commit/6481d5f59c917914ebd06c078dc90ff17bde4501))

# [2.0.0](https://github.com/Lundalogik/eslint-config/compare/v1.0.1...v2.0.0) (2023-10-29)


### Bug Fixes


* **dependencies:** make most dependencies devDependencies ([821a822](https://github.com/Lundalogik/eslint-config/commit/821a8228b2cd3afde6b7e37b975a1665ec6d4b34))

### Features


* **dependecies:** put tighter restrictions on peerDependencies ([0b3a8ea](https://github.com/Lundalogik/eslint-config/commit/0b3a8ea11fc2f6dcd4bc6699315126c716771d62))

### BREAKING CHANGES

* **dependecies:** This commits restricts the peerDependencies from `>=` to `^`, in
order to enable better control of styles within packages depending
on this shared configuration. This package is currently in a
somewhat experimental phase, and restrictions may be opened up or
restricted further as we find what fits best for internal use at
Lime.

## [1.0.1](https://github.com/Lundalogik/eslint-config/compare/v1.0.0...v1.0.1) (2023-10-28)


### Bug Fixes


* **package:** add required peer dependencies ([8294559](https://github.com/Lundalogik/eslint-config/commit/8294559b3b180c1327625663c204df1f33fcd78e))
* rename repo to make it work as shared config ([1d70b64](https://github.com/Lundalogik/eslint-config/commit/1d70b64c10e49f3a10c852a2a6affb382b3b4e95))

# 1.0.0 (2023-10-28)


### Features


* add dependencies on, and rules for, eslint, prettier, and various plugins ([185a4b6](https://github.com/Lundalogik/lime-frontend-lint/commit/185a4b60365476a87c943a3fa951aba64cb708bb))
