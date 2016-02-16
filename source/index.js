const {keys} = require('ramda')
const appEnv = require('cfenv').getAppEnv()
const configServices = appEnv.getServices()

const getCredentials = (userService) => {
  return (keys(configServices).length > 0) ? configServices[userService].credentials : undefined
}

module.exports = (input) => {
  let returnObj = {}
  keys(input).map((serviceName) => {
    const userService = getCredentials(serviceName)
    returnObj[serviceName] = userService || input[serviceName]
  })
  return returnObj
}
