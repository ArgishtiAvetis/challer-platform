const mongoose = require('mongoose');

const contributionSchema = mongoose.Schema({
	body: String,
	author: String,
	challenge: String,
	status: String,
	is_active: Boolean,
	published: {
		type: Date,
		default: Date()
	}
});

module.exports = mongoose.model('contribution', contributionSchema);
