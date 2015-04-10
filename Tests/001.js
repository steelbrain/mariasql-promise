

"use strict";
var Maria = new(require('../Main'));
Maria.connect({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  db: 'quickpress'
}).then(function(){
  Maria.query("Select 1 + 1 as result").then(function(Results){
    console.log(Results[0].result);
    Maria.end();
  }, function(){
    console.log("Uh Oh, we have an error");
    Maria.end();
  });
});