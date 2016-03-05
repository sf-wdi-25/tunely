//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tunely');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var albumsController = require('../controllers/albums');
var songsController = require('../controllers/songs');

/*
 * HTML Endpoints
 */

router.route('/')
  // gets the homepage
  .get(albumsController.renderHome);

router.route('/albums')
  // gets albums index
  .get(albumsController.renderAlbums)
  .post(albumsController.createAlbum);

router.route('/albums/new')
  .get(albumsController.newAlbum);

router.route('/albums/:id')
  // Show album
  .get(albumsController.renderAlbum)
  .patch(albumsController.updateAlbum)
  .delete(albumsController.deleteAlbum);

router.route('/albums/:id/edit')
  .get(albumsController.editAlbum);

router.route('albums/:id/songs')
  .get(songsController.songIndex)
  .post(songsController.createSong);

router.route('albums/:id/songs/:id')
  .patch(songsController.updateSong)
  .delete(songsController.deleteSong);

// DeathMetal

router.route('/deathmetal')
  .get(albumsController.deathMetal);

// Search
router.route('/search')
  .get(albumsController.search);

/*
 * JSON API Endpoints
 */

router.route('/api')
  .get(albumsController.apiRoot);

router.route('/api/albums')
  .get(albumsController.apiAlbums);

// router.route('/api/albums/:id')
//   .get(albumsController.apiAlbum);


module.exports = router;
