## Syncb

Sync your forks using one command.

Blog: [How I sync my forked repo with the parent using this CLI tool (saves me a lot of time)](https://dev.to/sidmohanty11/how-i-sync-my-forked-repo-with-the-parent-using-this-cli-tool-saves-me-a-lot-of-time-hoc)

![syncb](https://github.com/sidmohanty11/syncb/assets/73601258/bd97a908-b9c0-43a3-bbe4-14203fe8c081)

### Installation
Install syncb globally using npm:

```bash
npm i -g syncb
```

```bash
syncb
```

### Description
`syncb` streamlines the process of synchronizing your local Git branch with the parent repository (upstream) from which you forked. It executes the following steps seamlessly:

- Intelligent Upstream Detection:
syncb intelligently determines the remote URL of the upstream repository based on common naming conventions used in Git forking workflows. This ensures it targets the correct source.
- Automatic Upstream Setup (if needed):
If no upstream remote is configured, syncb retrieves the parent repository's URL from the GitHub API. However, to access private repositories, you'll need to provide a valid GITHUB_TOKEN environment variable.
- Seamless Change Fetching:
syncb fetches the latest commits and code changes from the upstream repository, keeping your local branch in sync with the parent's evolution.
- Careful Merge Integration:
syncb integrates the fetched changes into your current local branch using a merge operation. This incorporates the upstream's updates while preserving your local modifications.

### Using Private Forks
To use syncb with private forks, you'll need to create a personal access token on GitHub and set it as the GITHUB_TOKEN environment variable. Here's how:

- Go to your GitHub settings (https://github.com/settings/tokens).
- Click "Generate new token.", Use classic.
- Give your token a descriptive name (e.g., "syncb-token").
- Select the scopes needed by syncb: `repo`: Allows read access to private repositories.
- Click on "Generate token."
- Copy the generated token. This is your `GITHUB_TOKEN`.

Store it in your `.zshrc` or similar.

> Important:
> Security: Do not share your personal access token publicly. Store it securely using environment variable managers or other secure methods.

### Contributing
We're enthusiastic about contributions! If you have ideas to enhance syncb, feel free to submit an issue or pull request on the project's GitHub repository.

### License
syncb is distributed under the MIT License (refer to the LICENSE file for details).
