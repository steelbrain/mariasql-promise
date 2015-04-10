var IsIoJS = parseInt(process.version.substr(1)) > 0;
if(IsIoJS){
  var v8 = require('v8');
  v8.setFlagsFromString('--harmony_classes');
  v8.setFlagsFromString('--harmony_object_literals');
  v8.setFlagsFromString('--harmony_tostring');
  module.exports = require('./Source/Main');
} else {
  module.exports = require('./Dist/Main');
}