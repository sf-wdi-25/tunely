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
//slick stuff
$('.responsive').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
