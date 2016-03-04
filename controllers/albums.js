/************
 * DATABASE *
 ************/
var Album = require('../models/album');


function renderHome (req, res) {
res.render('./partials/home');
}

function renderAlbums (req, res) {
  Album.find({}, function(err, albums){
    if (err) returnError(err);
    res.render('./partials/albums/index', {albums:albums});
  });
}

function renderAlbum (req, res) {
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err) rreturnError(err);
    res.render('./partials/albums/show', {album:album});
  });
}

function newAlbum (req, res) {
  res.render('./partials/albums/new');
}

function createAlbum (req, res) {
  var name = req.body.name;
  var artistName = req.body.artistName;
  var releaseDate = req.body.releaseDate;
  Album.create({
    name: name,
    artistName: artistName,
    releaseDate: releaseDate
  }, function(err, album){
    if (err) return returnError(err);
    res.redirect('/albums/'+album._id, {album: album});
  });
}

function editAlbum (req, res) {
  res.render('./partials/albums/edit');
}

function updateAlbum (req, res) {
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err) returnError(err);
    if (req.body.name) album.name = req.body.name;
    if (req.body.artistName) album.artistName = req.body.artistName;
    if (req.body.releaseDate) album.releaseDate = req.body.releaseDate;
    res.redirect('/albums/'+album._id, {album: album});
  });
}

function deleteAlbum (req, res) {
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err) returnError(err);
    Album.remove(album);
    res.redirect('/albums/');
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
    if (err) returnError(err);
    res.json(albums);
  });
}

// shows specific album -- NOT REALLY PRACTICAL UNLESS YOU KNOW THE GENERATED _ID
// function apiAlbum (req, res){
//   var id = req.params.id;
//   Album.findById(id, function(err, album){
//     if (err) return console.log(err);
//     res.json(album);
//   });
// }

function returnError (err) {
  return console.log(err);
}

module.exports = {
  renderHome: renderHome,
  renderAlbums: renderAlbums,
  renderAlbum: renderAlbum,
  newAlbum: newAlbum,
  createAlbum: createAlbum,
  editAlbum: editAlbum,
  updateAlbum: updateAlbum,
  deleteAlbum: deleteAlbum,
  apiRoot: apiRoot,
  apiAlbums: apiAlbums
};
