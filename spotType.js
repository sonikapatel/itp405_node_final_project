var bookshelf = require('./bookshelf');

var SpotType = bookshelf.Model.extend({
  tableName: 'spotTypeTable'

});

module.exports = SpotType;
