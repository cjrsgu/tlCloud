/* eslint-disable default-case */
import readline from 'readline';

class App {
  constructor(client, worker) {
    this.client = client;
    this.worker = worker;
    this.client.getAuthorizationState();
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
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
        this.readline.question("What's your code?", (code) => {
          console.log('Your code:', code);
          this.client.checkAuthenticationCode(code);
          this.readline.close();
        });
        break;
      }
      case 'authorizationStateWaitEncryptionKey': {
        this.client.setDatabaseEncryptionKey(process.env.ENCRIPTION_KEY);
        break;
      }
      case 'authorizationStateWaitPassword': {
        this.readline.question("What's your password?", (password) => {
          console.log('Your password:', password);
          this.client.checkAuthenticationPassword(password);
          this.readline.close();
        });
        break;
      }
      case 'authorizationStateWaitPhoneNumber': {
        this.readline.question("What's your phone number?", (phoneNumber) => {
          console.log('Your phone:', phoneNumber);
          this.client.setAuthenticationPhoneNumber(phoneNumber);
          this.readline.close();
        });
        break;
      }
      case 'authorizationStateWaitTdlibParameters': {
        this.client.setTdlibParameters(JSON.stringify({
          use_test_dc: true,
          database_directory: 'tdlib',
          use_message_database: true,
          use_secret_chats: true,
          api_id: process.env.API_ID,
          api_hash: process.env.API_HASH,
          system_language_code: 'en',
          device_model: 'tlCloud',
          system_version: 'Windows',
          application_version: '1.0',
          enable_storage_optimizer: true,
        }));
        break;
      }
    }
  };

  receiveResponse = (response) => {
    if (response) {
      switch (response['@type']) {
        case 'updateAuthorizationState': {
          this.auth(response.authorization_state);
          break;
        }
      }
    }
  };
}

export default App;
