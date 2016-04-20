'use strict'

/* @flow */

import MaryaSQL from 'mariasql'

type Config = {
  host: string,
  user: string,
  password: string
} // More can be found in mariasql README

class MariaSQL {
  connection: MaryaSQL;

  constructor() {
    this.connection = new MaryaSQL()
  }
  connect(config: Config): Promise {
    return new Promise((resolve, reject) => {
      const errorListener = error => {
        this.connection.removeListener('error', errorListener)
        this.connection.removeListener('ready', successListener)
        reject(error)
      }
      const successListener = () => {
        this.connection.removeListener('ready', successListener)
        this.connection.removeListener('error', errorListener)
        resolve()
      }
      this.connection
        .on('error', errorListener)
        .on('ready', successListener)
        .connect(config)
    })
  }
  prepare(query: string): Object {
    return this.connection.prepare(query)
  }
  query(query: string | Object, params: ?Object | ?string = null): Promise {
    return new Promise((resolve, reject) => {
      this.connection.query(query, params, function(error, rows) {
        if (error) {
          reject(error)
        } else resolve(rows)
      })
    })
  }
  getStatus(): string {
    if (this.connection.connecting) {
      return 'connecting'
    }
    if (this.connection.connected) {
      return 'connected'
    }
    return 'idle'
  }
  terminate() {
    this.connection.close()
  }
  dispose() {
    return this.connection.end()
  }
}

module.exports = MariaSQL
