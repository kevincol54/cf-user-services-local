const test = require('tap').test
const rewire = require('rewire')
const buildConfigs = require('../distribution')
const mockInput = {
  'couchdb': {
    username: 'admin',
    password: 'admin',
    host: 'localhost',
    port: '5984'
  },
  'mysql': {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'foo_db'
  }
}

const expectedOutput = {
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

test('index.js', (t) => {
  t.test('Should return default configs if no user services', (tt) => {
    tt.same(buildConfigs(mockInput), mockInput, 'expect default configs returned')
    tt.end()
  })

  t.test('Should return user services if exists', (tt) => {
    var buildConfigsMock = rewire('../distribution')
    buildConfigsMock.__set__('configServices', {
      mysql: {
        credentials: expectedOutput.mysql
      },
      couchdb: {
        credentials: expectedOutput.couchdb
      }
    })
    tt.same(buildConfigsMock(mockInput), expectedOutput, 'expect user services returned')
    tt.end()
  })

  t.end()
})
