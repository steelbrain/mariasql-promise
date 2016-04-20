'use strict';

var _mariasql = require('mariasql');

var _mariasql2 = _interopRequireDefault(_mariasql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// More can be found in mariasql README

class MariaSQL {

  constructor() {
    this.connection = new _mariasql2.default();
  }
  connect(config) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var errorListener = function errorListener(error) {
        _this.connection.removeListener('error', errorListener);
        _this.connection.removeListener('ready', successListener);
        reject(error);
      };
      var successListener = function successListener() {
        _this.connection.removeListener('ready', successListener);
        _this.connection.removeListener('error', errorListener);
        resolve();
      };
      _this.connection.on('error', errorListener).on('ready', successListener).connect(config);
    });
  }
  prepare(query) {
    return this.connection.prepare(query);
  }
  query(query) {
    var _this2 = this;

    var params = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return new Promise(function (resolve, reject) {
      _this2.connection.query(query, params, function (error, rows) {
        if (error) {
          reject(error);
        } else resolve(rows);
      });
    });
  }
  getStatus() {
    if (this.connection.connecting) {
      return 'connecting';
    }
    if (this.connection.connected) {
      return 'connected';
    }
    return 'idle';
  }
  terminate() {
    this.connection.close();
  }
  dispose() {
    return this.connection.end();
  }
}

module.exports = MariaSQL;