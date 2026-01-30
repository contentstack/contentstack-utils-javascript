# Contributing to Contentstack Utils JavaScript

Thank you for your interest in contributing to Contentstack Utils JavaScript. This document provides guidelines and instructions for contributing.

## Pull Request Target Branch

**All pull requests must be raised against the `development` branch.**

Do not open PRs against `master` or `staging`. Create your feature or fix branch from `development`, and open your PR to merge into `development`. Maintainers will handle promotion to other branches after review.

## Getting Started

### Prerequisites

- **Node.js** 10 or later
- **npm** (comes with Node.js)
- **Git**

### Development Setup

1. **Fork the repository** on GitHub and clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/contentstack-utils-javascript.git
   cd contentstack-utils-javascript
   ```

2. **Add the upstream remote** (optional, for syncing with the main repo):

   ```bash
   git remote add upstream https://github.com/contentstack/contentstack-utils-javascript.git
   ```

3. **Create a branch from `development`** for your work:

   ```bash
   git fetch upstream
   git checkout development
   git pull upstream development
   git checkout -b your-feature-or-fix-name
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Build the project:**

   ```bash
   npm run build
   ```

## Development Workflow

### Running Tests

- Run the full test suite: `npm test`
- Run tests in watch mode (for development): `npm run test:debug`

All tests must pass before submitting a PR. New features and bug fixes should include or update tests as appropriate.

### Code Style

- **ESLint:** The project uses ESLint. Fix auto-fixable issues with your editor or by running the linter.
- **Prettier:** Code is formatted with Prettier. Use `npm run format` to format `src/**/*.ts`.

Ensure your code adheres to the existing style so that CI and pre-commit checks pass.

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint.

- Use a **type** and a **short subject** (e.g. `feat: add jsonToHTML option`, `fix: handle empty nodes`).
- Allowed types include: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, `sample`.
- Subject should be lowercase, imperative, and not end with a period.
- Add a blank line and a longer body when the change needs more explanation.

Husky runs a commit-msg hook to validate commit messages. Invalid messages will be rejected.

### Pre-commit Hooks

Husky is used for Git hooks. Before each commit, the pre-commit hook runs. Ensure your working tree is clean and that tests and lint pass locally to avoid failed commits.

## Submitting Changes

1. **Keep your branch up to date** with `development`:

   ```bash
   git fetch upstream
   git rebase upstream/development
   ```

2. **Open a Pull Request** against the **`development`** branch (not `master` or `staging`).

3. **Fill out the PR template** (if one exists) and provide:
   - A clear title and description of the change
   - Link to any related issue
   - Summary of testing done

4. **Address review feedback** promptly. Maintainers may request changes before merging.

5. **Do not force-push** after review has started unless the maintainer asks you to; use new commits for updates when possible so review history is preserved.

## Reporting Issues

- Use the GitHub issue tracker for bugs and feature requests.
- Search existing issues first to avoid duplicates.
- Include steps to reproduce for bugs, and your environment (Node version, OS).
- For security issues, see [SECURITY.md](SECURITY.md).

## Additional Resources

- [README](README.md) – Project overview and usage
- [CHANGELOG](CHANGELOG.md) – Version history and changes
- [SECURITY](SECURITY.md) – Security and vulnerability reporting
- [CODEOWNERS](CODEOWNERS) – Code ownership and review expectations

Thank you for contributing.
