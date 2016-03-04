var express = require('express'),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.render('index');
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

//index
app.get('/api/albums', function index (req,res) {
  db.Album.find(function(err, albums) {
    res.json(albums);
  });
});

//create
app.post('/api/albums', function create(req, res) {
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

//delete 
app.delete('/api/albums/:id', function deleteAlbum(req, res) {
  console.log('deleting id: ', req.params.id);

  //grabs the album's id
  var id = req.params.id;
  db.Album.remove({_id: id}, function(err) {
    if (err) { return console.log(err); }
    console.log(req.params.id  + "was removed");
    res.status(200).send(); // everything is a-OK
  });
});