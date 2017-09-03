const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: String,
	username: String,
	email: String,
	password_hash: String,
});

module.exports = mongoose.model('user', userSchema);
