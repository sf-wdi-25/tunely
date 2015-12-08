// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var db = require("./models/index.js");

var album = db.Album;

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
  res.json({"albums": album});
  album.find(function (err, Album) {
    res.json({albums: Album});
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
