var mongoose = require("mongoose");
var AlbumSchema = mongoose.Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: [ String ],
	description: String
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;