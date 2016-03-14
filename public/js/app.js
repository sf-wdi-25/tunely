/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

//MAIN FUNCTION
$(document).ready(function() {
  var $albums = $('#albums');


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
  $('#albums').delegate('.deleteBtn','click', function(){
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

  // #singlebutton is the name of the submit button to make a new album
  $('#singlebutton').on('click', function(event) {
    event.preventDefault();

    var $name = $('#name').val();
    var $artistName = $('#artistName').val();
    var $releaseDate = $('#releaseDate').val();
    var $genres = $('#genres').val();
    var $description = $('#description').val();

    // here we grab the info from the form to make a new album and create
    // a new object, newAlbum, with the input info
    var newAlbum = {
      name: $name, 
      artistName: $artistName,
      releaseDate: $releaseDate,
      genres: $genres,
      description: $description
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

//end of document ready
});




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
  "                        <h4 class='inline-header'> Songs:</h4>" + 
  "                        <span class='songsSpan'>" + songStr + "</span>" +
  "                        <button class='songModalButton'> New Song </button>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                 <div class='col-md-4'>" +
  "                     <input id='delete-button' delete-album-id=" + album._id + " class='deleteBtn btn btn-primary' value='Delete' type='submit'></input>" +
  "                  </div>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";


      // getting album div in order to append the HTML
      // var $albumDiv = $("#albums");

      // $albumDiv.append(albumHtml);
  // getting album div in order to append the HTML
  // var $albumDiv = $("#albums");
  // Here we are appending the above template with album info filled in
  $("#albums").append(albumTemplate);


  // var $songs = $(".songsSpan");

  // var modalBtn = $(".songModalButton");
  // $songs.delegate('.songModalButton', 'click', function() {
  //   $(this).modal();
  // });
  

      // var $albumName = $(".album-name");
      // var $artistName = $(".artist-name");
      // var $albumReleaseDate = $(".album-releaseDate");

      // var $deleteButton = "<input method='POST' action='/' type='submit' class='.btn-danger' value='Delete'></input>";

      // $albumName.last().html(album.name);
      // $artistName.last().html(album.artistName);
      // $albumReleaseDate.last().html(album.releaseDate);
}


//this will build out our songs in each album and append it to the list

// function buildSongsHtml (songs) {
//   var songStr = "";

//   // console.log(songs);
//   songs.forEach(function(song) {
//     songStr = songStr + "(" + song.trackNumber + ") " + song.name + "&ndash; ";
//   });
//     var songHtml =
//       "<li class='list-group-item'>" +
//         "<h4 class='inline-header'> Songs:</h4>" +
//         "<span>" + songStr + "</span>" +
//       "</li>";
//     return songHtml;
// }



// function handleNewSongButtonClick(albums) {
//   $('#albums').on('click', '.add-song', function(e) {

//     var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"

//     $('#songModal').attr('album-id', id);
//     $('#songModal').modal();

//     handleNewSongSubmit(albums, id);

//   });
// }


// function handleNewSongSubmit(albums, id) {
//   $('#saveSong').on('click', function(event) {
//     event.preventDefault();

//     var album = albums.filter(function(selectedAlbum){

//       if(id == selectedAlbum._id){
//         return selectedAlbum;
//         // console.log(selectedAlbum._id);
//       }
//     });


//     console.log(album[0].songs);


//     var $songName = $("#songName").val();
//     var $trackNumber = $("#trackNumber").val();

//     var songObject = {
//       name: $songName,
//       trackNumber: $trackNumber
//     };
//     // console.log(songObject);
//     // $.postJSON( "/api/albums", function( data ) {
//       album[0].songs.push(songObject);
//     // });
//   });
// }
