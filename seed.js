// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models/");
var Album = require('./models/album');
var mongoose = require('mongoose');

var albumsList =[
  // put data here!
	{
    artistName: 'Nine Inch Nails',
    name: 'The Downward Spiral',
    releaseDate: '1994, March 8',
    genres: [ 'industrial', 'industrial metal' ],
		imageUrl: "images/400x400.png"
  },
	{
    artistName: 'Metallica',
    name: 'Metallica',
    releaseDate: '1991, August 12',
    genres: [ 'heavy metal' ],
		imageUrl: "images/400x400.png"
  },
	{
    artistName: 'The Prodigy',
    name: 'Music for the Jilted Generation',
    releaseDate: '1994, July 4',
    genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ],
		imageUrl: "images/400x400.png"
  },
	{
    artistName: 'Johnny Cash',
    name: 'Unchained',
    releaseDate: '1996, November 5',
    genres: [ 'country', 'rock' ],
		imageUrl: "images/400x400.png"
  }
];

var sampleSongs = [];

sampleSongs.push({ name: 'Swamped',
                   trackNumber: 1
});
sampleSongs.push({ name: "Heaven's a Lie",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Daylight Dancer',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Humane',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Self Deception',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Aeon',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Tight Rope',
                   trackNumber: 7
});


albumsList.forEach(function(album) {
  album.songs = sampleSongs;
});

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
