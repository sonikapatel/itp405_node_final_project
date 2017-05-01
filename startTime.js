var bookshelf = require('./bookshelf');

var StartTime = bookshelf.Model.extend({
  tableName: 'startingTimeTable'

});

module.exports = StartTime;
