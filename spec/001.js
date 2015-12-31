

"use strict";
var Driver = require('../Main');
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