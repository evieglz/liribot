// add a variable for keys.js and have it require it 
// add a variable for twitter and have it required to twitter
// grab documentation from twitter on api, connecting it to the twitterKeys in keys.js
// create a for loop for twitter

// repeat for the remaining steps
var dotenv = require("dotenv");
dotenv.config()
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var moment = require("moment");


// twitter
var getTweets = function(){

    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'evie_gnz'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
        return console.log(error);
    }
    else{
        
        for(var i=0; i< 10; i++){
            console.log(tweets[i].created_at);
            console.log(" ");
            console.log(tweets[i].text); 

        }
        
    }
    });
}

// spotify
var getNameOfArtist=function(artist){
    return artist.name;
}

    var getSpotify = function(songName){
        var spotify = new Spotify(keys.spotifyKeys);

        spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        var songs = data.tracks.items;
        for (var i = 0; i<5; i++){
            console.log(i);
            console.log("artist(s) name: " + songs[i].artists.map(
                getNameOfArtist));
            console.log("song name: " + songs[i].name);
            console.log("preview song" + songs[i].preview_url);
            console.log("album: "+ songs[i].album.name);
            console.log("=========================================")
        }

        });
}

// Band is in town
var getBands = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
    request(queryURL, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
  
        if (!jsonData.length) {
          console.log("No results found for " + artist);
          return;
        }
  
        console.log("Upcoming concerts for " + artist + ":");
  
        for (var i = 0; i < jsonData.length; i++) {
          var show = jsonData[i];
  
          console.log(show.venue.city +"," +(show.venue.region || show.venue.country) +" at " + show.venue.name +" " + moment(show.datetime).format("MM/DD/YYYY")
          );
        }
      }
    });
  };

// imdb
var getThisMovie = function(movieName){
    request("http://www.omdbapi.com/?t=" + movieName + "&?i=tt3896198&apikey=b6e04b31", function (error, response, body) {
    if(error){
        console.log(error);
    }
    var jsonData = JSON.parse(body);
        console.log("Title: " + jsonData.Title);
        console.log("IMDB Ratings: " + jsonData.imdbRating);
        console.log("Rotten Tomatoes Rating: " + jsonData.tomatoURL);
        console.log("Year: " + jsonData.Year);
        console.log("Released: " + jsonData.Released);
        console.log("Genre: "+ jsonData.Genre);
        console.log("Directed By: "+ jsonData.Director);
        console.log("Actors: " + jsonData.Actors);
        console.log("Language(s): " + jsonData.Language);
        console.log("--------------")
        console.log("Plot: "+ jsonData.Plot);

    }); 
}

// random.txt ===having issues with it
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
  
      var dataArr = data.split(",");
  
      if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length === 1) {
        pick(dataArr[0]);
      }
    });
  };

// create a switch statement
// switch()

var pick=function(caseData, functionData){
    switch(caseData){
        case "tweets":
        getTweets();
        break;
        // spotify
        case "spotifyThisSong":
        getSpotify(functionData);
        break;
        // imdb 
        case "MovieInfo":
        getThisMovie(functionData);
        break;
        // do what it says
        case "do-what-it-says":
        doWhatItSays();
        break;
        // bands is in town
        case "concert-this":
        getBands(functionData);
        break;
        // default
        default:
        console.log("LIRI doesn't know how to do that...")
    }
}

// argOne = process.argv[2];
// argTwo = process.argv[3];

var runThisInfo= function(argOne, argTwo){
    pick(argOne, argTwo);
}

runThisInfo(process.argv[2], process.argv.slice(3).join(" "));
 




 
