const express 		= 	require('express');
const path 			= 	require('path');
const bodyParser 	= 	require('body-parser');
const mongoose 		= 	require('mongoose');

// import Models
const Challenge = require('../models/Challenge');

// import config files
const configDB = require('../config/db.js');

mongoose.connect(configDB.url, { useMongoClient: true });

const PORT = process.env.PORT || 8080;

const app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/challenges/:category?', (req, res) => {
	const category = req.params.category;
	if (!category) {
		Challenge.find({})
			.exec((err, challenges) => {
				if (err) throw err;
				res.json(challenges);
			});
	} else {
		Challenge.find({
			category: category
		}).exec((err, challenges) => {
			if (err) throw err;
			res.json(challenges);
		});
	}
}); 

app.get('/challenge/:slug', (req, res) => {
	const slug = req.params.slug;
	Challenge.find({
		slug: slug
	}).exec((err, challenge) => {
		res.json(challenge);
	})
});

app.get('/users/')
app.get('/user/:user_id')

// POST requests

app.post("/add-challenge", (req, res) => {
    var title 		= 	req.body.title.trim(),
    	body		=	req.body.body.trim(),
    	slug		=	req.body.title.trim().replace(/\s+/g, "-").toLowerCase(),
    	author		=	req.body.author_id || 'user_id',
    	category	=	req.body.category;

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
});


app.listen(PORT, () => console.log(`App running on port ${PORT}`));