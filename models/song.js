var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
  trackNumber: Number,
  title: String,
  duration: String
});

var Song = mongoose.model('Song', songSchema);

module.exports = Song;
module.exports = songSchema;
