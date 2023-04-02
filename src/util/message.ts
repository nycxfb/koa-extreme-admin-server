class Message {
  successMessage(code, message, data) {
    return {
      code: 200 || code,
      message: message || '操作成功',
      data: data || null
    };
  }

  errMessage(code, message, data) {
    return {
      code: 500 || code,
      message: message || '操作失败',
      data: data || null
    };
  }
}

module.exports = new Message();
