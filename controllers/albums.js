/************
 * DATABASE *
 ************/
var Album = require('../models/album');


function renderHome (req, res) {
res.render('./partials/home');
}

function renderAlbums (req, res) {
  Album.find({}, function(err, albums){
    if (err) return console.log(err);
    res.render('./partials/albums/index', {albums:albums});
  });
}

function renderAlbum (req, res) {
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err) return console.log(err);
    res.render('./partials/albums/show', {album:album});
  });
}

function apiRoot (req, res) {
    res.json({
      message: "Welcome to tunely!",
      documentation_url: "https://github.com/tgaff/tunely/api.md",
      base_url: "http://tunely.herokuapp.com",
      endpoints: [
        {method: "GET", path: "/api", description: "Describes available endpoints"},
        {method: "GET", path: "/api/albums", description: "Shows index of all albums"},
        {method: "GET", path: "/api/albums/:id", description: "Shows specified album"}
      ]
    });
}

function apiAlbums (req, res){
  Album.find({}, function(err, albums){
    if (err) return console.log(err);
    res.json(albums);
  });
}

// shows specific album -- NOT REALLY PRACTICAL UNLESS YOU KNOW THE GENERATED _ID
function apiAlbum (req, res){
  var id = req.params.id;
  Album.find({_id: id}, function (err, album){
    if (err) return console.log(err);
    res.json(album);
  });
}

module.exports = {
  renderHome: renderHome,
  renderAlbums: renderAlbums,
  renderAlbum: renderAlbum,
  // newAlbum: newAlbum,
  // editAlbum: editAlbum,
  // updateAlbum: updateAlbum,
  // deleteAlbum: deleteAlbum,
  apiRoot: apiRoot,
  apiAlbums: apiAlbums
};
