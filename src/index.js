import './bootstrap';
import App from './App';

const app = new App();

app.on('connectionStateReady', (state) => {
  console.log('connectonStateReady', state);
});

app.on('authorizationStateWaitTdlibParameters', () => {
  app.send({
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
});

app.on('authorizationStateWaitEncryptionKey', () => {
  app.send({
    '@type': 'setDatabaseEncryptionKey',
    new_encryption_key_: process.env.ENCRYPTION_KEY,
  });
});

app.on('authorizationStateWaitPhoneNumber', () => {
  app.send({
    '@type': 'setAuthenticationPhoneNumber',
    phone_number: process.env.PHONE,
  });
});

app.on('authorizationStateWaitCode', () => {
  app.send({
    '@type': 'checkAuthenticationCode',
    code: '',
  });
});

app.on('authorizationStateWaitPassword', () => {
  app.send({
    '@type': 'checkAuthenticationPassword',
    password: process.env.PASSWORD,
  });
});

app.start();
