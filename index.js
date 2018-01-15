const flow = require('flow-parser')
const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const srcPath = path.resolve('/home/amp/Documents/wfp/src/MDCA-Project/mobile-client/js/common/mdca/state/system/sagas.js')
const src = fs.readFileSync(srcPath, 'utf8')
const parsed = flow.parse(src, {})

const isFnDeclaration = R.pathSatisfies(t => t === 'FunctionDeclaration', ['type'])
const isSagaFn = R.pathSatisfies(
  arg => arg.generator === true,
  ['body', 'body', 0, 'argument']
)
const sagas = R.filter(
  R.allPass([isFnDeclaration, isSagaFn]), parsed.body)

fs.writeFileSync(path.resolve(process.cwd(), './parsed.json'), JSON.stringify(sagas))
