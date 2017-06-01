# Atomist 'doc-rugs'

[![Build Status](https://travis-ci.org/atomist/doc-rugs.svg?branch=master)](https://travis-ci.org/atomist/doc-rugs)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)

[rug]: http://docs.atomist.com/

This [Rug][rug] project contains rugs used in the
Atomist [end-user documentation][doc].

[doc]: https://github.com/atomist/end-user-documentation

## Rugs

Rugs are typically run using the Atomist Bot in Slack.  To run Rugs
locally, you must first install the following tools:

-   [Rug CLI][rug-cli]
-   [Node.js][node]
-   [Yarn][yarn]

[rug-cli]: http://docs.atomist.com/user-guide/interfaces/cli/install/
[node]: https://nodejs.org/
[yarn]: https://yarnpkg.com/

Once those tools are installed, you can clone this repository and
install its dependencies with the following command.

```
$ ( cd .atomist && yarn )
```

### AddLicense

The AddLicense editor adds a LICENSE file to a project and license
header comments to TypeScript files in a project.

#### Prerequisites

A source code project.

#### Parameters

This Rug takes following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`include` | No | "" | Comma-separated list of paths under which to search for files, search under all paths if empty
`license` | No | "aslv2" | License to add, currently only "aslv2" is supported

#### Running

Run this Rug as follows:

```
$ cd project/directory
$ rug edit atomist:rug-rugs:AddLicense \
    include=src,test \
    license=aslv2
```

This will add the ASLv2 license as `LICENSE` to the file and add a
license header comment to all TypeScript files under the `src` and
`test` directories in the project.

## Support

General support questions should be discussed in the `#support`
channel on our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist/doc-rugs/issues

## Contributing

If you are interested in contributing to the Atomist open source
projects, please see our [contributing guidelines][contrib] and
our [code of conduct][code].

[contrib]: https://github.com/atomist/welcome/blob/master/CONTRIBUTING.md
[code]: https://github.com/atomist/welcome/blob/master/CODE_OF_CONDUCT.md

## Development

You can build, test, and install the project locally with
the [Rug CLI][cli] and [Yarn][yarn].

[cli]: https://github.com/atomist/rug-cli

```
$ ( cd .atomist && yarn test )
$ rug install
```

To clean up cached files and update TypeScript dependencies, run this
command.

```
$ ( cd .atomist && find editors generators handlers tests -name '*.js' -print0 | xargs -0 rm; rm -rf node_modules; yarn && rug clean )
```

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  For example:

[semver]: http://semver.org

```
$ git tag -a 1.2.3
```

The Travis CI build (see badge at the top of this page) will
automatically create a GitHub release using the tag name for the
release and the comment provided on the annotated tag as the contents
of the release notes.  It will also automatically upload the needed
artifacts.

---
Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com/
