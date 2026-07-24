# Changesets

Use `pnpm changeset` to create a release note for changes that should bump package versions.

Use `pnpm changeset:version` on `develop` to apply pending version bumps.
Changesets is configured not to create or update package-level changelog files.
Generate the repository-level `docs/UI_CHANGELOG.md` from Conventional Commits:

```bash
# First release, before the first version tag exists
pnpm changelog:first-release

# Later releases, after the previous version has been tagged
pnpm changelog
```

After the release PR from `develop` to `master` is merged, GitHub Actions first
deploys the documentation and then publishes `@kno/ui`. Do not run a local
publish command for a normal release.

Review and commit the version and `docs/UI_CHANGELOG.md` changes before opening
the release PR.
