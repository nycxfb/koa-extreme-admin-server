export {};

const seq = require('../../db');
const { DataTypes } = require('sequelize');

const role = seq.define('role', {
  roleName: {
    type: DataTypes.CHAR,
    field: 'role_name'
  },
  roleType: {
    type: DataTypes.INTEGER,
    field: 'role_type'
  },
  createdAt: {
    type: DataTypes.CHAR,
    field: 'createdAt'
  }
});

module.exports = role;
