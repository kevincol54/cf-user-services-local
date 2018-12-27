# CF_USER_SERVICES_LOCAL

## About

Simplifies the process of having your local(default configs) envs in the app and used during local development, but use your Cloud Foundry User Provided service when deployed. (You will need to bind your User Provided service to your app for this to work).

Pass your default configs into this module and have the UPS keys merged with the defaults where the UPS key takes priority.


## Usage

### Installation
```
npm install cf-user-services-local
```

### Example
```js
// These are your apps default configs
// The keys of this `defaultConfigs` object should be named the same as their associated User Provided service in CloudFoundry
var defaultConfigs = {
  service1: {
    foo: "bar",
    beep: "boop"
  },
  service2: {
    bar: "foo",
    boop: "beep"
  }
}

// Pass your defaults into the module
var configs = require('cf-user-services-local')(defaultConfigs)

console.log(configs);
// → Will return Cloud Foundry user-services if deployed, else will return your default configs

```

## Contributions

All comments, questions, etc. are encouraged and I ask you to post an issue with them in it.

This Project follows the StandardJS style guide.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

To Contribute:

- Fork Repo
- `npm install`
- Write Code
- Write Test(s)
- Update ReadMe
- Submit Pull Request


## Author

| [![twitter/kevco54](https://gravatar.com/avatar/c3f0cac49ad7d267cb58499a86bfdd19)](https://twitter.com/kevco54 "Follow @kevco54 on Twitter") |
|---|
| [Kevin Collins](https://iamkevin.co/) |

## License

_cf-user-services-local_ is available under the [MIT](https://mths.be/mit) license.
