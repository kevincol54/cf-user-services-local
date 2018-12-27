const { keys, mergeRight } = require('ramda')
const appEnv = require('cfenv').getAppEnv()
const configServices = appEnv.getServices()

const getCredentials = (userService) => {
  return (keys(configServices).length > 0) ? ((configServices[userService]) ? configServices[userService].credentials : undefined) : undefined
}

module.exports = (input) => {
  let returnObj = {}
  keys(input).map((serviceName) => {
    returnObj[serviceName] = mergeRight(input[serviceName], getCredentials(serviceName))
  })
  return returnObj
}
