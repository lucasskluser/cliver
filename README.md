enver
=====

The environment management CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/enver.svg)](https://npmjs.org/package/enver)
[![Downloads/week](https://img.shields.io/npm/dw/enver.svg)](https://npmjs.org/package/enver)
[![License](https://img.shields.io/npm/l/enver.svg)](https://github.com/lucasskluser/enver/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g enver
$ enver COMMAND
running command...
$ enver (-v|--version|version)
enver/1.0.0 win32-x64 node-v14.12.0
$ enver --help [COMMAND]
USAGE
  $ enver COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`enver hello [FILE]`](#enver-hello-file)
* [`enver help [COMMAND]`](#enver-help-command)

## `enver hello [FILE]`

describe the command here

```
USAGE
  $ enver hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ enver hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/lucasskluser/enver/blob/v1.0.0/src/commands/hello.ts)_

## `enver help [COMMAND]`

display help for enver

```
USAGE
  $ enver help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
