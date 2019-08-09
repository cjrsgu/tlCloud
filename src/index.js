const Client = require('./Client.js');

const client = new Client();

// Testing execute
console.log('execute', client.execute({
  '@type': 'getTextEntities',
  text: '@telegram /test_command https://telegram.org telegram.me',
}));

// Testing send
client.send({ '@type': 'getAuthorizationState' });

// Testing receive
console.log('receive', client.receive());

// Destroy client
client.destroy();
