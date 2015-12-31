'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MariaSQL = undefined;

var _mariasql = require('mariasql');

var _mariasql2 = _interopRequireDefault(_mariasql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MariaSQL {
  constructor() {
    this.client = new _mariasql2.default();
  }
  connect(config) {
    return new Promise((resolve, reject) => {
      this.client.on('error', reject).on('ready', resolve);
      this.client.connect(config);
    });
  }
  get connected() {
    return this.client.connected;
  }
  get connecting() {
    return this.client.connecting;
  }
  query(query) {
    let params = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return new Promise((resolve, reject) => {
      this.client.query(query, params, function (error, rows) {
        if (error) {
          reject(error);
        } else resolve(rows);
      });
    });
  }
  prepare(query) {
    return this.client.prepare(query);
  }
  close() {
    // Terminate
    this.client.close();
  }
  end() {
    // Gracefully
    this.client.end();
  }
}
exports.MariaSQL = MariaSQL;