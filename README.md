# changelog

Generate simple CHANGELOG

# Install

Download the one that suits your environment and place it in a location that is in your PATH.

https://github.com/tricot-inc/changelog/releases/latest

# Usage

By default, the Latest Release tag and main branch compare are used to generate a changelog.

```shell
$ changelog <organization>/<repo>
```

If you specify commit, put it in the second argument.

```shell
$ changelog <organization>/<repo> <target commit, branch name or tag>
```

The token required to get the compare uses the environment variable `GITHUB_TOKEN`, but it can also be specified using `-t` or `--token`.

```shell
$ changelog <organization>/<repo> --token <github personal access token>
```

