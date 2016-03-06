// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tunely');
console.log('connected');
var Album = require('./models/album');
var Song = require('./models/song');

Album.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

var albumsList = [
              {
                artistName: 'Marvin Gaye',
                name: 'What\'s Going On',
                releaseDate: '1971, May 21',
                photoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg/220px-MarvinGayeWhat%27sGoingOnalbumcover.jpg',
                songList: [
                  {
                    trackNumber: 1,
                    title: "What's Going On",
                    duration: "03:53"
                  },
                  {
                    trackNumber: 2,
                    title: "What's Happening Brother",
                    duration: "02:43"
                  },
                  {
                    trackNumber: 3,
                    title: "Flyin' High (In the Friendly Sky)",
                    duration: "03:49"
                  },
                  {
                    trackNumber: 4,
                    title: "Save the Children",
                    duration: "04:03"
                  },
                  {
                    trackNumber: 5,
                    title: "God is Love",
                    duration: "01:41"
                  },
                  {
                    trackNumber: 6,
                    title: "Mercy Mercy Me (The Ecology)",
                    duration: "03:16"
                  },
                  {
                    trackNumber: 7,
                    title: "Right On",
                    duration: "07:31"
                  },
                  {
                    trackNumber: 8,
                    title: "Wholy Holy",
                    duration: "03:08"
                  },
                  {
                    trackNumber: 9,
                    title: "Inner City Blues (Make Me Wanna Holler)",
                    duration: "05:26"
                  }
                ]
              },
              {
                artistName: 'Stevie Wonder',
                name: 'Songs in the Key of Life',
                releaseDate: '1976, September 28',
                photoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Songs_in_the_key_of_life.jpg/220px-Songs_in_the_key_of_life.jpg',
                songList: [
                  {
                    trackNumber: 1,
                    title: "Love's in Need of Love Today",
                    duration: "07:06"
                  },
                  {
                    trackNumber: 2,
                    title: "Have a Talk with God",
                    duration: "02:42"
                  },
                  {
                    trackNumber: 3,
                    title: "Village Ghetto Land",
                    duration: "03:25"
                  },
                  {
                    trackNumber: 4,
                    title: "Contusion",
                    duration: "03:46"
                  },
                  {
                    trackNumber: 5,
                    title: "Sir Duke",
                    duration: "03:52"
                  },
                  {
                    trackNumber: 6,
                    title: "I Wish",
                    duration: "04:12"
                  },
                  {
                    trackNumber: 7,
                    title: "Knocks Me Off My Feet",
                    duration: "03:36"
                  },
                  {
                    trackNumber: 8,
                    title: "Pastime Paradise",
                    duration: "03:28"
                  },
                  {
                    trackNumber: 9,
                    title: "Summer Soft",
                    duration: "04:14"
                  },
                  {
                    trackNumber: 10,
                    title: "Ordinary Pain",
                    duration: "06:23"
                  },
                  {
                    trackNumber: 11,
                    title: "Isn't She Lovely",
                    duration: "06:34"
                  },
                  {
                    trackNumber: 12,
                    title: "Joy Inside My Tears",
                    duration: "06:30"
                  },
                  {
                    trackNumber: 13,
                    title: "Black Man",
                    duration: "8:30"
                  },
                  {
                    trackNumber: 14,
                    title: "Ngiculela - Es Una Historia - I Am Singing",
                    duration: "03:49"
                  },
                  {
                    trackNumber: 15,
                    title: "If It's Magic",
                    duration: "03:12"
                  },
                  {
                    trackNumber: 16,
                    title: "As",
                    duration: "07:08"
                  },
                  {
                    trackNumber: 17,
                    title: "Another Star",
                    duration: "08:28"
                  }
                ]
              },
              {
                artistName: 'Diana Ross',
                name: 'Diana',
                releaseDate: '1980, May 5',
                photoUrl: '/images/diana.png',
                songList: [
                  {
                    trackNumber: 1,
                    title: "Upside Down",
                    duration: "04:05"
                  },
                  {
                    trackNumber: 2,
                    title: "Tenderness",
                    duration: "03:52"
                  },
                  {
                    trackNumber: 3,
                    title: "Friend to Friend",
                    duration: "03:19"
                  },
                  {
                    trackNumber: 4,
                    title: "I'm Coming Out",
                    duration: "05:24"
                  },
                  {
                    trackNumber: 5,
                    title: "Have Fun",
                    duration: "05:57"
                  },
                  {
                    trackNumber: 6,
                    title: "My Old Piano",
                    duration: "03:55"
                  },
                  {
                    trackNumber: 7,
                    title: "Now That You're Gone",
                    duration: "03:59"
                  },
                  {
                    trackNumber: 8,
                    title: "Give Up",
                    duration: "03:45"
                  }
                ]
              },
               {
                artistName: 'The Temptations',
                name: 'The Temptations Wish It Would Rain',
                releaseDate: '1968, April 29',
                photoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Tempts-wish-it-would-rain.jpg/220px-Tempts-wish-it-would-rain.jpg',
                songList: [
                  {
                    trackNumber: 1,
                    title: "I Could Never Love Another (After Loving You)",
                    duration: "03:33"
                  },
                  {
                    trackNumber: 2,
                    title: "Cindy",
                    duration: "03:08"
                  },
                  {
                    trackNumber: 3,
                    title: "I Wish It Would Rain",
                    duration: "02:48"
                  },
                  {
                    trackNumber: 4,
                    title: "Please Return Your Love to Me",
                    duration: "02:26"
                  },
                  {
                    trackNumber: 5,
                    title: "Fan the Flame",
                    duration: "02:44"
                  },
                  {
                    trackNumber: 6,
                    title: "He Who Picks a Rose",
                    duration: "02:28"
                  },
                  {
                    trackNumber: 7,
                    title: "Why Did You Leave Me Darling",
                    duration: "02:11"
                  },
                  {
                    trackNumber: 8,
                    title: "I Truly, Truly Believe",
                    duration: "02:44"
                  },
                  {
                    trackNumber: 9,
                    title: "This is My Beloved",
                    duration: "02:13"
                  },
                  {
                    trackNumber: 10,
                    title: "Gonna Give Her All the Love I've Got",
                    duration: "02:46"
                  },
                  {
                    trackNumber: 11,
                    title: "I've Passed This Way Before",
                    duration: "02:43"
                  },
                  {
                    trackNumber: 12,
                    title: "No Man Can Love Her Like I Do",
                    duration: "02:16"
                  }
                ]
              },
              {
                artistName: 'Lionel Richie',
                name: 'Lionel Richie',
                releaseDate: '1982, October 6',
                photoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Lionel_Richie_(self-titled_album_-_cover_art).jpg',
                songList: [
                  {
                    trackNumber: 1,
                    title: "Serves You Right",
                    duration: "05:14"
                  },
                  {
                    trackNumber: 2,
                    title: "Wandering Stranger",
                    duration: "05:38"
                  },
                  {
                    trackNumber: 3,
                    title: "Tell Me",
                    duration: "05:32"
                  },
                  {
                    trackNumber: 4,
                    title: "My Love",
                    duration: "04:08"
                  },
                  {
                    trackNumber: 5,
                    title: "Round and Round",
                    duration: "04:57"
                  },
                  {
                    trackNumber: 6,
                    title: "Truly",
                    duration: "03:26"
                  },
                  {
                    trackNumber: 7,
                    title: "You Are",
                    duration: "05:05"
                  },
                  {
                    trackNumber: 8,
                    title: "You Mean More to Me",
                    duration: "03:08"
                  },
                  {
                    trackNumber: 9,
                    title: "Just Put Some Love in Your Heart",
                    duration: "01:27"
                  }
                ]
              }

];

Album.create(albumsList, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});
