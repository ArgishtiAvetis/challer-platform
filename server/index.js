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


app.get('/challenges/:category?/:type?', (req, res) => {
	const category 	= req.params.category;
	const type 		= req.params.type;

	if (!category && !type) {
		Challenge.find({})
			.exec((err, challenges) => {
				if (err) res.json({ message: "Data doesn't exist." });
				res.json(challenges);
			});
	} else if (category && !type) {
		Challenge.find({
			category: category
		}).exec((err, challenges) => {
			if (err) res.json({ message: "Data doesn't exist." });
			res.json(challenges);
		});
	} else if ((category == 'type') && type) {
		Challenge.find({
			type: type
		}).exec((err, challenges) => {
			if (err) res.json({ message: "Data doesn't exist." });
			res.json(challenges);
		});
	} else {
		Challenge.find({
			category: category,
			type: type
		}).exec((err, challenges) => {
			if (err) res.json({ message: "Data doesn't exist." });
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
		if(err) {
			res.json({ message: "Data doesn't exist." });
		} else {
			res.json(users);
		}
	  });
	} else {
	 User.find({_id: id})
	  .exec((err, users) => {
	   	if(err) {
			res.json({ message: "Data doesn't exist." });
	   	} else {
	   		res.json(users);
	   	}
	  });
	}
});

app.get('/:user_id/challenges', (req, res) => {
	const user_id = req.params.user_id;
	Challenge.find({
		_id: user_id
	}).exec((err, challenges) => {
		if (err) res.json({ message: "Data doesn't exist." });
		res.json(challenges);
	});
});	

app.get('/:challenge_id?/contributions/:user_id?', (req, res) => {
	const challenge_id = req.params.challenge_id;
	const user_id = req.params.user_id;

	if (!challenge_id && !user_id) {
		Contribution.find({}).exec((err, contributions) => {
			if (err) res.json({ message: "Data doesn't exist." });
			res.json(contributions);
		});		
	} else if (user_id && challenge_id) {
		Contribution.find({
			challenge: challenge_id,
			author: user_id
		}).exec((err, contributions) => {
			if (err) res.json({ message: "Data doesn't exist." });
			res.json(contributions);
		});
	} else if (challenge_id && !user_id) {
		Contribution.find({
			challenge: challenge_id
		}).exec((err, contributions) => {
			if (err) res.json({ message: "Data doesn't exist." });
			res.json(contributions);
		});
	} else if (!challenge_id && user_id) {
		Contribution.find({
			author: user_id
		}).exec((err, contributions) => {
			if (err) res.json({ message: "Data doesn't exist." });
			res.json(contributions);
		});		
	}

});


// POST requests  

// Challenges
const ChallengesController = require('../controllers/ChallengesController');

app.post("/add-challenge", ChallengesController.add);
app.post('/edit-challenge', ChallengesController.edit);

// Users
const UsersController = require('../controllers/UsersController');

app.post("/add-user", UsersController.add);
app.post('/edit-user', UsersController.edit);

// Contributions
const ContributionsController = require('../controllers/ContributionsController');

app.post('/add-contribution', ContributionsController.add);
app.post('/edit-contribution', ContributionsController.edit);



app.listen(PORT, () => console.log(`App running on port ${PORT}`));
