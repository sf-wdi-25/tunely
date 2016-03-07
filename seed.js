// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var Album = require("./models/album");
var mongoose = require('mongoose');
var db = require('./models');
var Genre = require("./models/genre");



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
genresList.push({
             name: 'VaporWave',
             albums: [
             { artistName: 'Metallica',
               name: 'Metallica',
               releaseDate: '1991, August 12',
               genres: [ 'heavy metal' ]
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
