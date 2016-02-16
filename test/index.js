var test = require('tap').test
var buildCreds = require('../distribution')
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
  var results = buildCreds(mockInput)
  t.same(results, expectedOutput, 'Should return user service if exists')
  t.ok(true, 'dummy test to make sure tests are setup right')
  t.end()
})