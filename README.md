MySQL-Promise
==============
A lightweight Promise wrapper for MariaSQL (MySQL Compatible).

#### Installation

```bash
npm install mysql-promise
```

#### Usage

A codeblock says it all
```js
var Driver = require('mysql-promise');
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

#### License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.