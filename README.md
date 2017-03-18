MariaSQL-Promise
==============

[![Greenkeeper badge](https://badges.greenkeeper.io/steelbrain/mariasql-promise.svg)](https://greenkeeper.io/)
A lightweight Promise wrapper for [MariaSQL](1) that also works with MySQL. To see the list of available options, please have a look at [MariaSQL](1)'s README.

#### Installation

```bash
npm install mariasql-promise
```

#### Usage
```js
import MariaSQL from 'mariasql-promise'

const db = new MariaSQL()
db.connect({
  host: '127.0.0.1',
  user: 'test',
  password: 'test',
  db: 'test'
}).then(function() {
  console.log('connected')

  const selectQuery = db.query('Select 1 + 1 as result')
    .then(function(rows) {
      console.log('result was', rows[0].result)
    })
  const escapedQuery = db.query('Select * from users where id = ? LIMIT 1', [1])
    .then(function(rows) {
      console.log('the user was', rows.length ? 'found' : 'not found')
    })
  const parameterizedQuery = db.query('Select * from users where id = :id and name = :name LIMIT 1', [1, 'steel'])
    .then(function(rows) {
      console.log('steel was', rows.length ? 'found' : 'not found')
    })
  const preparedQuery = db.query(db.prepare('Select COUNT(users) as count from users as a where EXISTS(Select 1 from users where user.name = a.name AND user.id != a.id)'))
    .then(function(rows) {
      console.log('number of users with same name is', rows[0].count)
    })

  return Promise.all([selectQuery, escapedQuery, parameterizedQuery, preparedQuery])
}).catch(function(e) {
  console.log('We have a problem', e.message, e.stack)
})
```

#### API

```js
export class MariaDB {
  connect(config): Promise
  query(query, params = null): Promise<Array<Object>>
  prepare(query: String)
  terminate()
  dispose()
}
```

#### License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.

[1]:https://github.com/mscdex/node-mariasql
