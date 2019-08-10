import ffi from 'ffi-napi';
import ref from 'ref-napi';
import path from 'path';

class Client {
  constructor() {
    Client.addDllPath();
    this.tdlib = Client.configureTdlib();
    this.client = this.createClient();
  }

  static configureTdlib() {
    return ffi.Library('tdjson', {
      td_json_client_create: ['pointer', []],
      td_json_client_send: ['void', ['pointer', 'string']],
      td_json_client_receive: ['string', ['pointer', 'double']],
      td_json_client_execute: ['string', ['pointer', 'string']],
      td_json_client_destroy: ['void', ['pointer']],
    });
  }

  static buildQuery(query) {
    const buffer = Buffer.from(`${JSON.stringify(query)}\0`, 'utf-8');
    buffer.type = ref.types.CString;
    return buffer;
  }

  static addDllPath() {
    const dllPath = path.join(__dirname, '/tdlibdll');
    process.env.PATH = `${process.env.PATH};${dllPath}`;
  }

  createClient() {
    return this.tdlib.td_json_client_create();
  }

  send(query) {
    this.tdlib.td_json_client_send(this.client, Client.buildQuery(query));
  }

  execute(query) {
    return JSON.parse(this.tdlib.td_json_client_execute(this.client, Client.buildQuery(query)));
  }

  receive() {
    const timeout = 2;

    return JSON.parse(this.tdlib.td_json_client_receive(this.client, timeout));
  }

  destroy() {
    this.tdlib.td_json_client_destroy(this.client);
  }
}

export default Client;
