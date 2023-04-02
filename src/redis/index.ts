const redis = require('redis');

export default class config {
  public static readonly REDIS = {
    PORT: 6379,
    HOST: '127.0.0.1',
    PASSWORD: 'admin',
    DB: 0
  };
}
