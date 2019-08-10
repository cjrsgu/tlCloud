import cluster from 'cluster';
import './bootstrap';
import controller from './ClientController';
import App from './App';

if (cluster.isMaster) {
  cluster.fork();

  const { workers } = cluster;
  const app = new App(controller);

  Object.keys(workers).forEach((key) => {
    workers[key].on('message', (response) => {
      app.receiveResponse(response);
    });
  });
} else {
  while (true) {
    const message = controller.receive();
    process.send(message);
  }
}
