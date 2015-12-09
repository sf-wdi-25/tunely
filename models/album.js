// Database - Server

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var song = require('./song.js');

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  song: [ song.schema ],
  releaseDate: String,
  genres: [ String ]
});

var Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;