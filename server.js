// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

//Umm, this does something.....
var db = require("./models");

//use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

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

app.get("/api/albums", function get_Albums (req, res){
  db.Album.find({}, function (err,albums){
  console.log(albums);
  res.json(albums);
  });
});

app.post("/api/albums", function post_Albums (req, res){
  console.log("What you requested from client" , req.body);

  var genres = req.body.genres.split(",").map(function(item){
    return item.trim(); //takes genres splits them where the commas are and makes an array
  });
  req.body.genres = genres;

  db.Album.create(req.body, function(err, album){
    if(err){console.log("Here's the error for db create: ", err);}
    console.log(album);
    res.json(album);
  //copied from solutions
  });

});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
