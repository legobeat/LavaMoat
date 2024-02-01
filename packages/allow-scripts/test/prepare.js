const { execSync } = require('child_process')
const { readdirSync } = require('fs')
const { join } = require('path')

// Execute allow-scripts command inside each test project directory
readdirSync(join(__dirname, '../test/projects/'), { withFileTypes: true })
  .filter((p) => p.isDirectory())
  .forEach((dir) => {
    execSync('node ../../../src/cli.js auto --experimental-bins', {
      cwd: join(__dirname, '../test/projects/', dir.name),
      stdio: 'inherit',
    })
  })
