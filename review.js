var bookshelf = require('./bookshelf');
var Spot = require('./spot');
var review = bookshelf.Model.extend({
  tableName: 'reviews'
});

module.exports = review;
