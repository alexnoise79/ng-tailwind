# Release Automation Setup Guide

This guide walks you through setting up automated versioning and publishing using release-please and GitHub Actions.

## Overview

The setup includes:
- **release-please**: Automatically increments versions based on conventional commits
- **GitHub Actions**: Creates releases and tags when pushing to `main`
- **NPM Publishing**: Automatically publishes to npmjs when a new tag is created

## Step-by-Step Setup

### Part 1: GitHub Repository Setup

#### Step 1: Enable GitHub Actions
1. Go to your repository on GitHub: `https://github.com/alexnoise79/ng-tailwind`
2. Click **Settings** → **Actions** → **General**
3. Under "Workflow permissions", select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

#### Step 2: Create GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

1. **NPM_TOKEN** (Required for publishing to npmjs)
   - Name: `NPM_TOKEN`
   - Value: [Follow Part 2 below to get your npm token]
   - Click **Add secret**

### Part 2: NPM Setup

#### Step 1: Create an NPM Account (if you don't have one)
1. Go to https://www.npmjs.com/signup
2. Sign up for an account (or log in if you have one)

#### Step 2: Create an Access Token

1. Log in to npmjs.com
2. Click on your profile picture (top right) → **Access Tokens**
3. Click **Generate New Token** → **Generate New Token (classic)**
4. Configure the token:
   - **Token name**: `ng-tailwind-github-actions` (or any descriptive name)
   - **Type**: **Automation** (recommended) or **Publish** (if Automation is not available)
   - **Expiration**: Choose based on your preference (90 days, or no expiration for automation)
5. Click **Generate Token**
6. **IMPORTANT**: Copy the token immediately (you won't see it again!)
   - It will look like: `npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### Step 3: Add Token to GitHub Secrets

1. Go back to GitHub: `https://github.com/alexnoise79/ng-tailwind/settings/secrets/actions`
2. Click **New repository secret**
3. Name: `NPM_TOKEN`
4. Value: Paste your npm token
5. Click **Add secret**

#### Step 4: Verify Package Name Availability

Make sure your package name `@ngtailwind/ngtailwind` is available:
1. Go to https://www.npmjs.com/package/@ngtailwind/ngtailwind
2. If it doesn't exist, you're good to go
3. If it exists, you may need to:
   - Publish a scoped package under your npm username (it will be private by default)
   - Or create an npm organization for `@ngtailwind`

**Note**: For scoped packages starting with `@`, you need to publish with `--access=public` (already configured in `publish.yml`)

### Part 3: Understanding the Workflow

#### How It Works (PR Mode - Preview Before Release)

1. **Push to main branch** with conventional commits (e.g., `feat:`, `fix:`, `BREAKING CHANGE:`)
2. **Release PR workflow** (`release.yml` - `release-pr` job) runs:
   - Analyzes commits since last release
   - Determines version bump (patch, minor, or major)
   - **Creates/updates a Pull Request** with:
     - Updated version in `libs/ui-components/package.json`
     - Updated `CHANGELOG.md` with all changes
     - You can review the version and changelog before merging
3. **Review the PR**:
   - Go to the "Pull Requests" tab
   - Find the release PR (usually titled "chore: release")
   - Review the version number and changelog content
   - Approve and merge when ready
4. **On PR merge**, the workflow (`release-on-pr-merge` job) runs:
   - Creates a GitHub release with tag (e.g., `v1.0.2`)
   - Syncs version to root `package.json`
5. **Publish workflow** (`publish.yml`) automatically triggers:
   - Detects new tag
   - Builds the library
   - Publishes to npmjs

#### Conventional Commits

Use these commit message prefixes:

- `feat:` → Minor version bump (1.0.1 → 1.1.0)
- `fix:` → Patch version bump (1.0.1 → 1.0.2)
- `feat!:` or `BREAKING CHANGE:` → Major version bump (1.0.1 → 2.0.0)
- Other commits → No version bump

Examples:
```bash
git commit -m "feat: add new accordion component"
git commit -m "fix: resolve button styling issue"
git commit -m "feat!: change API interface" # BREAKING CHANGE
```

### Part 4: Testing the Setup

#### Test Run

1. Make a small change and commit with a conventional commit:
   ```bash
   git commit -m "feat: test release automation"
   git push origin main
   ```

2. Check GitHub Actions:
   - Go to **Actions** tab in your repository
   - Watch the "Release" workflow run
   - The `release-pr` job should complete

3. Check for the Release PR:
   - Go to **Pull Requests** tab
   - Look for a PR titled something like "chore: release"
   - **Review the PR**: You'll see:
     - The new version number in `libs/ui-components/package.json`
     - The changelog entries in `CHANGELOG.md`
   - This is your preview before release!

4. Merge the PR when ready:
   - Review the changes
   - Merge the PR to main
   - This triggers the release creation and npm publish

5. Verify:
   - Check the **Actions** tab - `release-on-pr-merge` job should run
   - Check **Releases** - a new release should be created
   - Check **Actions** again - `Publish Package to NPM` should run
   - Verify on npmjs that the new version appears

#### Verify NPM Publication

1. Go to https://www.npmjs.com/package/@ngtailwind/ngtailwind
2. Check that your new version appears
3. Test installing it:
   ```bash
   npm install @ngtailwind/ngtailwind@latest
   ```

### Part 5: Troubleshooting

#### Workflow fails with "Permission denied"
- Check that GitHub Actions has write permissions (Part 1, Step 1)
- Verify `GITHUB_TOKEN` has proper permissions

#### NPM publish fails with authentication error
- Verify `NPM_TOKEN` secret is set correctly
- Check that the token hasn't expired
- Ensure token has "Automation" or "Publish" type

#### Version not incrementing
- Make sure you're using conventional commit messages
- Check that commits are on the `main` branch
- Verify `release-please-config.json` is correct

#### Tag created but package not published
- Check that the tag starts with `v` (e.g., `v1.0.2`)
- Verify `publish.yml` workflow triggers on tags
- Check workflow logs for errors

### Part 6: Manual Release (Optional)

If you need to manually trigger a release:

1. Go to **Actions** → **Release** workflow
2. Click **Run workflow**
3. Select branch: `main`
4. Click **Run workflow**

Or use the GitHub CLI:
```bash
gh workflow run release.yml
```

## Files Created/Modified

- ✅ `.github/workflows/release.yml` - Release automation workflow
- ✅ `.github/workflows/publish.yml` - Updated to work with release-please
- ✅ `release-please-config.json` - Release-please configuration
- ✅ `.release-please-manifest.json` - Version tracking manifest

## Next Steps

1. ✅ Complete Part 1 (GitHub setup)
2. ✅ Complete Part 2 (NPM setup)
3. Make a test commit with `feat:` or `fix:` prefix
4. Push to main and watch the magic happen! 🚀

## Additional Resources

- [release-please documentation](https://github.com/googleapis/release-please)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions documentation](https://docs.github.com/en/actions)

