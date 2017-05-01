require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');

var cors = require('cors');
var Spot = require('./spot');
var ClosingTime = require('./closingTime');
var SpotType = require('./spotType');
var StartTime = require('./startTime');
var User = require('./user');
var Review = require('./review');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//get all spots
app.get('/api/spots', function(request, response) {
	Spot.fetchAll().then(function(spots) {
		response.json({
			spots: spots
		});
	});
});



//get a spot by its by id
app.get('/api/spots/:id', function(request, response) {
	Spot
	.where('id',request.params.id)
	.fetch({
  require: true,
  withRelated: ['spotType', 'closingtime', 'startTime']
})
	.then(function(spots) {
		response.json({
			spots:spots
		});
}, function() {
		response.json({
			message:"Spot cannot be found"
		})
	});
});


 //get a single resource user
app.get('/api/users/:id', function(request, response) {
	User
	.where('id', request.params.id)
	.fetch({require: true})
	.then(function(users) {
		response.json({
			users: users
		});
	}, function() {
		response.json({
			error: "User cannot be found"
		});
	});
});

//add a user
// the credentials for this do not work when logging in but i do have another POST function
app.post('/api/users', function(request, response) {
	var user = new User({
		id: request.body.id,
		email: request.body.email,
		password: request.body.password,
		name: request.body.name

	});

	user.save().then(function() {
		response.json(user);
	});
});

//add a new spot
app.post('/api/spots', function(request, response) {
	var spot = new Spot({
		id: request.body.id,
		spotName: request.body.spotName,
		spot_type_id: request.body.spot_type_id,
		Wifi: request.body.Wifi,
		Outlets: request.body.Outlets,
		Address:  request.body.Address,
		closing_time_id: request.body.closing_time_id,
		imageURL: request.body.imageURL,
		start_time_id:request.body.starting_time_id
	});

	spot.save().then(function() {
		response.json(spot);
	});
});


//update a Spot
app.put('/api/spots/:id', function(request, response) {
  Spot
    .where('id', request.params.id)
    .fetch({ require: true })
    .then(function(spot) {
      spot.set('spotName', request.body.spotName);
      spot.set('spot_type_id', request.body.spot_type_id);
			spot.set('Wifi', request.body.Wifi);
			spot.set('Outlets', request.body.Outlets);
			spot.set('Address', request.body.Address);
			spot.set('closing_time_id', request.body.closing_time_id);
			spot.set('imageURL', request.body.imageURL);
			spot.set('starting_time_id', request.body.starting_time_id);

      return spot.save();
    }, function(e) {
      response.status(404).json({
        error: {
          message: 'Spot not found'
        }
      });
    })
    .then(function(spot) {
      response.json(spot);
    });
});




// update user
// the credentials for this do not work when logging in but i do have another PUT function
app.put('/api/users/:id', function(request, response) {
  var hashedPassword = passwordHash.generate(request.body.password);

  User
    .where('id', request.params.id)
    .fetch({ require: true })
    .then(function(user) {
      user.set('email', request.body.email);
      user.set('password', hashedPassword);
      return user.save();
    }, function(e) {
      response.status(404).json({
        error: {
          message: 'user not found'
        }
      });
    })
    .then(function(user) {
      response.json(user);
    });
});


//delete a single spot
app.delete('/api/spots/:id', function(request, response) {
  var spot = new Spot({
    id: request.params.id
  });

  spot
    .destroy({ require: true })
    .then(function(spot) {
      response.json(spot);
    }, function() {
      response.status(404).json({
        error: 'Spot not found'
      });
    });
});

//delete a single user
app.delete('/api/users/:id', function(request, response) {
  var user = new User({
    id: request.params.id
  });

  user
    .destroy({ require: true })
    .then(function(user) {
      response.json(user);
    }, function() {
      response.status(404).json({
        error: 'User not found'
      });
    });
});

app.listen(process.env.PORT || 3306);
