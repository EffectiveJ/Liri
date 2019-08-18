require("dotenv").config();
var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require('fs');
var command1 = process.argv[2];
var command2 = process.argv.slice(3).join("+");
var songName = command2
var bandName = command2
var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

function spotifyThis() {

    if (songName == "") {

        spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data) {

            if (err) {
                console.log('Error occurred: ' + err);
            }

            var artist = data.tracks.items[0].album.artists[0].name
            var title = data.tracks.items[0].name
            var link = data.tracks.items[0].album.external_urls.spotify
            var album = data.tracks.items[0].album.name

            console.log("No song entered, here's the default.....you're welcome")
            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);
            console.log("Album: " + album)

            fs.appendFile("log.txt", + "\nCommand: " + command1 + "\nSearch: " + songName + "\nArtist: " + artist + "\nSong Title: " + title + "\nPreview Link: " + link + "\n ", function (err) {
                if (err) {
                    return console.log(err);
                }
            })
        });
    }

    else {
        spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
            }
            var artist = data.tracks.items[0].album.artists[0].name
            var title = data.tracks.items[0].name
            var link = data.tracks.items[0].album.external_urls.spotify
            var album = data.tracks.items[0].album.name
            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);
            console.log("Album: " + album)

            fs.appendFile("log.txt",  + "\nCommand: " + command1 + "\nSearch: " + songName + "\nArtist: " + artist + "\nSong Title: " + title + "\nPreview Link: " + link + "\n ", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }
}

  function concertThis() {

    request(queryUrl, function (err, response, data) {
        if (err && response.statusCode != 200) {
            console.log('error:', err);
            console.log('statusCode:', response && response.statusCode);
        }

        var bP = JSON.parse(data);
        
        for (i = 0; i < bP.length; i++) {
            var venue = bP[i].venue.name
            var region = bP[i].venue.region
            var country = bP[i].venue.country
            var city = bP[i].venue.city

            console.log("Venue: " + venue)
            if (region === "") {
                console.log("Location: " + city + ", " + country)
            }
            else {
                console.log("Location: " + city + ", " + region)
            }
            console.log("Date: " + moment(bP[i].datetime).format('L'));
            fs.appendFile("log.txt", "\nDate: " + moment(bP[i].datetime).format('L') + "\n ", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        };
    });
};

  function movieThis() {
    var movie = command2;

    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "";

    if (queryUrl === "http://www.omdbapi.com/?apikey=trilogy&t=") {
        queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody";
    }

    request(queryUrl, function (err, response, data) {

        if (err) {
            console.log('error:', err);
            console.log('statusCode:', response);
        }
        
        var mP = JSON.parse(data);

        //Data not showing for some reason
        // console.log("Title: " + mP.Title);
        // console.log("Year Released: " + mP.Year);
        // console.log("IMDD Rating: " + mP.Ratings[0].Value);
        // console.log("Rotten Tomatoes Rating: " + mP.Ratings[1].Value);
        // console.log("Countries where the movie was produced: " + mP.Country);
        // console.log("Language: " + mP.Language);
        // console.log("Plot: " + mP.Plot);
        // console.log("Actors: " + mP.Actors);

        fs.appendFile("log.txt" + "Command: " + command1 + "\nSearch: " + movie + "\nTitle: " + mP.Title + "\nYear Released: " + mP.Year + "\nIMDD Rating: " + mP.Ratings[0].Value + "\nRotten Tomatoes Rating: " + mP.Ratings[1].Value + "\nCountries where the movie was produced: " + mP.Country + "\nLanguage: " + mP.Language + "\nPlot: " + mP.Plot + "\nActors: " + mP.Actors + "\n ", function (err) {
            if (err) {
                return console.log(err);
            }
        });
    })
}

//this is not working, switch statements aren't my thing. Ask DR for help//
// function run() {
//     switch (command1) {     
//         case "spotify-this-song":
//             spotifyThis();

//             break;
//         case "concert-this":
//             concertThis();

//             break;
//         case "movie-this":
//             movieThis();

//             break;
//     }
// }
// switch (command1) {
//     case "do-what-it-says":
//         fs.readFile("random.txt", "utf8", function (err, data) {
//             if (err) {
//                 return console.log(err);
//             }
//             var dataArr = data.split(",");
//             command1 = dataArr[0];
//             command2 = dataArr[1].replace(/"/g, "");
//             run();
//         })

//         break;
//}
