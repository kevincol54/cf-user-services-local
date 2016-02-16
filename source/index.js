const {keys} = require('ramda')

const getCredentials = (userService) => {
  const appEnv = require('cfenv').getAppEnv()
  const config_services = appEnv.getServices()
  return (keys(config_services).length > 0) ? config_services[userService].credentials : undefined
}

module.exports = (input) => {
  let returnObj = {}
  keys(input).map((serviceName) => {
    const userService = getCredentials(serviceName)
    returnObj[serviceName] = userService || input[serviceName]
  })
  return returnObj
}
