import React from "react";
import {TwitterTweetEmbed} from 'react-twitter-embed';
import YouTube from 'react-youtube';
import ParsedTweets from "./ParsedTweets.json"; 
import ParsedYoutube from "./ParsedYoutube.json"; 

const contents = ParsedTweets.concat(ParsedYoutube)
let shuffled = contents
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)

class Canvas extends React.Component {
    render() {

        return (
            <div className="content-container">
                {shuffled.map((val, i, arr)=>{
                    if (val.contentType === 'tweet') {
                        return (<TwitterTweetEmbed
                            tweetId = {val.contentSourceId}
                            />)
                    } else if (val.contentType === 'youtube') {
                        return (<YouTube
                            videoId = {val.contentSourceId}
                            onReady={this._onReady}
                            />)
                    }
                })}
                {/* {tweets.map(s => (<TwitterTweetEmbed
                    tweetId = {s.contentSourceId}
                    />))}
                <YouTube
                    videoId="YF3dQlMu8hw"
                    onReady={this._onReady}
                /> */}
            </div>
        );
    }
}

export default Canvas