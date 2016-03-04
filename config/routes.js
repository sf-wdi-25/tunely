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

router.route('/albums/edit')
  .get(albumsController.editAlbum);

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
