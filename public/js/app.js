/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

//MAIN FUNCTION
$(document).ready(function() {
  //AJAX REQUEST TO ALBUMS API
  $.getJSON( "/api/albums", function( data ) {
    //Data.albums is an array of all the albums
    data.albums.forEach(function(album) {
      //we are added an entire div to the Albums div with our data embedded in jQuery
      renderAlbum(album);  
    });
  });
});


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  //our HTML that we are appending in a forEach loop
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
  "                      </li>" + 
                         buildSongsHtml(album.songs) +
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



      //getting album div in order to append the HTML
      var $albumDiv = $("#albums");
      
      $albumDiv.append(albumHtml);
      
      var $albumName = $(".album-name");
      var $artistName = $(".artist-name");
      var $albumReleaseDate = $(".album-releaseDate");

      $albumName.last().html(album.name);
      $artistName.last().html(album.artistName);

      $albumReleaseDate.last().html(album.releaseDate); 




}

function buildSongsHtml (songs) {
  var songStr = "";

  songs.forEach(function(song) {
    songStr = songStr + "(" + song.trackNumber + ") " + song.name + "&ndash; ";

  });
    var songHtml = 
      "<li class='list-group-item'>" + 
        "<h4 class='inline-header'> Songs:</h4>" + 
        "<span>" + songStr + "</span>" + 
      "</li>";
    return songHtml;
}
















