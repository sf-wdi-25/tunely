var mongoose = require("mongoose");
var Song = require('./song');
var songSchema = require('../models/song');


var albumSchema = mongoose.Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  photoUrl: String,
  songList: [songSchema]
});

module.exports = mongoose.model('Album', albumSchema);
