#!/usr/bin/env node
/* eslint-disable no-eval */

const path = require('path')
const fs = require('fs')
const os = require('os')
const yargs = require('yargs')
const yargsFlags = require('./yargsFlags')
const { runLava } = require('./index')
const readCmdShim = require('read-cmd-shim')

const defaults = require('./defaults')

runLava(parseArgs()).catch((err) => {
  // explicity log stack to workaround https://github.com/endojs/endo/issues/944
  console.error(err.stack || err)
  process.exit(1)
})

function getActualBinPath(binEntry) {
  // npm places wrapping scripts in node_modules/.bin on windows...
  if (os.platform() === 'win32') {
    // on windows, this is a .sh file, alongside a .cmd and .ps1
    const actualPath = readCmdShim.sync(binEntry)
    return fs.realpathSync(actualPath)
  }
  // ...symlinks on other platforms
  return fs.realpathSync(binEntry)
}

function parseArgs() {
  const argsParser = yargs
    .usage(
      '$0',
      'lavamoat-run-command [flags for lavamoat] -- command [args for the command]',
      (yarn) => yargsFlags(yarn, defaults)
    )
    .help()

  const parsedArgs = argsParser.parse()
  const commandName = parsedArgs._[0]

  const binEntry = path.resolve(
    process.cwd(),
    './node_modules/.bin/',
    commandName
  )
  if (!fs.existsSync(binEntry)) {
    console.error(`Error: '${commandName}' is not one of the locally installed commands. Missing: '${binEntry}'
    Possible reasons for this error:
    - node_modules not installed
    - trying to run a globally installed script or command,
      which is not supported and not recommended`)
    process.exit(4)
  }

  parsedArgs.entryPath = getActualBinPath(binEntry)

  // patch process.argv so it matches the normal pattern
  // e.g. [runtime path, entrypoint, ...args]
  // we'll use the LavaMoat path as the runtime
  // so we just remove the node path
  process.argv = [process.argv[0], ...parsedArgs._]

  return parsedArgs
}
