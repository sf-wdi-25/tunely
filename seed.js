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
    genres: [ 'industrial', 'industrial metal' ]
  },
	{
    artistName: 'Metallica',
    name: 'Metallica',
    releaseDate: '1991, August 12',
    genres: [ 'heavy metal' ]
  },
	{
    artistName: 'The Prodigy',
    name: 'Music for the Jilted Generation',
    releaseDate: '1994, July 4',
    genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
  },
	{
    artistName: 'Johnny Cash',
    name: 'Unchained',
    releaseDate: '1996, November 5',
    genres: [ 'country', 'rock' ]
  }
];

Album.remove({}, function(err, albums){

  Album.create(albumsList, function(err, albums){
    if (err) { 
    	return console.log('ERROR', err); 
    }
    else{
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  	mongoose.connection.close();
    }
  });

});

