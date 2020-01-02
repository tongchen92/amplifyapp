const fetch = require("node-fetch");
const cheerio = require('cheerio');
const request = require("request");
var fs = require('fs');

const url = 'https://twitter.com/Scriptbloxian'

function fetchTweet (url){
    let myFetch = fetch(url);
    myFetch.then(function(response) {
        var contentList = []
        response.text().then(function(text) {
          const $ = cheerio.load(text)
          const tweets = $('li.stream-item')
          tweets.each(function(index, element){
              const obj = [{
                  contentType: 'tweet',
                  contentSourceId: $(this).data().itemId,
                  contentText: $(this).find('p.tweet-text').text()
              }]
              contentList = contentList.concat(obj)
      
          })
          var json = JSON.stringify(contentList);
          fs.writeFile('ParsedTweets.json', json, 'utf8', function(err) {
              if (err) throw err;
              console.log('complete');
              });
          console.log(contentList)
        });
      });
}

// fetchTweet(url);
const youtubeurl = 'https://www.youtube.com/results?search_query=ninja+legend'

function fetchYoutube(url) {
    let myFetch = fetch(url);

    myFetch.then(function(response) {
        var contentList = []
        response.text().then(function(text) {
            const $ = cheerio.load(text)
            const items = $(".yt-lockup")
            items.each(function(index, element){
                const obj = [{
                    contentType: 'youtube',
                    contentSourceId: $(this).data().contextItemId,
                    contentText: $(this).find(".yt-lockup-description").text()
                }]
                contentList = contentList.concat(obj)
            })
          var json = JSON.stringify(contentList);
          fs.writeFile('ParsedYoutube.json', json, 'utf8', function(err) {
              if (err) throw err;
              console.log('complete');
              });
        });
      });
}

fetchYoutube(youtubeurl)
