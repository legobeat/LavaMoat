const os = require('node:os')
const test = require('ava')
const { execFileSync } = require('child_process')

const { runLava } = require('../src/index')

/* eslint-disable ava/no-skip-test */
const skipOnWindows =
  os.platform() === 'win32'
    ? (description, ...args) =>
        test.skip(description + ' (not supported on Windows)', ...args)
    : test

skipOnWindows('use lavamoat cli', (t) => {
  const projectRoot = `${__dirname}/projects/2`
  const entryPath = './index.js'
  const lavamoatPath = `${__dirname}/../src/cli.js`
  const output = execFileSync(lavamoatPath, [entryPath], {
    cwd: projectRoot,
    encoding: 'utf8',
  })
  t.deepEqual(
    output.split('\n'),
    [
      'keccak256: 5cad7cf49f610ec53189e06d3c8668789441235613408f8fabcb4ad8dad94db5',
      '',
    ],
    'should return expected output'
  )
})

test('call lavamoat cli via node', (t) => {
  const projectRoot = `${__dirname}/projects/2`
  const entryPath = './index.js'
  const lavamoatPath = `${__dirname}/../src/cli.js`
  const output = execFileSync('node', [lavamoatPath, entryPath], {
    cwd: projectRoot,
    encoding: 'utf8',
  })
  t.deepEqual(
    output.split('\n'),
    [
      'keccak256: 5cad7cf49f610ec53189e06d3c8668789441235613408f8fabcb4ad8dad94db5',
      '',
    ],
    'should return expected output'
  )
})

test('use lavamoat programmatically', async (t) => {
  const projectRoot = `${__dirname}/projects/2`
  const entryPath = './index.js'

  await runLava({
    entryPath,
    projectRoot,
    debugMode: true,
  })

  // TODO: add means to endow entry with new references and pass a callback to assert it's been called.

  t.pass()
})

skipOnWindows('use lavamoat-run-command', (t) => {
  const projectRoot = `${__dirname}/projects/2`
  const lavamoatPath = `${__dirname}/../src/run-command.js`
  const output = execFileSync(
    lavamoatPath,
    [
      '--autorun',
      '--policyPath',
      './atob.policy.json',
      '--',
      'atob',
      'MTIzNDU2Cg==',
    ],
    { cwd: projectRoot, encoding: 'utf8' }
  )
  t.is(output.split('\n')[0], '123456', 'should return expected output')
})

test('call lavamoat-run-command via node', (t) => {
  const projectRoot = `${__dirname}/projects/2`
  const lavamoatPath = `${__dirname}/../src/run-command.js`
  const output = execFileSync(
    'node',
    [
      lavamoatPath,
      '--autorun',
      '--policyPath',
      './atob.policy.json',
      '--',
      'atob',
      'MTIzNDU2Cg==',
    ],
    { cwd: projectRoot, encoding: 'utf8' }
  )
  t.is(output.split('\n')[0], '123456', 'should return expected output')
})
