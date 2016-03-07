/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

//MAIN FUNCTION
$(document).ready(function() {
  var $albums = $('#albums');


  $albums.delegate('.editAlbum', 'click', function() {
  var $li = $(this).closest('li');
  $li.find('input.album-name').val($li.find('span.album-name').html());
  $li.find('input.artist-name').val($li.find('span.artist-name').html());
  $li.find('input.album-releaseDate').val($li.find('span.album-releaseDate').html());
  $li.find('input.image-url').val($li.find('span.image-url').html());
  $li.addClass('edit');
  });

  $albums.delegate('.cancelEdit', 'click', function() {
    $(this).closest('li').removeClass('edit');
  });


  $albums.delegate('.saveEdit', 'click', function() {
    var $li = $(this).closest('li');
    var album = {
      artistName: $li.find('input.artist-name').val(),
      name: $li.find('input.album-name').val(),
      releaseDate: $li.find('input.album-releaseDate').val(),
      imageUrl: $li.find('input.image-url').val()
      };

      $.ajax({
        type: 'PUT',
        url: '/api/albums/' + $li.attr('editAlbumId'),
        data: album,
        success: function (newAlbum) {
          $li.find('span.album-name').html(album.name);
          $li.find('span.artist-name').html(album.artistName);
          $li.find('span.album-releaseDate').html(album.releaseDate);
          // $li.find('span.image-url').html(album.image-url);
          $li.removeClass('edit');

        },
        error: function() {
          alert('error updating album');
        }

      });
  });


  //AJAX REQUEST TO ALBUMS API

  //this is the get call to occupy the index page with data from the db
  $.ajax({
    type: 'GET',
    // we're pulling the data from our own api
    url: '/api/albums',
    // data here is the JSON of albums from '/api/albums'
    success: function(data){
      $.each(data.albums, function(i, album) {
          renderAlbum(album);
      });
    },
    error: function(err) {
      alert("error loading " + err);
    }
  });

  // DELETE method
  $albums.delegate('.deleteBtn','click', function(){
    // var $album = $(this).closest('.album');

    var $albumId = $(this).attr('delete-album-id');

    $.ajax({
      type: 'DELETE',
      url: '/api/albums/' + $albumId,
      success: function(){
        $('[data-album-id='+ $albumId + ']').remove();
        console.log("YAY DELETE");
      },
      error: function(){
        console.log("SOMETHING AINT WORKING");
      }
    });
  });

  //CREATE ALBUM
  // #singlebutton is the name of the submit button to make a new album
  $('#singlebutton').on('click', function(event) {
    event.preventDefault();

    var $name = $('#name').val();
    var $artistName = $('#artistName').val();
    var $releaseDate = $('#releaseDate').val();
    var $genres = $('#genres').val();
    var $description = $('#description').val();
    var $imageUrl = $('#imageUrl').val();

    // here we grab the info from the form to make a new album and create
    // a new object, newAlbum, with the input info
    var newAlbum = {
      name: $name,
      artistName: $artistName,
      releaseDate: $releaseDate,
      genres: $genres,
      description: $description,
      imageUrl: $imageUrl
    };

    $.ajax({
      type: 'POST',
      url: '/api/albums',
      data: newAlbum,
      success: function(newAlbum){
        renderAlbum(newAlbum);
      },
      error: function(err) {
        alert("woah, hang on there a minute.  We've got an issue: " + err);
      }
    });
  });


  //CREATE SONG
  handleNewSongButtonClick();

//end of document ready
});



//AFTER NEW SONG IS CLICKED
function handleNewSongButtonClick() {
  //CREATE SONGS

  $('#albums').on('click', '.songModalButton', function(event) {

    var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    // console.log("album id on song modal: " + $('#songModal').data('album-id'));

    $('#songModal').data('album-id', id);

    //USES BOOTSTRAP/jQUERY TO OPEN THE MODAL
    $('#songModal').modal();

    handleNewSongSubmit(event);

  });

}


//CALL THIS WHEN THE BUTTON ON THE MODAL IS CLICKED
function handleNewSongSubmit(event){

  $('#saveSong').on('click', function(event) {

      event.preventDefault();

      $songName = $('#songName').val();
      $trackNumber = $('#trackNumber').val();

      var newSong = {
        name: $songName,
        trackNumber: $trackNumber
      };

      $.ajax({
        type: 'POST',
        url: '/api/albums',
        data: newSong,
        success: function(newSong){
          renderAlbum(newSong);
        },
        error: function(err) {
          alert("woah, hang on there a minute.  We've got an issue: " + err);
        }
      });

    });
}


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  // This defines a songStr that we will fill with the name and track number of each song,
  // we will then add this onto the end of the album information
  var songStr = "";
  // This loops through each song on the album and adds it to songStr
  album.songs.forEach(function(song) {
    songStr = songStr + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
  });

  // albumTemplate is the layout for what will be rendered for new albums
  var albumTemplate =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img id='imageUrl' class='image-url' src=" + album.imageUrl +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item' editAlbumId='"+ album._id + "''>" +
  "                        <p>" +
  "                          <h4 class='inline-header'>Album Name:</h4>" +
  "                          <span class='album-name noedit'>" + album.name + "</span>" +
  "                          <input class='edit album-name'>" +
  "                        </p>" +
  "                        <p>" +
  "                          <h4 class='inline-header'>Artist Name:</h4>" +
  "                          <span class='artist-name noedit'>" + album.artistName + "</span>" +
  "                          <input class='edit artist-name'>" +
  "                        </p>" +
  "                        <p>" +
  "                          <h4 class='inline-header'>Released date:</h4>" +
  "                          <span class='album-releaseDate noedit'>" + album.releaseDate + "</span>" +
  "                          <input class='edit album-releaseDate'>" +
  "                        </p>" +
  "                        <h4 class='inline-header'> Songs:</h4>" +
  "                        <span class='songsSpan'>" + songStr + "</span>" +
  "                        <div class='panel-footer'>" +
  "                          <button class='editAlbum noedit btn btn-info'>Edit</button>" +
  "                          <button class='saveEdit btn btn-success edit'>Save</button>" +
  "                          <button class='cancelEdit btn btn-warning edit'>Cancel</button>" +
  "                          <button class='songModalButton btn btn-primary'> New Song </button>" +
  "                          <input id='delete-button' delete-album-id=" + album._id + " class='deleteBtn btn btn-danger' value='Delete' type='submit'></input>" +
  "                        </div>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +
  "              </div>" + // end of panel-body
  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // Here we are appending the above template with album info filled in
  $("#albums").append(albumTemplate);

}
