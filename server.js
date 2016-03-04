// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');
var models = require('./models');
var Album = require('./models/album');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

/* hard-coded data */
// var albums = [];
// albums.push({
//               _id: 132,
//               artistName: 'Nine Inch Nails',
//               name: 'The Downward Spiral',
//               releaseDate: '1994, March 8',
//               genres: [ 'industrial', 'industrial metal' ]
//             });
// albums.push({
//               _id: 133,
//               artistName: 'Metallica',
//               name: 'Metallica',
//               releaseDate: '1991, August 12',
//               genres: [ 'heavy metal' ]
//             });
// albums.push({
//               _id: 134,
//               artistName: 'The Prodigy',
//               name: 'Music for the Jilted Generation',
//               releaseDate: '1994, July 4',
//               genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
//             });
// albums.push({
//               _id: 135,
//               artistName: 'Johnny Cash',
//               name: 'Unchained',
//               releaseDate: '1996, November 5',
//               genres: [ 'country', 'rock' ]
//             });



/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

//
app.get('/', function homepage (req, res) {
  res.render(__dirname + '/views/index.ejs');
});




/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

//SHOW ALL ALBUMS (index)
app.get('/api/albums', function album_index (req, res) {
  Album.find(function(err, albums){
    if (err) {
      console.log("OH FUCK AN ERROR!" + err);
    } else {
      res.json({albums: albums});
    }
  });
});

//CREATE
app.post('/', function create (req, res) {

  var name = req.body.name;
  var artistName = req.body.artistName;
  var releaseDate = req.body.releaseDate;
  var genres = req.body.genres;
  var description = req.body.description;

  Album.create({name: name, artistName: artistName, releaseDate: releaseDate,
    genres: genres, description: description}, function(err, albums){
    if(err){
      console.log("OH FUCK AN ERROR! ", err);
    } else {
      // res.render(__dirname + '/views/index.ejs');
      // res.json({albums: albums});
      res.redirect('/api/albums');
    }
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
