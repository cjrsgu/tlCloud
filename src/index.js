import cluster from 'cluster';
import './bootstrap';
import ClientController from './ClientController';
import Client from './Client';
import App from './App';

if (cluster.isMaster) {
  const worker = cluster.fork();
  const client = new Client(worker);
  const app = new App(client, worker);

  worker.on('message', (response) => {
    if (response) {
      worker.send('');
      app.receiveResponse(JSON.parse(response));
    }
  });
} else {
  const controller = new ClientController();
  controller.enableLogFile();

  process.on('message', (query) => {
    if (query) controller.send(JSON.stringify(query));

    process.send(controller.receive());
  });
}
