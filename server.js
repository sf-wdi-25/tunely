// SERVER-SIDE JAVASCRIPT
var mongoose = require('mongoose');
//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// configure bodyParser (for receiving form data)
var bodyParser = require("body-parser");
// parse POSTed data
app.use(bodyParser.urlencoded({extended: true}));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/*
 * HTML Endpoints
 */
//for client req to server, res 'Hello World'
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


/************
 * DATABASE *
 ************/

var db = require("./models/index.js");

/**********
 * ROUTES *
 **********/

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

app.get('/api/albums', function (req, res) {
  db.Album.find(function (err, Album) {
    res.json(Album);
  });
});


//https://github.com/sf-wdi-25/notes/tree/master/week-04-mongo-database/day-01-mongo/dusk-schemas_and_embedding
app.post('/api/albums', function create(req, res) {
  // console.log(req.body);

  var genres = req.body.genres.split(',').map(function(item) {
    return item.trim(); } );
    req.body.genres = genres;

  db.Album.create(req.body, function (err, newAlbum) {
    if (err) { console.log('error', err); }
    // console.log(newAlbum);
    res.json(newAlbum);
  });

});


app.get('/api/albums/:id', function albumShow(req, res) {
  console.log('requested album id=', req.params.id);
  db.Album.findOne({_id: req.params.id}, function(err, album) {
    res.json(album);
  });
});

app.post('/api/albums/:albumId/songs', function songsCreate(req, res) {
  console.log('body', req.body);

  db.Album.findOne({_id: req.params.albumId}, function(err, album) {
    if (err) { console.log('error', err); }

    var song = new db.Song(req.body);
    album.songs.push(song);
    album.save(function(err, savedAlbum) {
      if (err) { console.log('error', err); }
      console.log('album with new song saved:', savedAlbum);
      res.json(song);
    });
  });

});

app.delete('/api/albums/:id', function deleteAlbum(req, res) {
  console.log('deleting id: ', req.params.id);
  db.Album.remove({_id: req.params.id}, function(err) {
    if (err) { return console.log(err); }
    console.log("removal of id=" + req.params.id  + " successful.");
    res.status(200).send(); // everything is a-OK
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
