var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

var Album = require('./album.js');
var Genre = require('./genre.js');

module.exports.Album = Album;
module.exports.Genre = Genre;