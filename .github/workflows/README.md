# GitHub Actions

See below for a summary of this repo's Actions

- _Actions marked with "⚠️" are expected to sometimes fail._

## PR related actions

### Tests + Checks (test-and-check.yml)

- Triggers
  - Updates to PRs.
  - PRs in the merge queue.
- Actions
  - Builds all the packages.
  - Runs formatting, linting and type checks.
  - Runs fixture tests, Wrangler unit tests, C3 unit tests, Miniflare unit tests, and ESLint + Prettier checks.
  - Adds the PR to a GitHub project
  - Makes sure that Wrangler's warning for old Node.js versions works.

### E2E tests (e2e.yml)

- Triggers
  - Updates to PRs on the Cloudflare fork.
  - PRs in the merge queue.
- Actions
  - Runs the E2E tests for Wrangler & Vite.

## Deploy Pages Previews (deploy-pages-preview.yml)

- Triggers
  - Updates to PRs that have one of the `preview:...` labels.
- Actions
  - Deploy a preview of the matching Pages project to Cloudflare.

## Deploy (to testing) and Test Playground Preview Worker (worker-playground-preview-testing-env-deploy-and-test.yml)

- Triggers
  - Commits merged to the `main` branch, on the Cloudflare fork, which touch files in the `packages/playground-preview-worker` directory.
  - Updates to PRs, on the Cloudflare fork, with the `playground-worker` label applied.
- Actions
  - Runs integrations tests to ensure the behaviour of the Worker powering the Workers Playground.

## Create Pull Request Prerelease (prerelease.yml)

- Triggers
  - Updates to PRs.
- Actions
  - Creates an installable pre-release of any package containing `{ "workers-sdk": { "prerelease": true } }` in its `package.json` (e.g. Wrangler, C3, and Miniflare) on every PR.
  - Adds a comment to the PR with links to the pre-releases.

## Housekeeping actions

### Add issues to DevProd project (issues.yml)

- Triggers
  - Updates to issues.
- Actions
  - Add the issue to a GitHub project.

### Generate changesets for dependabot PRs (c3-dependabot-versioning-prs.yml and miniflare-dependabot-versioning-prs.yml)

- Triggers
  - Updates to PRs, by the dependabot user, which update one of:
    - frameworks dependencies in C3,
    - miniflare.
- Actions
  - Generates changesets for the affected package.

### E2E Project Cleanup (e2e-project-cleanup.yml)

- Triggers
  - Scheduled to run at 3am each day.
- Actions
  - Deletes any Workers and Pages projects that were not properly cleaned up by the E2E tests.

## Main branch actions

### Handle Changesets (changesets.yml)

- Triggers
  - Commits merged to the `main` branch, on the Cloudflare fork.
- Actions
  - If there are changeset in the working directory, create or update a "Version Packages" PR to prep for a release.
  - If there are no changesets, release any packages that have a bump to their version in this change.
    - Public packages are deployed to npm
    - Private packages will run their `deploy` script, if they have one.

## C3 related actions

### C3 E2E Tests (c3-e2e.yml)

- Triggers
  - Updates to PRs.
- Actions
  - Runs the E2E tests for C3.
