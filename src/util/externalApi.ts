export {};
const request = require('request');

function externalApiRequest(path, params) {
  return new Promise((resolve, reject) => {
    let host = 'https://www.mxnzp.com/api';
    let appid = '******';
    let app_secret = '********';
    if (!params) params = '';
    let url = `${host}${path}${params}app_id=${appid}&app_secret=${app_secret}`;
    request(url, function (error, response, body) {
      const { code, data, msg } = JSON.parse(body);
      if (code == 1) {
        resolve({ data, code: '200', message: '成功' });
      } else {
        resolve({ code: '500', message: '失败' });
      }
    });
  });
}

module.exports = { externalApiRequest };
