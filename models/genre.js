var mongoose = require("mongoose");
var Album = require("../models/album");
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    artistName: String,
    name: String,
    releaseDate: String,
    genres: [String]
});

var GenreSchema = new Schema({
 name: String,
 albums: [AlbumSchema]
});

var Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;