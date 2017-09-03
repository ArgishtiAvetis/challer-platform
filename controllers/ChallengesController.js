const mongoose = require('mongoose');

// import Challenge model
const Challenge = require('../models/Challenge');

module.exports = {
	add: function(req, res) {
	    var title 		= 	req.body.title.trim(),
	    	body		=	req.body.body.trim(),
	    	slug		=	req.body.title.trim().replace(/\s+/g, "-").toLowerCase(),
	    	author		=	req.body.author_id || 'user_id',
	    	category	=	req.body.category;

	    Challenge.findOne({
	    	slug: slug
	    }).exec((err, unique) => {
	    	if (err) {
	    		console.log(err);
	    	} else {
	    		if (unqiue != []) {
	    			slug = slug + "-" + Date.now().substr(0, 3);
	    		}
	    	}
	    });

		var newChallenge = new Challenge({
			title: title,
			body: body,
			category: category,
			slug: slug,
			author: author,
		});

		newChallenge.save((err, newPost) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Success!");
				res.json({
					"status": "success"
				});
			}
		});
	},
	edit: function(req, res) {
	    var id 			= 	req.body.id.trim(),
	    	title 		= 	req.body.title.trim(),
	    	body		=	req.body.body.trim(),
	    	category	=	req.body.category;

		Challenge.update({
		  _id: id
		}, {
	        $set: {
				title: title,
				body: body,
				category: category
			}
		}, () => res.json({success: true, message: "Challenge successfully updated."}));
	}
}
