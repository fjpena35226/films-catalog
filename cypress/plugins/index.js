const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

const envFile = path.join(__dirname, `../../.env.${process.env.NODE_ENV}`)
const exists = fs.existsSync(envFile)

if (process.env.NODE_ENV && exists) {
  dotenv.config({
    path: envFile,
  })
} else
  dotenv.config({
    path: path.join(__dirname, '.env.production'),
  })

module.exports = (on, config) => {
  // copy any needed variables from process.env to config.env
  config.env.CYPRESS_BASE_URL = process.env.CYPRESS_BASE_URL

  // do not forget to return the changed config object!
  return config
}
