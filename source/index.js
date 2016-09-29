const { keys, compose, mapObjIndexed } = require('ramda')
const cfenv = require('cfenv');

const getCredentials = (userService) => {
  const configServices = cfenv.getAppEnv().getServices();
  return (keys(configServices).length > 0) ? ( (configServices[userService]) ? configServices[userService].credentials : undefined ) : undefined
}

const replace = (num, serviceName, obj) => { 
  const creds = getCredentials(serviceName) 
  return creds ? creds : obj[serviceName]
}

module.exports = mapObjIndexed(replace)
