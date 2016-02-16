var test = require('tap').test
var buildConfigs = require('../distribution')
var mockInput = {
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

var expectedOutput = {
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
    var results = buildConfigs(mockInput)
    tt.same(results, mockInput, 'expect default configs returned')
    tt.end()
  })

  t.test('Should return user services if exists', (tt) => {
    var results = buildConfigs(mockInput)
    tt.same(results, expectedOutput, 'expect user services returned')
    tt.end()
  })

  t.end()
})