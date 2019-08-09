require('dotenv').config();
const Client = require('./Client.js');

const client = new Client();

while (true) {
  const event = client.receive();
  console.log(event);
  if (event) {
    if (event['@type'] === 'updateConnectionState') {
      const connectionState = event.state;
      if (connectionState['@type'] === 'connectionStateReady') {
        client.send({
          '@type': 'getChats',
          limit: 10,
        });
      }
    }


    if (event['@type'] === 'updateAuthorizationState') {
      const authState = event.authorization_state;
      if (authState['@type'] === 'authorizationStateClosed') {
        break;
      }

      if (authState['@type'] === 'authorizationStateWaitTdlibParameters') {
        client.send({
          '@type': 'setTdlibParameters',
          parameters: {
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
          },
        });
      }

      if (authState['@type'] === 'authorizationStateWaitEncryptionKey') {
        client.send({
          '@type': 'setDatabaseEncryptionKey',
          new_encryption_key_: process.env.ENCRYPTION_KEY,
        });
      }

      if (authState['@type'] === 'authorizationStateWaitPhoneNumber') {
        client.send({
          '@type': 'setAuthenticationPhoneNumber',
          phone_number: process.env.PHONE,
        });
      }

      if (authState['@type'] === 'authorizationStateWaitCode') {
        client.send({
          '@type': 'checkAuthenticationCode',
          code: '',
        });
      }

      if (authState['@type'] === 'authorizationStateWaitPassword') {
        client.send({
          '@type': 'checkAuthenticationPassword',
          password: process.env.PASSWORD,
        });
      }
    }
  }
}

client.destroy();
