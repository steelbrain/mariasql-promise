'use babel'

import { Function } from 'loophole'

const Driver = require('../')

global.Function = Function

describe('MariaSQL', function() {
  it('works', function() {
    const db = new Driver()

    waitsForPromise(function() {
      return db.connect({
        host: '127.0.0.1',
        user: 'root',
        password: 'steel',
        db: 'information_schema'
      }).then(function() {
        console.log('connected')
        return db.query('Select 1 + 1 as result').then(function(results) {
          console.log(results[0].result) // Outputs 2
          const prepared = db.prepare('Select ? + ? as result')
          return db.query(prepared([1, 1])).then(function(rows) {
            console.log(rows[0].result)
            db.dispose()
          })
        })
      }, function(e) {
        console.log('Uh Oh, we have an error', e.message, e.stack)
        db.dispose()
      })
    })
  })
})
