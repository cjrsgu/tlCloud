import ffi from 'ffi-napi';
import ref from 'ref-napi';
import path from 'path';

class ClientController {
  constructor() {
    this.configureDllPath();
    this.tdlib = this.createTdlib();
    this.client = this.createClient();
  }

  createTdlib = () => ffi.Library('tdjson', {
    td_json_client_create: ['pointer', []],
    td_json_client_send: ['void', ['pointer', 'string']],
    td_json_client_receive: ['string', ['pointer', 'double']],
    td_json_client_execute: ['string', ['pointer', 'string']],
    td_json_client_destroy: ['void', ['pointer']],
    td_set_log_verbosity_level: ['void', ['int']],
    td_set_log_file_path: ['int', ['string']],
  });

  disableLogs() {
    this.tdlib.td_set_log_verbosity_level(1);
  }

  enableLogFile() {
    const logPath = path.join(__dirname, '../logs.log');
    this.tdlib.td_set_log_file_path(logPath);
  }

  buildQuery = (query) => {
    const buffer = Buffer.from(`${JSON.stringify(JSON.parse(query))}\0`, 'utf-8');
    buffer.type = ref.types.CString;
    return buffer;
  };

  configureDllPath = () => {
    const dllPath = path.join(__dirname, '../tdlibdll');
    process.env.PATH = `${process.env.PATH};${dllPath}`;
  };

  createClient() {
    return this.tdlib.td_json_client_create();
  }

  send(query) {
    this.tdlib.td_json_client_send(this.client, this.buildQuery(query));
  }

  execute(query) {
    return JSON.parse(this.tdlib.td_json_client_execute(this.client, this.buildQuery(query)));
  }

  receive() {
    const timeout = 2;

    return this.tdlib.td_json_client_receive(this.client, timeout);
  }

  getTdJsonClientReceive() {
    return this.tdlib.td_json_client_receive;
  }

  destroy() {
    this.tdlib.td_json_client_destroy(this.client);
  }
}

export default ClientController;
