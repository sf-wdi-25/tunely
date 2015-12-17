var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

module.exports.Song  = require("./song.js");
module.exports.Album = require("./album.js"); //keep in mind that an object is being exported here
