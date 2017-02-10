var mongoose = require("mongoose");
var SongSchema = mongoose.Schema({
	name: String,
	trackNumber: Number
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;