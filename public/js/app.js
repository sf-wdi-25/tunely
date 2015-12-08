/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


$(document).ready(function() {
  console.log('app.js loaded!');

  // sampleAlbums.forEach(function (element, index){
  //   renderAlbum(element);
  // });

  //READ albums from server and appends to html
  $.ajax({
    method: "GET",
    url:"/api/albums",
    success: function (res){
      res.forEach(function (element, index){
        renderAlbum(element);
      });
    },
    error: function(){
      console.log("Error with /api/albums GET");
    }
  });

  //CREATE album from server

  $("#album-form form").on("submit", function (event){
    event.preventDefault();
    var formData = $(this).serialize();
    
    console.log("Your form data client side:" + formData);

    $.ajax({
    method: "POST",
    url:"/api/albums",
    data:formData,
    success: function (res){
      console.log("Post Response from Server: " , res);
      renderAlbum(res);
    },
    error: function(){
      console.log("Error with /api/albums Post");
    }
    });
    
    $(this).trigger("reset");

  });
});






// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + "HARDCODED ALBUM ID" + "'>" +
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
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
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

  $("#albums").append(albumHtml);
  // render to the page with jQuery
}


