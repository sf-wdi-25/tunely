/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

//var Album = require('../../models/album');






$(document).ready(function() {
  console.log('app.js loaded!');
  var app = new App();
});

function App () {
  this.baseUrl = '/albums';
  this.apiUrl = 'api/albums';
  this.$albumList = $('#albums');
}

// this function takes all albums and renders them to the page
App.prototype.renderAlbums = function (){
  app.$albumList.empty();
};

App.prototype.renderLayout = function (){

};

// this function takes a single album and renders it to the page
App.prototype.renderAlbum = function (album) {

};
