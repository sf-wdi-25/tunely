// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tunely');
console.log('connected');
var Album = require('./models/album');

Album.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

var albumsList = [
              {
                artistName: 'Nine Inch Nails',
                name: 'The Downward Spiral',
                releaseDate: '1994, March 8'
              },
              {
                artistName: 'Metallica',
                name: 'Metallica',
                releaseDate: '1991, August 12'
              },
              {
                artistName: 'The Prodigy',
                name: 'Music for the Jilted Generation',
                releaseDate: '1994, July 4'
              },
              {
                artistName: 'Johnny Cash',
                name: 'Unchained',
                releaseDate: '1996, November 5'
              }
];

Album.create(albumsList, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});
