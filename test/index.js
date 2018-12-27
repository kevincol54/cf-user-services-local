const test = require('tap').test
const rewire = require('rewire')
const buildConfigs = require('../distribution')
const defaultValues = {
  'couchdb': {
    username: 'admin',
    password: 'admin',
    host: 'localhost',
    port: '5984',
    url: 'http://notInUpsDefinition'
  },
  'mysql': {
    host: '127.0.0.1',
    username: 'root',
    password: '',
    database: 'foo_db'
  },
  'no-service': {
    key: 'value'
  }
}

const upsDefinitions = {
  'couchdb': {
    host: 'couchdb-develop.net',
    password: 'password',
    port: '5984',
    serviceName: 'couchdb',
    username: 'user'
  },
  'mysql': {
    database: 'foo_db',
    host: 'mysql-develop.net',
    password: 'password',
    port: '3306',
    serviceName: 'mysql',
    uri: 'mysql://user:password@mysql-develop.net:3306/foo_db',
    username: 'user'
  }
}

const expectedOutput = {
  'couchdb': {
    host: 'couchdb-develop.net',
    password: 'password',
    port: '5984',
    serviceName: 'couchdb',
    username: 'user',
    url: 'http://notInUpsDefinition'
  },
  'mysql': {
    database: 'foo_db',
    host: 'mysql-develop.net',
    password: 'password',
    port: '3306',
    serviceName: 'mysql',
    uri: 'mysql://user:password@mysql-develop.net:3306/foo_db',
    username: 'user'
  },
  'no-service': {
    key: 'value'
  }
}

test('index.js', (t) => {
  t.test('Should return default configs if no user services', (tt) => {
    tt.same(buildConfigs(defaultValues), defaultValues, 'expect default configs returned')
    tt.end()
  })

  t.test('Should return user services if exists', (tt) => {
    let buildConfigsMock = rewire('../distribution')
    buildConfigsMock.__set__('configServices', {
      mysql: {
        credentials: upsDefinitions.mysql
      },
      couchdb: {
        credentials: upsDefinitions.couchdb
      }
    })

    tt.same(buildConfigsMock(defaultValues), expectedOutput, 'expect merged user services returned')
    tt.end()
  })

  t.end()
})
