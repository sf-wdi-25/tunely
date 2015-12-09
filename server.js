// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

var mongoose = require("mongoose");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));



/************
 * DATABASE *
 ************/
var db = require("./models");
/* hard-coded data */

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

app.get('/api/albums', function fetchAlbums (req, res) {
  db.Album.find({}, function (err, success) {
    if (err) { return console.log(err); }
    res.send(success);
  });
});

app.get('/api/albums/:album_id', function getOneAlbum (req, res) {
  db.Album.findById(req.params.album_id, function (err, success) {
    if (err) { return console.log(err); }
    res.send(success);
  });
});

app.get('/api/albums/:album_id/songs', function getAlbumSongs (req, res) {
  db.Album.findById(req.params.album_id, function (err, success) {
    if (err) { return console.log(err); }
    res.json(success.songs);
  });
});

// app.get('/api/albums/:album_id/songs/:id', function getAlbumSongs (req, res) {
//   db.Album.findById(req.params.album_id, function (err, album) {
//     if (err) { return console.log(err); }
//     db.Song.findById(req.params.id, function (err, song) {
//       if (err) { return console.log(err); }
//       console.log(song);
//     });
//   });
// });

app.post('/api/albums', function newAlbum (req, res) {
  db.Album.create(req.body, function (err, success) {
    if (err) { return console.log(err); }
    res.send(success);
  });
});

app.post('/api/albums/:album_id/songs', function newSong (req, res) {
  db.Album.findById(req.params.album_id, function (err, success) {
    if (err) { return console.log(err); }
    db.Song.create(req.body, function (err, newSong) {
      if (err) { return console.log(err); }
      success.songs.push(newSong);
      success.save(function (err, savedSong) {
        res.json(success);
      });
    });
  });
});

app.delete('/api/albums/:id', function (req, res) {
  db.Album.remove({_id: req.params.id}, function (err, success) {
    if (err) { return console.log(err); }
    res.json({status: 200});
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
