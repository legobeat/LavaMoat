const test = require('ava')
const { execSync } = require('child_process')
const path = require('path')
const { evalBundle } = require('./util')

test('lavamoat-node compat - bundle works under lavamoat node', (t) => {
  let bundle
  try {
    bundle = execSync(
      [
        'node',
        '../node/src/cli.js',
        'test/fixtures/secureBundling/build.js',
        '--projectRoot',
        '.',
        '--policyPath',
        'test/fixtures/secureBundling/lavamoat/node/policy.json',
      ].join(' '),
      {
        cwd: path.resolve(__dirname, '../'),
        maxBuffer: 8192 * 10000,
      }
    )
  } catch (err) {
    if (err.stderr) {
      // eslint-disable-next-line ava/assertion-arguments
      return t.fail(err.stderr.toString())
    } else {
      throw err
    }
  }
  t.pass('bundling works under lavamoat node')
  const testResult = evalBundle(bundle.toString(), { console })
  t.is(
    testResult.value,
    'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    'bundle works as expected'
  )
})
