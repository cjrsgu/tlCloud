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
    this.isAuthorizationStateReady = false;
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
        this.isAuthorizationStateReady = true;
        // this.client.createNewSupergroupChat('test', true, 'example');
        // this.client.getChats();
        // this.client.getGroupsInCommon(372112, 0, 10);
        // this.client.getChat(-1000010639255);
        // this.client.downloadFile(1, 25, 0, 0, false);
        // this.client.getRemoteFile('BQADAgADAQADZDN5StcQNU93kiXgAg', this.client.fileTypeDocument);
        // this.client.uploadFile(
        //   this.client.inputFileLocal(path.join(__dirname, '../logs.log.old')),
        //   this.client.fileTypeDocument,
        //   15,
        // );
        // this.client.sendMessage(
        //   -1000010639255,
        //   0,
        //   false,
        //   false,
        //   this.client.inputMessageText(this.client.formattedText('teest message', null)),
        // );
        // this.client.sendMessage(
        //   -1000010639255,
        //   0,
        //   false,
        //   false,
        //   this.client.inputMessageDocument(
        //     this.client.inputFileLocal(path.join(__dirname, '../logs.log.old')),
        //     null,
        //     this.client.formattedText('filllleleeee', null),
        //   ),
        // );
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
        this.client.setTdlibParameters(
          JSON.stringify({
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
          }),
        );
        break;
      }
    }
  };

  receiveResponse = (response) => {
    if (response) {
      // console.log(response['@type']);
      switch (response['@type']) {
        case 'updateAuthorizationState': {
          this.auth(response.authorization_state);
          break;
        }
        case 'error': {
          console.log(response.message);
          break;
        }
        case 'chats': {
          break;
        }
        case 'chat': {
          break;
        }
        case 'message': {
          break;
        }
        case 'file': {
          break;
        }
      }
    }
  };
}

export default App;
