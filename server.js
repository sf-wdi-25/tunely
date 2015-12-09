// SERVER-SIDE JAVASCRIPT

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

var mongoos = require('mongoose');

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
  console.log(req.body);

  var genres = req.body.genres.split(',').map(function(item) {
    return item.trim(); } );
    req.body.genres = genres;

  db.Album.create(req.body, function (err, newAlbum) {
    if (err) { console.log('error', err); }
    console.log(newAlbum);
    res.json(newAlbum);
  });

});

app.post('/api/albums', function albumCreate(req, res) {
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;

  db.Album.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
