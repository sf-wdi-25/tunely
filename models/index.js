// What you need to populate-seed your Database on your back-end

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

module.exports.Album = require("./album.js");

