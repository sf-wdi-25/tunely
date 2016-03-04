var mongoose = require("mongoose");


var albumSchema = mongoose.Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  photoUrl: String
});

module.exports = mongoose.model('Album', albumSchema);
