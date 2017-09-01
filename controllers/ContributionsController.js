const mongoose = require('mongoose');

// import Contribution model
const Contribution = require('../models/Contribution');

module.exports = {
	add: function(req, res) {
		var body 		= 	req.body.body.trim(),
			author 		= 	req.body.author.trim(),
			challenge 	= 	req.body.challenge.trim();

		var newContribution = new Contribution({
			body: body,
			author: author,
			challenge: challenge
	 	});

		newContribution.save((err, newPost) => {
			if (err) {
			  	console.log(err);
			} else {
			  	console.log("Success!");
			  	res.json({"status": "Success!"});
			}
		});
	},
	edit: function(req, res) {
		var id 			=   req.body.id.trim(),
			body 		= 	req.body.body.trim();

		Contribution.update({
		  _id: id
		}, {
	        $set: {
				body: body
			}
		}, () => res.json({success: true, message: "Contribution successfully updated."}));
	}
}