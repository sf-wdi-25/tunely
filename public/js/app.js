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
    releaseDate: $li.find('input.album-releaseDate').val()
    };

    $.ajax({
      type: 'PUT',
      url: '/api/albums/' + $li.attr('editAlbumId'),
      data: album,
      success: function (newAlbum) {
        $li.find('span.album-name').html(album.name);
        $li.find('span.artist-name').html(album.artistName);
        $li.find('span.album-releaseDate').html(album.releaseDate);
        $li.removeClass('edit');

      },
      error: function() {
        alert('error updating album');
      }

    });
});








  //AJAX REQUEST TO ALBUMS API
  // $.getJSON( "/api/albums", function( data ) {
  //   //Data.albums is an array of all the albums
  //   data.albums.forEach(function(album) {
  //     //we are added an entire div to the Albums div with our data embedded in jQuery
  //     renderAlbum(album);  
  //   });
  //     handleNewSongButtonClick(data.albums);
  // });
  

  $.ajax({
    type: 'GET',
    url: '/api/albums',
    success: function(data){
      $.each(data.albums, function(i, album) {
          console.log(album);
          renderAlbum(album);
      });
    },
    error: function(err) {
      alert("error loading " + err);
    }
  });

  $.ajax({

  });

//end of document ready
});




// this function takes a single album and renders it to the page
function renderAlbum(album) {
  // console.log('rendering album:', album);
  console.log(album);

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
  "                      <li class='list-group-item' editAlbumId='"+ album._id + "''>" +
  "                      <p>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name noedit'>" + album.name + "</span>" +
  "                        <input class='edit album-name'>" +
  "                      </p>" +
  "                      <p>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name noedit'>" + album.artistName + "</span>" +
  "                        <input class='edit artist-name'>" +
  "                      </p>" +
  "                      <p>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate noedit'>" + album.releaseDate + "</span>" +
  "                        <input class='edit album-releaseDate'>" +
  "                      </p>" +

  "                       <button class='editAlbum noedit'>Edit</button>" +
  "                       <button class='saveEdit edit'>Save</button>" +
  "                       <button class='cancelEdit edit'>Cancel</button>" +
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

      // getting album div in order to append the HTML
      var $albumDiv = $("#albums");
      
      $albumDiv.append(albumHtml);
      
      // var $albumName = $(".album-name");
      // var $artistName = $(".artist-name");
      // var $albumReleaseDate = $(".album-releaseDate");

      // var $deleteButton = "<input method='POST' action='/' type='submit' class='.btn-danger' value='Delete'></input>";

      // $albumName.last().html(album.name);
      // $artistName.last().html(album.artistName);
      // $albumReleaseDate.last().html(album.releaseDate); 
}



// function buildSongsHtml (songs) {
//   var songStr = "";

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


//edit

// $albums.delegate('.editAlbum', 'click', function() {
//   var $li = $(this).closest('li');
//   $li.find('input.album-name').val($li.find('span.album-name').html());
//   $li.find('input.artist-name').val($li.find('span.artist-name').html());
//   $li.find('input.album-releaseDate').val($li.find('span.album-releaseDate').html());
//   $li.addClass('edit');
// });

// $albums.delegate('.cancelEdit', 'click', function() {
//   $(this).closest('li').removeClass('edit');
// });

// $albums.delegate('.saveEdit', 'click', function() {
//   var $li = $(this).closest('li');
//   var album = {
//     artistName: $li.find('imput.artist-name').val(),
//     name: $li.find('imput.album-name').val(),
//     releaseDate: $li.find('imput.album-releaseDate').val()
//     };

//     $.ajax({
//       type: 'PUT',
//       url: '/api/albums' + $li.attr('data-album-id'),
//       data: album,
//       success: function (newAlbum) {
//         $li.find('span.album-name').html(album.name);
//         $li.find('span.artist-name').html(album.artistName);
//         $li.find('span.artist-name').html(releaseDate);
//         $li.removeClass('edit');

//       },
//       error: function() {
//         alert('error updating album');
//       }

//     });
// });

   




























