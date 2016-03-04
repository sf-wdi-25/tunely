var mongoose = require("mongoose");
var Song = require("./song");
var AlbumSchema = mongoose.Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: [ String ],
	description: String,
	songs: [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;





