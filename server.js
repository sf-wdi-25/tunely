// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

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

app.post('/api/albums', function create(req, res) {
  var data = req.body;
  console.log(req.body);
});

//create designProjects property
app.post('/api/design_projects', function create(req, res) {
  var data = req.body;
  // console.log(req.body);
  var newDesignProject = { 
    _id: makeID(designProjects),
    title: data.title,
    description: data.description,
    date: data.date,
    image: data.image
    // [
    //   { _id: 1, title: images.title, caption: images.caption, url: images.url}
    // ]
  };
  res.json(newDesignProject);
  designProjects.push(newDesignProject);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
