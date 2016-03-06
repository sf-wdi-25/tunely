// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
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
      // res.render(__dirname + '/views/index');
      // res.json({albums: albums});

      res.redirect('/');
    }
  });
});

//update

app.put('/api/albums/:id', function update_api_album (req, res){
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err){
        console.log("ERROR WITH API ID", err);

      }
    album.name = req.body.name;
    album.artistName = req.body.artistName;
    album.releaseDate = req.body.releaseDate;
    album.save(function(err, saved) {
      if (err) {
        console.log(err);
      }
      res.json(saved);
    });

  });

});
  




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
