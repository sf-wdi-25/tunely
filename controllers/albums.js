/************
 * DATABASE *
 ************/
var Album = require('../models/album');
var Song = require('../models/song');

function returnError (err) {
  return console.log(err);
}

function renderHome (req, res) {
  res.render('./partials/home');
}

function renderAlbums (req, res) {
  Album.find({}, function(err, albums){
    if (err) returnError(err);
    res.render('./partials/index', {albums:albums});
  });
}

function renderAlbum (req, res) {
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err) returnError(err);
    res.render('./partials/show', {album:album});
  });
}

function newAlbum (req, res) {
  res.render('./partials/new');
}

function createAlbum (req, res) {
  var name = req.body.name;
  var artistName = req.body.artistName;
  var releaseDate = req.body.releaseDate;
  var photoUrl = req.body.photoUrl;
  Album.create({
    name: name,
    artistName: artistName,
    releaseDate: releaseDate,
    photoUrl: photoUrl
  }, function(err, album){
    if (err) return returnError(err);
    res.redirect('/albums/:id', {album: album});
  });
}

function editAlbum (req, res) {
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err) returnError(err);
    res.render('./partials/edit', {album:album});
  });

}

function updateAlbum (req, res) {
  var id = req.params.id;
  Album.find({_id: id}, function(err, album){
    if (err) returnError(err);
    if (req.body.name) album.name = req.body.name;
    if (req.body.artistName) album.artistName = req.body.artistName;
    if (req.body.releaseDate) album.releaseDate = req.body.releaseDate;
    if (req.body.photoUrl) album.photoUrl = req.body.photoUrl;
    res.redirect('/albums/'+ req.params.id + 'edit', {album: album});
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

function deathMetal (req, res){
  res.render("deathmetal_layout");
}

function search (req, res) {
  res.render("./partials/search");
}

// shows specific album -- NOT REALLY PRACTICAL UNLESS YOU KNOW THE GENERATED _ID
// function apiAlbum (req, res){
//   var id = req.params.id;
//   Album.findById(id, function(err, album){
//     if (err) return console.log(err);
//     res.json(album);
//   });
// }



module.exports = {
  returnError: returnError,
  renderHome: renderHome,
  renderAlbums: renderAlbums,
  renderAlbum: renderAlbum,
  newAlbum: newAlbum,
  createAlbum: createAlbum,
  editAlbum: editAlbum,
  updateAlbum: updateAlbum,
  deleteAlbum: deleteAlbum,
  apiRoot: apiRoot,
  apiAlbums: apiAlbums,
  deathMetal: deathMetal,
  search: search
};
