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
                artistName: 'Marvin Gaye',
                name: 'What\'s Going On',
                releaseDate: '1971, May 21',
                photoUrl: '/images/marvin-gaye.png'
              },
              {
                artistName: 'Stevie Wonder',
                name: 'Songs in the Key of Life',
                releaseDate: '1976, September 28',
                photoUrl: '/images/stevie-wonder.png'
              },
              {
                artistName: 'Diana Ross',
                name: 'Diana',
                releaseDate: '1980, May 5',
                photoUrl: '/images/diana.png'
              },
               {
                artistName: 'The Temptations',
                name: 'The Temptations Wish It Would Rain',
                releaseDate: '1968, April 29',
                photoUrl: 'http://www.oliverferrer.com/wp-content/uploads/2014/11/temptations_OF_REMIX.jpg'
              },
              {
                artistName: 'Lionel Richie',
                name: 'Lionel Richie',
                releaseDate: '1982, October 6',
                photoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Lionel_Richie_(self-titled_album_-_cover_art).jpg'
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
