/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

$(document).ready(function() {
  console.log('app.js loaded!');

function getAndRenderAll() {
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: function (data) {
      // console.log(data);
      // data.albums.forEach( function ( element, index) {
      //   sampleAlbums.push(element);
      //   console.log(element);
      // });
      console.log(data);

      data.forEach( function ( element, index) {
        var songs = "";
        element.songs.forEach ( function (element, index){
          var name = element.name;
          songs = songs + (renderSong(element.name, element.trackNumber));
        });
        renderAlbum(element, songs);
        // console.log(songs);
      });

      // {name: "Swamped", trackNumber: 1, _id: "56678bfd318047be62e12e66"}

    },
    error: function () {
      console.log("uh oh...");
    }
  });
}

function renderSong(name, count) {
  var songsHtml =
"    <br><span>" + count + ". " + name + " </span>";
  return songsHtml;
}

getAndRenderAll();

// Form Input
//to create new design Project
var $addAlbum = $('.form-horizontal');

$addAlbum.on('submit', function (event) {
  event.preventDefault();

  // serialze form data
  // var newAlbum = $(this).serialize();

  var newAlbum = $(this).serialize();

   console.log(newAlbum);

  // POST request to create new designProject
  $.post('/api/albums', newAlbum, function (data) {
    console.log(data);

    // render all designProjects to view
    getAndRenderAll();

  });

  // reset the form
  $addAlbum[0].reset();
  $addAlbum.find('input').first().focus();
});

//for adding new songs
$('#albums').on('click', '.add-song', function(e) {
  var id = $(this).parents('.album').data('album-id');
  console.log('id',id);

  //adds the current album id data to the song modal
  $('#songModal').data('album-id', id);
  // console.log($('#songModal').data('album-id', id));

  //calls the song modal to add a song
  $('#songModal').modal();

  $('#saveSong').on('click', handleNewSongSubmit() ,function() {
    console.log('yes');
  });
});


// handles the modal fields and POSTing the form to the server
function handleNewSongSubmit(e) {
  var albumId = $('#songModal').data('album-id');
  // console.log(albumId);

  var songName = $('#songName').val();
  var trackNumber = $('#trackNumber').val();

  var formData = {
    name: songName,
    trackNumber: trackNumber
  };


  var postUrl = '/api/albums/' + albumId + '/songs';
  console.log('posting to ', postUrl, ' with data ', formData);

  $.post(postUrl, formData)
    .success(function(song) {
      // console.log('song', song);

      // re-get full album and render on page
      $.get('/api/albums/' + albumId).success(function(album) {
        //remove old entry
        $('[data-album-id='+ albumId + ']').remove();
        // render a replacement
        getAndRenderAll();
      });

    });

  //clear form
  $('#songName').val('');
  $('#trackNumber').val('');
  $('#songModal').modal('hide');
}

// this function takes a single album and renders it to the page
function renderAlbum(album, songs) {
  // console.log('rendering album:', album);

    var albumHtml =
    "        <!-- one album -->" +
    "        <div class='row album' data-album-id='" + album._id + "'>" +
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
    "                      <li class='list-group-item'>" +
    "                       <h4 class='inline-header'>Songs:</h4>" +
                            songs +
    "                    </li></ul>" +
    "                  </div>" +
    "                </div>" +
    "                <!-- end of album internal row -->" +

    "              </div>" + // end of panel-body

    "              <div class='panel-footer'>" +
    "                <button class='btn btn-primary add-song'>Add Song</button>" +
    "              </div>" +

    "            </div>" +
    "          </div>" +
    "          <!-- end one album -->";

  // render to the page with jQuery
  $('#albums').append(albumHtml);

}

});