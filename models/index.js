var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

module.exports.album = require("./album.js");