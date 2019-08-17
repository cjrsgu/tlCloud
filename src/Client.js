class Client {
  constructor(worker) {
    this.worker = worker;
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

  checkAuthenticationCode(code, firstName = undefined, lastName = undefined) {
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

  getChats(offsetOrder, offsetChatId, limit) {
    this.worker.send({
      '@type': 'getChats',
      offset_order: offsetOrder,
      offset_chat_id: offsetChatId,
      limit,
    });
  }

  createNewSupergroupChat(title, isChannel, description) {
    this.worker.send({
      '@type': 'createNewSupergroupChat',
      title,
      is_channel: isChannel,
      description,
    });
  }

  getGroupsInCommon(userId, offsetChatId, limit) {
    this.worker.send({
      '@type': 'getGroupsInCommon',
      user_id: userId,
      offset_chat_id: offsetChatId,
      limit,
    });
  }

  formattedText = (text, entities) => ({
    '@type': 'formattedText',
    text,
    entities,
  });

  inputMessageText = (text, disableWebPagePreview = false, clearDraft = false) => ({
    '@type': 'inputMessageText',
    text,
    disable_web_page_preview: disableWebPagePreview,
    clear_draft: clearDraft,
  });

  inputMessageDocument = (document, thumbnail, caption) => ({
    '@type': 'inputMessageDocument',
    document,
    thumbnail,
    caption,
  });

  sendMessage(chatId, replyToMessageId, disableNotification, fromBackground, inputMessageContent) {
    this.worker.send({
      '@type': 'sendMessage',
      chat_id: chatId,
      reply_to_message_id: replyToMessageId,
      disable_notification: disableNotification,
      from_background: fromBackground,
      input_message_content: inputMessageContent,
    });
  }

  uploadFile(file, fileType, priority) {
    this.worker.send({
      '@type': 'uploadFile',
      file,
      file_type: fileType,
      priority,
    });
  }

  inputFileLocal = path => ({
    '@type': 'inputFileLocal',
    path,
  });

  fileTypeDocument = () => ({
    '@type': 'fileTypeDocument',
  });

  destroy() {
    this.worker.send({
      '@type': 'destroy',
    });
  }

  getChat(catId) {
    this.worker.send({
      '@type': 'getChat',
      chat_id: catId,
    });
  }

  downloadFile(fileId, priority, offset, limit, synchronous) {
    this.worker.send({
      '@type': 'downloadFile',
      file_id: fileId,
      priority,
      offset,
      limit,
      synchronous,
    });
  }

  getRemoteFile(remoteFileId, fileType) {
    this.worker.send({
      '@type': 'getRemoteFile',
      remote_file_id: remoteFileId,
      file_type: fileType,
    });
  }
}

export default Client;
