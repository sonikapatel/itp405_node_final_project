var bookshelf = require('./bookshelf.js');

var closingtime = bookshelf.Model.extend({
  tableName: 'closingTimeTable'

});

module.exports = closingtime;
