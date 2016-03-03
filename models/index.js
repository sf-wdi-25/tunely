var mongoose = require("mongoose");
var Album = require("./album");
// TODO: Whats up with the line below?
// module.exports.Album = require('./album.js');
mongoose.connect("mongodb://localhost/tunely");
