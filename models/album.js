var mongoose = require("mongoose");
var Song = require('song');


var albumSchema = mongoose.Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  photoUrl: String,
  trackList: [songSchema]
});

module.exports = mongoose.model('Album', albumSchema);
