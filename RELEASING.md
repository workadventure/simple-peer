# Releasing

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate the release process.

## How it works

When commits are pushed to the `master` branch:

1. The CI workflow runs tests to ensure the code is working
2. If tests pass, the Release workflow is triggered automatically
3. Semantic-release analyzes commit messages to determine the version bump
4. A new version is published to npm and a GitHub release is created

## Commit Message Format

Semantic-release uses the commit messages to determine the type of changes in the codebase. Following formalized conventions for commit messages, semantic-release automatically determines the next semantic version number.

### Format

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Types

- **feat**: A new feature (triggers a minor version bump)
- **fix**: A bug fix (triggers a patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Breaking Changes

To trigger a major version bump, include `BREAKING CHANGE:` in the commit body or footer, or append `!` after the type/scope:

```
feat!: remove support for Node 12

BREAKING CHANGE: Node 12 is no longer supported
```

## Setup Requirements

For the release workflow to work, the following secret must be configured in the repository:

- `NPM_TOKEN`: An npm token with publish permissions for the `@thaunknown/simple-peer` package

The `GITHUB_TOKEN` is automatically provided by GitHub Actions.

## Manual Release

Semantic-release runs automatically on CI, but you can also run it manually:

```bash
npx semantic-release --no-ci
```

Note: This requires `GITHUB_TOKEN` and `NPM_TOKEN` environment variables to be set.
