const {compose, keys} = require('ramda')

const getCredentials = (userService) => {
  const appEnv = require("cfenv").getAppEnv();
  const config_services = appEnv.getServices();
  return (keys(config_services).length > 0) ? config_services[userService].credentials : undefined
}

const creds = (userService, defaultCreds) => userService ? userService : defaultCreds

module.exports = (input) => {
  let returnObj = {}
  keys(input).map((x) => {
    returnObj[x] = creds(getCredentials(x), input[x])
  })
  return returnObj
}
