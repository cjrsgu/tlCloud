/* eslint-disable default-case */
import readlineLib from 'readline';
import Client from './Client';

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class App {
  constructor(controller) {
    this.client = new Client(controller);
  }

  auth = (event) => {
    switch (event['@type']) {
      case 'authorizationStateClosed':
        break;
      case 'authorizationStateClosing':
        break;
      case 'authorizationStateLoggingOut':
        break;
      case 'authorizationStateReady':
        break;
      case 'authorizationStateWaitCode': {
        readline.question("What's your code?", (code) => {
          this.client.checkAuthenticationCode(code);
          readline.close();
        });
        break;
      }
      case 'authorizationStateWaitEncryptionKey': {
        this.client.setDatabaseEncryptionKey(process.env.ENCRIPTION_KEY);
        break;
      }
      case 'authorizationStateWaitPassword': {
        readline.question("What's your password?", (password) => {
          this.client.checkAuthenticationPassword(password);
          readline.close();
        });
        break;
      }
      case 'authorizationStateWaitPhoneNumber': {
        readline.question("What's your phone number?", (phoneNumber) => {
          this.client.setAuthenticationPhoneNumber(phoneNumber);
          readline.close();
        });
        break;
      }
      case 'authorizationStateWaitTdlibParameters': {
        this.client.setTdlibParameters({
          database_directory: 'tdlib',
          use_test_dc: true,
          use_message_database: true,
          use_secret_chats: true,
          api_id: process.env.API_ID,
          api_hash: process.env.API_HASH,
          system_language_code: 'en',
          device_model: 'tlCloud',
          system_version: 'Windows',
          application_version: '0.0.1',
          enable_storage_optimizer: true,
        });
        break;
      }
    }
  };

  receiveResponse = (response) => {
    if (response) {
      switch (response['@type']) {
        case 'updateAuthorizationState': {
          this.auth(response.authorization_state);
        }
      }
    }
  };
}

export default App;
