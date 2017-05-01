var bookshelf = require('./bookshelf.js');

var SpotType = require('./spotType');
var closingtime = require('./closingtime');
var StartTime = require('./startTime');
var Spot = bookshelf.Model.extend({
	tableName: 'spots',
	spotType: function() {
		return this.belongsTo(SpotType,"spot_type_id");
	},
  closingtime: function() {
		return this.belongsTo(closingtime,"closing_time_id");
	},
	startTime:function(){
		return this.belongsTo(StartTime,"start_time_id");
	}
});

module.exports = Spot;
