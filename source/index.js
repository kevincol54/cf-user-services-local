const { keys } = require('ramda')
const appEnv = require('cfenv').getAppEnv()
const configServices = appEnv.getServices()

const getCredentials = (userService) => {
  console.log("userService", userService);
  console.log("configServices[userService]", configServices[userService]);
  return (keys(configServices).length > 0) ? ( (configServices[userService]) ? configServices[userService].credentials : undefined) : undefined
}

module.exports = (input) => {
  let returnObj = {}
  keys(input).map((serviceName) => {
    console.log("serviceName", serviceName);
    returnObj[serviceName] = getCredentials(serviceName) || input[serviceName]
  })
  return returnObj
}
