'use babel'

import MariaSQLVanilla from 'mariasql'

export class MariaSQL {
  constructor() {
    this.client = new MariaSQLVanilla()
  }
  connect(config) {
    return new Promise((resolve, reject) => {
      this.client.on('error', reject).on('ready', resolve)
      this.client.connect(config)
    })
  }
  get connected() {
    return this.client.connected
  }
  get connecting() {
    return this.client.connecting
  }
  query(query, params = null) {
    return new Promise((resolve, reject) => {
      this.client.query(query, params, function(error, rows) {
        if (error) {
          reject(error)
        } else resolve(rows)
      })
    })
  }
  prepare(query) {
    return this.client.prepare(query)
  }
  close() {
    // Terminate
    this.client.close()
  }
  end() {
    // Gracefully
    this.client.end()
  }
}
