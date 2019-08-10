class Client {
  constructor(controller) {
    this.controller = controller;
    this.controller.enableLogFile();
  }

  setAuthenticationPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
    this.controller.send({
      '@type': 'setAuthenticationPhoneNumber',
      phone_number: this.phoneNumber,
    });
  }

  checkAuthenticationPassword(password) {
    this.controller.send({
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
    this.controller.send({
      '@type': 'setTdlibParameters',
      parameters,
    });
  }

  setDatabaseEncryptionKey(encryptionKey) {
    this.controller.send({
      '@type': 'setDatabaseEncryptionKey',
      new_encryption_key_: encryptionKey,
    });
  }

  checkAuthenticationCode(code) {
    this.controller.send({
      '@type': 'checkAuthenticationCode',
      code,
    });
  }
}

export default Client;
