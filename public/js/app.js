/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */

var dataToUse = {};
var url;


$(document).ready(function() {
  console.log('app.js loaded!');
  function getAlbums() {
    $.ajax({
      method: "GET",
      url: "/api/albums",
      success: function (data) {
        $("#albums").empty();
        data.forEach(function (element) {
          renderAlbum(element);
        });
      },
      error: function (error) {
        console.log(error);
      }
    });
  }   

  getAlbums();

  $("form").submit(function (event) {
    event.preventDefault();
    var input = $(this).serialize();
    $("form").trigger("reset");
    $.ajax({
      method: "POST",
      url: "/api/albums",
      data: input,
      success: function (data) {
        getAlbums();
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  $('#albums').on('click', '.add-song', function(e) {
    console.log('asdfasdfasdf');
    var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    $('#songModal').data('album-id', id);
    $("#songModal").modal("show");
  });

  $("#saveSong").click(function handleNewSongSubmit(event) {
    event.preventDefault();
    dataToUse.name = $("#songName").val();
    dataToUse.trackNumber = $("#trackNumber").val();
    var trackId = $("#songModal").data('album-id');
    url = "api/albums/" + trackId + "/songs";
    $.ajax({
      method: "POST",
      url: url,
      data: dataToUse,
      success: function (data) {
        $("#songModal").modal("hide");
        getAlbums();
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  $('#albums').on('click', '.delete-album', function(e) {
    var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    $('#deleteModal').data('album-id', id);
    $("#deleteModal").modal("show");
  });

  $("#deleteAlbum").click(function handleDeletion(event) {
    event.preventDefault();
    id = $("#deleteModal").data('album-id');
    url = "/api/albums/" + id;
    $.ajax({
      method: "DELETE",
      url: url,
      success: function (data) {
        $("#deleteModal").modal("hide");
        getAlbums();
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

});


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                    <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
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
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Songs:</h4>" +
  "                        <span id='" + album._id + "'> &ndash; </span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-song'>Add Song</button>" + 
  "                <button class='btn btn-danger delete-album'>Delete Album</button>" +
  "              </div>" + 

  "            </div>" + // end of panel-body

  "            <div class='panel-footer'>" +
  "            </div>" +

  "          </div>" +
  "        </div>" +
  "        <!-- end one album -->";

  $("#albums").append(albumHtml);
  album.songs.forEach(function (element) {
    $("#" + album._id).append("(" + element.trackNumber + ") " + element.name + " &ndash; ");
  });
}
