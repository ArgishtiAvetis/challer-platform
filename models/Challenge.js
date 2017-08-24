const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
	title: String,
	slug: String,
	body: String,
	category: String,
	author: String,
	published: {
		type: Date,
		default: Date()
	}
});

module.exports = mongoose.model('challenge', challengeSchema);