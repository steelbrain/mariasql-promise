MariaSQL-Promise
==============
A lightweight Promise wrapper for [MariaSQL](1) (MySQL Compatible).

#### Installation

```bash
npm install mariasql-promise
```

#### Usage
```js
import {MariaSQL} from 'mariasql-promise'

const db = new MariaSQL()
db.connect({
  host: '127.0.0.1',
  user: 'test',
  password: 'test',
  db: 'test'
}).then(function() {
  console.log('connected')

  return db.query('Select 1 + 1 as result').then(function(results){
    console.log(results[0].result) // Outputs 2

    const prepared = db.prepare('Select ? + ? as result')

    return db.query(prepared([1, 1])).then(function(results) {
      console.log(results[0].result)
      db.end()
    })
  })
}, function(e) {
  console.log('We have a problem', e.message, e.stack)
})
```

#### API
```js
export class MariaDB {
  connected: Boolean
  connecting: Boolean

  constructor()
  connect(config): Promise
  query(query, params = null): Promise<Array<Object>>
  prepare(query: String)
  close() // Terminate
  end() // Gracefully
}
```
#### License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.

[1]:https://github.com/mscdex/node-mariasql
