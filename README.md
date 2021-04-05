cliver
=====

The environment management CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cliver.svg)](https://npmjs.org/package/cliver)
[![Downloads/week](https://img.shields.io/npm/dw/cliver.svg)](https://npmjs.org/package/cliver)
[![License](https://img.shields.io/npm/l/cliver.svg)](https://github.com/lucasskluser/cliver/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @cliver/cli
$ cliver COMMAND
running command...
$ cliver (-v|--version|version)
@cliver/cli/0.0.2-alpha win32-x64 node-v14.12.0
$ cliver --help [COMMAND]
USAGE
  $ cliver COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cliver help [COMMAND]`](#cliver-help-command)
* [`cliver load [ENVIRONMENT]`](#cliver-load-environment)

## `cliver help [COMMAND]`

display help for cliver

```
USAGE
  $ cliver help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `cliver load [ENVIRONMENT]`

Loads an environment

```
USAGE
  $ cliver load [ENVIRONMENT]

ARGUMENTS
  ENVIRONMENT  Environment that should be loaded

OPTIONS
  -d, --destination=destination  [default: .env] Environment file destination
  -f, --file=file                [default: .envrc] File that contains environment config
  -i, --include=include          Resource that should be included in environment
  -r, --resources=resources      Resource that should be loaded

EXAMPLES
  $ cliver load
  $ cliver load dev
  $ cliver load dev -r database -i public_api:key
```

_See code: [src/commands/load.ts](https://github.com/lucasskluser/cliver/blob/v0.0.2-alpha/src/commands/load.ts)_
<!-- commandsstop -->
