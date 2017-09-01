const mongoose = require('mongoose');

// import User model
const User = require('../models/User');

module.exports = {
	add: function(req, res) {
		var name 		= 	req.body.name.trim(),
			email 		= 	req.body.email.trim(),
			password 	= 	req.body.password.trim();

		var newUser = new User({
			 name: name,
			 email: email,
			 password: password
	 	});

		newUser.save((err, newPost) => {
				if (err) {
				  	console.log(err);
				} else {
				  	console.log("Success!");
				  	res.json({"status": "Success!"});
				}
		});
	},
	edit: function(req, res) {
		var id 			= 	req.body.id.trim(),
			name 		= 	req.body.name.trim(),
			email 		= 	req.body.email.trim(),
			password 	= 	req.body.password.trim();

		User.update({
		  _id: id
		}, {
	        $set: {
				name: name,
				email: email,
				password: password
			}
		}, () => res.json({success: true, message: "User successfully updated."}));
	}
}