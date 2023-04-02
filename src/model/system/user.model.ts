export {};

const { DataTypes } = require('sequelize');
const seq = require('../../db');

const user = seq.define('user', {
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  nickname: {
    type: DataTypes.CHAR,
    field: 'nickname'
  },
  roleType: {
    type: DataTypes.CHAR,
    field: 'role_type'
  },
  avatarUrl: {
    type: DataTypes.CHAR,
    field: 'avatar_url'
  },
  phone: {
    type: DataTypes.CHAR
  },
  address: {
    type: DataTypes.CHAR
  },
  age: {
    type: DataTypes.INTEGER
  },
  password: {
    type: DataTypes.INTEGER
  }
});

module.exports = user;
