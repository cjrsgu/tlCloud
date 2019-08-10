/* eslint-disable default-case */

const EventEmitter = require('events');

const Client = require('./Client.js');

class App {
  constructor() {
    this.emitter = new EventEmitter();
    this.client = new Client();
    this.isRunning = false;
  }

  on(event, callback) {
    this.emitter.on(event, callback);
  }

  send(obj) {
    this.client.send(obj);
  }

  start() {
    this.isRunning = true;
    this.startEventCycle();
  }

  stop() {
    this.isRunning = false;
    this.client.destroy();
  }

  startEventCycle() {
    while (this.isRunning) {
      const event = this.client.receive();

      if (event) {
        switch (event['@type']) {
          case 'updateConnectionState': {
            const connectionState = event.state;

            this.emitter.emit(connectionState['@type']);
            break;
          }
          case 'updateAuthorizationState': {
            const authState = event.authorization_state;

            this.emitter.emit(authState['@type']);
            break;
          }
        }
      }
    }
  }
}

module.exports = App;
