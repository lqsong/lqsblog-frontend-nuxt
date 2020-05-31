const fs = require('fs')
const dotenv = require('dotenv')

function getEnvFileName () {
  let envFileName = '.env.' + process.env.NODE_ENV
  if (!fs.existsSync(envFileName)) {
    envFileName = '.env'
  }
  return envFileName
}

function setEnv (envName) {
  const filename = envName || '.env'
  const envConfig = dotenv.parse(fs.readFileSync(filename))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

module.exports = {
  getEnvFileName,
  setEnv
}
