// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models/");
var Album = require('./models/album');
var mongoose = require('mongoose');

var albumsList =[
  // put data here!
	{
    artistName: 'N.W.A. (Nerds With Asthma)',
    name: 'Straight Outta Computers',
    releaseDate: '1988, August 12',
    genres: [ 'gangsta rap' ],
		imageUrl: "images/straight_outta_compton.jpg",
		songs: [{name: 'Straight Outta Computers', trackNumber: 1},
		{name: 'Fork the Repos', trackNumber: 2},
		{name: 'If it aint ruff', trackNumber: 3},
		{name: '8 Bit (Remix)', trackNumber: 4}]
  },
	{
    artistName: 'MattyBRaps',
    name: 'Something',
    releaseDate: '2010, March 8',
    genres: [ 'kid rap' ],
		imageUrl: "images/mattybraps.jpg",
		songs: [{name: 'I Believe in You', trackNumber: 1},
		{name: 'I Believe in You', trackNumber: 2},
		{name: 'I Believe in You', trackNumber: 3}]
  },
	{
    artistName: 'Snoop Dogg',
    name: 'Doggystyle',
    releaseDate: '1993, July 4',
    genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ],
		imageUrl: "images/snoopdogg_doggystyle.jpg",
		songs: [{name: 'Bathtub', trackNumber: 1},
		{name: 'Milk and Juice', trackNumber: 2},
		{name: 'Cereal Killa', trackNumber: 3}]
  }
];

var sampleSongs = [];

// sampleSongs.push({ name: 'Swamped',
//                    trackNumber: 1
// });
// sampleSongs.push({ name: "Heaven's a Lie",
//                    trackNumber: 2
// });
// sampleSongs.push({ name: 'Daylight Dancer',
//                    trackNumber: 3
// });
// sampleSongs.push({ name: 'Humane',
//                    trackNumber: 4
// });
// sampleSongs.push({ name: 'Self Deception',
//                    trackNumber: 5
// });
// sampleSongs.push({ name: 'Aeon',
//                    trackNumber: 6
// });
// sampleSongs.push({ name: 'Tight Rope',
//                    trackNumber: 7
// });
//
//
// albumsList.forEach(function(album) {
//   album.songs = sampleSongs;
// });

Album.remove({}, function(err, albums){

  Album.create(albumsList, function(err, albums){
    if (err) {
      return console.log('ERROR', err);
    } else {
      console.log("all albums:", albums);
      console.log("created", albums.length, "albums");
      process.exit();
    	mongoose.connection.close();
    }
  });

});
