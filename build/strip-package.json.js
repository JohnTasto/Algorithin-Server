var jsonfile = require('jsonfile')

const package = jsonfile.readFileSync('./package.json')

delete package.devDependencies
package.scripts = { start: 'node index.js' }

jsonfile.writeFileSync('./dist/package.json', package, { spaces: 2 })
