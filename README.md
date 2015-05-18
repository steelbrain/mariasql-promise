MariaSQL-Promise
==============
A lightweight Promise wrapper for MariaSQL (MySQL Compatible).

### Installation

```bash
npm install mariasql-promise
```

### Usage
Without Mariasql-Promise
```js
var Client = require('mariasql');

var c = new Client();
c.connect({
  host: '127.0.0.1',
  user: 'foo',
  password: 'bar'
});

c.on('connect', function() {
   var Rows = [];
   var TheError = null;
   c.query('SHOW DATABASES')
     .on('result', function(res) {
       res.on('row', function(row) {
         Rows.push(row);
       })
       .on('error', function(err) {
         TheError = err;
       })
       .on('end', function(info) {
         if(TheError !== null){
           console.log("Uh Oh, We have an error.");
           c.end();
         } else {
           console.log(Rows[0].result); // Outputs '2'
           c.end();
         }
       });
     })
     .on('end', function() {
       console.log('Done with all results');
     });
 })
 .on('error', function(err) {
   console.log('Client error: ' + err);
 });
```
With Mariasql-Promise
```js
var Driver = require('mariasql-promise');
var Maria = new Driver;
Maria.connect({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  db: 'database'
}).then(function(){
  Maria.query("Select 1 + 1 as result").then(function(Results){
    console.log(Results[0].result); // Outputs 2
    Maria.end();
  }, function(){
    console.log("Uh Oh, we have an error");
    Maria.end();
  });
});
```

### License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.
