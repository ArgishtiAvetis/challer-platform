const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 name: String,
 email: String,
 password: String,
 //id: Number,  --- no need

});

module.exports = mongoose.model('user', userSchema);
