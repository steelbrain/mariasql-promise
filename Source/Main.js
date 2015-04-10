

// @Compiler-Transpile "true"
// @Compiler-Output "../Dist/Main.js"
"use strict";
var
  Client = require('mariasql'),
  Promise = require('a-promise');
class MariaSQL{
  constructor(){
    this.Client = new Client();
  }
  connect(Config){
    return new Promise(function(Resolve, Reject){
      this.Client.connect(Config);
      this.Client.on('error', Reject).on('connect', Resolve);
    }.bind(this));
  }
  prepare(Query){
    return this.Client.prepare(Query);
  }
  query(Query, SecondArg){
    return new Promise(function(Resolve, Reject){
      var Event =
        typeof SecondArg === 'undefined' ? this.Client.query(Query) : this.Client.query(Query, SecondArg);
      var ToReturn = [];
      Event.on('result', function(Row){
        Row.on('row', function(row){
          ToReturn.push(row);
        }).on('error', Reject);
      }).on('end', function(){
        Resolve(ToReturn);
      });
    }.bind(this));
  }
  end(){
    this.Client.end();
  }
  destroy(){
    this.Client.destroy();
  }
}
module.exports = MariaSQL;