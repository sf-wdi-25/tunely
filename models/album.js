var mongoose = require("mongoose");
var Song = require("./song.js");

var AlbumSchema = new mongoose.Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: Array,
	songs: [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;