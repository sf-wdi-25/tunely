/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

// var Album = require('./models/album');


$(document).ready(function() {
 
  renderAlbum();
});


// this function takes a single album and renders it to the page
function renderAlbum() {
 

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + "</span>" +
  "                      </li>" + buildSongsHtml() +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";




//   $.get( "ajax/test.html", function( data ) {
//   $( ".result" ).html( data );
//   alert( "Load was performed." );
// });


$.getJSON( "/api/albums", function( data ) {
    // console.log("here are my albums:", data.albums);


    data.albums.forEach(function(album) {

      // console.log(album.songs[1].trackNumber);
      buildSongsHtml(album);


      // console.log(album);
      var $albumDiv = $("#albums");
      
      $albumDiv.append(albumHtml);
      
      var $albumName = $(".album-name");
      var $artistName = $(".artist-name");
      var $albumReleaseDate = $(".album-releaseDate");

      $albumName.last().html(album.name);
      $artistName.last().html(album.artistName);

      $albumReleaseDate.last().html(album.releaseDate); 

    });

  });
}




// $.getJSON( "/api/albums", function( data ) {

// function buildSongsHtml(songs) {
//  var songText = "  &ndash; ";
//  data.albums.songs.forEach(function(song) {
//     songText = songText + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
//  });
//  var songsHtml  =
//  "                      <li class='list-group-item'>" +
//  "                        <h4 class='inline-header'>Songs:</h4>" +
//  "                         <span>" + songText + "</span>" +
//  "                      </li>";
//  return songsHtml;
// }
// });





function buildSongsHtml (album) {
  var songStr = "";
// console.log(songs);
  album.songs.forEach(function(song) {
    // console.log(song.trackNumber);
    songStr = songStr + "(" + song.trackNumber + ") " + song.name + "&ndash; ";
    
    var songHtml = 
      "<li class='list-group-item'>" + 
        "<h4 class='inline-header'> Songs:</h4>" + 
        "<span>" + songStr + "</span>" + 
      "</li>";

      console.log(songHtml);

    return songHtml;

  });

}

















