// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var Album = require("./models/album");
var mongoose = require('mongoose');
var db = require('./models');
var Genre = require("./models/genre");

// var albumsList =[];
/* hard-coded data */
// albumsList.push({
//               artistName: 'Nine Inch Nails',
//               name: 'The Downward Spiral',
//               releaseDate: '1994, March 8',
//               genres: [ 'industrial', 'industrial metal' ]
//             });
// albumsList.push({
//               artistName: 'Metallica',
//               name: 'Metallica',
//               releaseDate: '1991, August 12',
//               genres: [ 'heavy metal' ]
//             });
// albumsList.push({
//               artistName: 'The Prodigy',
//               name: 'Music for the Jilted Generation',
//               releaseDate: '1994, July 4',
//               genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
//             });
// albumsList.push({
//               artistName: 'Johnny Cash',
//               name: 'Unchained',
//               releaseDate: '1996, November 5',
//               genres: [ 'country', 'rock' ]
//             });

// Album.remove({}, function(err, albums){

//   Album.create(albumsList, function(err, albums){
//     if (err) { 
//     	console.log('ERROR', err); 
//     } else {
// 	    console.log("all albums:", albums);
// 	    console.log("created", albums.length, "albums");
// 	    process.exit();
// 	    mongoose.connection.close();
// 	}
//   });

// });

var genresList =[];
/* hard-coded data */
genresList.push({
             name: 'Shoegazing',
             albums: [
             { artistName: 'Nine Inch Nails',
               name: 'The Downward Spiral',
               releaseDate: '1994, March 8',
               genres: [ 'industrial', 'industrial metal' ]
             }]
           });


Genre.remove({}, function(err, genres){

 Genre.create(genresList, function(err, genres){
   if (err) { 
     console.log('ERROR', err); 
   } else {
     console.log("all genres:", genres);
     console.log("created", genres.length, "genres");
     process.exit();
     mongoose.connection.close();
 }
 });

});
