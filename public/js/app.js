/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


$(document).ready(function() {
  console.log('app.js loaded!');

  // $.get('/api/albums').success(function (albums) {
  //   $('#albums').on('click', '.delete-album', handleDeleteAlbumClick);
  //   $('#albums').on('click', '.edit-album', handleEditAlbumClick);
  // });

  //Taken from solution may have to replace my ajax get

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


$("#albums").on("click", ".add-song", function (e){
  var id = $(this).parents(".album").data("album-id");
  console.log("ID of Album " , id);
  $("#songModal").data("album-id", id);
  $("#songModal").modal();
});

$("#albums").on("click", ".delete-album", function (e){
  var id = $(this).parents(".album").data("album-id");
  console.log("ID of Album Deleted: " , id);
  userURL ="/api/albums/" + id; //Need to make sure the correct url ID gets plugged in

  $.ajax({
    method:"DELETE",
    url:userURL,
    success:function(res){
      console.log("Album was succesfully deleted!");
    },
    error: function(){
      console.log("There's an error with your clientside delete.");
    }
  });
});

$("#albums").on("click", ".edit-album", function (e){
  var id = $(this).parents(".album").data("album-id");
  console.log("ID of Editted Album: " , id);

  // $(".edit-album").toggle(display);

  // if (display === true){
  //   $(".edit-album").show();
  //   $(".saveChanges-album").hide();
  // }else if (display === false) {
  //   $(".edit-album").hide();
  //   $(".saveChanges-album").show();
  //}
});

$("#saveSong").on("click", handleNewSongSubmit);

//might need to comment some of these out
//$("#albums").on("click", ".delete-album", handleDeleteAlbumClick);

$("#albums").on("click", ".edit-album", handleEditAlbumClick);

$("#albums").on("click", ".pub-album", handleSaveChangesClick);

});

// Post to the server on click I think
// Taken from solutions

function getAlbumRowById(id){
  return $('[data-album-id=' + id + ']');
}

function handleEditAlbumClick (e) {
  var albumId = $(this).parents('.album').data('album-id');
  var $albumRow = getAlbumRowById(albumId);

  console.log('attempt to edit id', albumId);

  $(this).parent().find('.btn').hide(); //hides the save changes button, I think?
  $(this).parent().find('.default-hidden').show(); //shows edit button?

  var albumName = $albumRow.find('span.album-name').text();
  $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName + '"></input>');

  var artistName = $albumRow.find('span.artist-name').text();
  $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

  var releaseDate = $albumRow.find('span.album-releaseDate').text();
  $albumRow.find('span.album-releaseDate').html('<input class="edit-album-name" value="' + releaseDate + '"></input>');
} 

function handleSaveChangesClick(e){

}


function handleNewSongSubmit(e) {
  var albumId = $('#songModal').data('album-id');
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
      console.log('song', song);
        $.get('/api/albums/' + albumId).success(function(album) {
        //remove old entry
        $('[data-album-id='+ albumId + ']').remove();
       // render a replacement
        renderAlbum(album);
      });
      $('#songName').val('');
      $('#trackNumber').val('');
      $('#songModal').modal('hide');
    });
}

function buildSongsHtml(songs){
  var songText=" &ndash; ";
  songs.forEach(function(song){
         songText = songText + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
  });
  var songsHtml  =
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Songs:</h4>" +
  "                         <span>" + songText + "</span>" +
  "                      </li>";
  return songsHtml;
}





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

  buildSongsHtml(album.songs) +

  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
                "<button class='btn btn-primary add-song'>Add Song</button>" +
                "<button class='btn btn-primary delete-album'>Delete Album</button>" +
                "<button class='btn btn-info edit-album'>Edit Album</button>" +
                "<button class='btn btn-info put-album default-hidden'>Save Changes</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  $("#albums").append(albumHtml);
  // render to the page with jQuery
}


