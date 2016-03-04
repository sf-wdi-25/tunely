// SERVER-SIDE JAVASCRIPT
//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

//require models
var db = require("./models");

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
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

app.get('/api/albums', function search (req,res) {
  db.Album.find(function(err, albums) {
    res.json(albums);
  });
});

app.post('/api/albums', function create(req, res) {
  //   var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  // req.body.genres = genres;

  // db.Album.create(req.body, function(err, album) {
  //   if (err) { console.log('error', err); }
  //   console.log(album);
  //   res.json(album);
  // });
  // var artistName = req.body.artistName;
  // var name = req.body.name;
  // var releaseDate = req.body.releaseDate;
  // var genres = req.body.genres;
  // var album = {artistName: artistName, name: name, releaseDate: releaseDate, genres: genres};

  // db.Album.create(req.body, function(err, albums) {
  //   if (err) {
  //     res.json({message: "Could not create album"});
  //   } else {
  //     res.json({albums: albums});
  //   }
  // });
});
/**********
 * SERVER *
 **********/

//user bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
