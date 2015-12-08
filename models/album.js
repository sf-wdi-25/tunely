var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = new mongoose.Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genre: [ String ]
});

var Album = moongose.model('Album', AlbumSchema);