class Client {
  constructor(worker) {
    this.worker = worker;
    this.canRefresh = true;
  }

  setAuthenticationPhoneNumber(phoneNumber) {
    this.worker.send({
      '@type': 'setAuthenticationPhoneNumber',
      phone_number: phoneNumber,
    });
  }

  checkAuthenticationPassword(password) {
    this.worker.send({
      '@type': 'checkAuthenticationPassword',
      password,
    });
  }

  /**
    https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1tdlib_parameters.html

    bool use_test_dc,
    string database_directory,
    string files_directory,
    bool use_file_database,
    bool use_chat_info_database,
    bool use_message_database,
    bool use_secret_chats,
    num api_id,
    string api_hash,
    string system_language_code,
    string device_model,
    string system_version,
    string application_version,
    bool enable_storage_optimizer,
    bool ignore_file_names
  */
  setTdlibParameters(parameters) {
    this.worker.send({
      '@type': 'setTdlibParameters',
      parameters: JSON.parse(parameters),
    });
  }

  setDatabaseEncryptionKey(encryptionKey) {
    this.worker.send({
      '@type': 'setDatabaseEncryptionKey',
      new_encryption_key_: encryptionKey,
    });
  }

  checkAuthenticationCode(code, firstName=undefined, lastName=undefined) {
    this.worker.send({
      '@type': 'checkAuthenticationCode',
      code,
      first_name: firstName,
      last_name: lastName,
    });
  }

  logOut() {
    this.worker.send({
      '@type': 'logOut',
    });
  }

  getAuthorizationState() {
    this.worker.send({
      '@type': 'getAuthorizationState',
    });
  }

  getChats() {
    this.worker.send({
      '@type': 'getChats',
      offset_order: 0,
      offset_chat_id: 2 ** 60,
      limit: 50,
    });
  }
}

export default Client;
