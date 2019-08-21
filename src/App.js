import readline from 'readline';

import FileController from './FileController';

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
    this.pathToFolder = '../cloud/';

    setInterval(() => {
      if (this.chats !== undefined) {
        this.chats.forEach((chatId) => {
          console.log(chatId);
          this.client.sendChatAction(
            chatId,
            this.client.chatActionTyping(),
          );
        });
      }
    }, 2000);
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
        // this.readline.question("Enter path to folder: ", (path) => {
        //   console.log('Your path:', path);
        //   this.pathToFolder = path;
        //    this.fileController = new FileController(this.pathToFolder)
        // });

        // this.readline.question("Create new channel? y/n ", (answer) => {
        //   if (answer === 'y') {
        //     this.client.createNewSupergroupChat('cloud', true, 'cloud');
        //   }
        // });

        // this.client.createNewSupergroupChat('test', true, 'example');
        this.client.getChats(
          '9223372036854775807',
          '9223372036854775807',
          200,
        );

        // this.client.getGroupsInCommon(372112, 0, 10);
        // this.client.createNewSupergroupChat('cloud14', true, 'cloud14')
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
        this.readline.question("What's your code?\n", (code) => {
          console.log('Your code:', code);
          this.client.checkAuthenticationCode(code);
        });
        break;
      }
      case 'authorizationStateWaitEncryptionKey': {
        this.client.setDatabaseEncryptionKey(process.env.ENCRIPTION_KEY);
        break;
      }
      case 'authorizationStateWaitPassword': {
        this.readline.question("What's your password?\n", (password) => {
          console.log('Your password:', password);
          this.client.checkAuthenticationPassword(password);
        });
        break;
      }
      case 'authorizationStateWaitPhoneNumber': {
        this.readline.question("What's your phone number?\n", (phoneNumber) => {
          console.log('Your phone:', phoneNumber);
          this.client.setAuthenticationPhoneNumber(phoneNumber);
        });
        break;
      }
      case 'authorizationStateWaitTdlibParameters': {
        this.client.setTdlibParameters(
          JSON.stringify({
            use_test_dc: false,
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
      default: {
        break;
      }
    }
  };

  receiveResponse = (response) => {
    if (response) {
      this.client.forceUpdate();
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
          console.log(response.chat_ids);
          this.chats = response.chat_ids;
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
        case 'updates': {
          break;
        }
        case 'updateNewChat': {
          if (response.chat === 'cloud') {
            this.cloudChatId = response.id.slice();
            // console.log(this.cloudChatId);
          }
          break;
        }
        case 'updateNewChannelMessage': {
          break;
        }
        case 'updateChatLastMessage': {
          console.log(response.last_message.content.text && response.last_message.content.text.text)
          break;
        }
        default: {
          break;
        }
      }
    }
  };
}

export default App;
