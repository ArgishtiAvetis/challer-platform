const express 		= 	require('express');
const path 			= 	require('path');
const bodyParser 	= 	require('body-parser');
const mongoose 		= 	require('mongoose');

// import Models
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const Contribution = require('../models/Contribution');

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

app.get("/users/:id?", (req, res) => {
 const id = req.params.id;
 if(!id){
  User.find({})
   .exec((err, users) => {
    if(err) throw err;
    res.json(users);
   });
 } else {
  User.find({_id: id})
   .exec((err, users) => {
    if(err) throw err;
    res.json(users);
   });
 }
});

app.get('/:user_id/challenges', (req, res) => {
	const user_id = req.params.user_id;
	Challenge.find({
		_id: user_id
	}).exec((err, challenges) => {
		if (err) throw err;
		res.json(challenges);
	});
});	

app.get('/:challenge_id?/contributions/:user_id?', (req, res) => {
	const challenge_id = req.params.challenge_id;
	const user_id = req.params.user_id;

	if (!challenge_id && !user_id) {
		Contribution.find({}).exec((err, contributions) => {
			if (err) throw err;
			res.json(contributions);
		});		
	} else if (user_id && challenge_id) {
		Contribution.find({
			challenge: challenge_id,
			author: user_id
		}).exec((err, contributions) => {
			if (err) throw err;
			res.json(contributions);
		});
	} else if (challenge_id && !user_id) {
		Contribution.find({
			challenge: challenge_id
		}).exec((err, contributions) => {
			if (err) throw err;
			res.json(contributions);
		});
	} else if (!challenge_id && user_id) {
		Contribution.find({
			author: user_id
		}).exec((err, contributions) => {
			if (err) throw err;
			res.json(contributions);
		});		
	}

});

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

app.post("/add-user", (req, res) => {
	var name = req.body.name.trim();
	var email = req.body.email.trim();
	var password = req.body.password.trim();
	//var id = req.body.id;

	var newUser = new User({
		 name: name,
		 email: email,
		 password: password,
		 //id: id,
 	});

	newUser.save((err, newPost) => {
			if (err) {
			  	console.log(err);
			} else {
			  	console.log("Success!");
			  	res.json({"status": "Success!"});
			}
	});

});

app.post('/contribute', (req, res) => {
	var body = req.body.body.trim();
	var author = req.body.author.trim();
	var challenge = req.body.challenge.trim();
	//var id = req.body.id;

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
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
