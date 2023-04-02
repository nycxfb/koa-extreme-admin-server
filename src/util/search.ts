const seq = require('sequelize');
const Op = seq.Op;

function fuzzySearch(params, whereObj = {}) {
  if (params && Object.keys(params).length > 0) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        Object.assign(whereObj, {
          [key]: {
            [Op.like]: `%${params[key]}%`
          }
        });
      }
    }
  }
  return whereObj;
}

module.exports = fuzzySearch;
