'use strict'

const Driver = require('../').MariaSQL
const db = new Driver()
db.connect({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  db: 'information_schema'
}).then(function(){
  console.log('connected')
  return db.query('Select 1 + 1 as result').then(function(results){
    console.log(results[0].result) // Outputs 2
    const prepared = db.prepare('Select ? + ? as result')
    return db.query(prepared([1, 1])).then(function(results) {
      console.log(results[0].result)
      db.end()
    })
  })
}, function(e){
  console.log('Uh Oh, we have an error', e.message, e.stack)
  db.end()
})
