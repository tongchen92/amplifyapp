import React from "react";
import Canvas from "./component/Canvas"

const url = "https://cors-anywhere.herokuapp.com/https://twitter.com/Scriptbloxian"

class App extends React.Component {

  getTweets = async(e) => {
    e.preventDefault();
    const api_call = await fetch(url);
    const data = await api_call.text();
    console.log(data)
  }

  render() {
    return (
    <div>
      <div className="row">
        <div className="col-xs-6 canvas-container">
          <Canvas></Canvas>
        </div>
      </div>
    </div>
    );
  }
}

function getTweets() {
  fetch(url)
  .then(function(response) {
    return response.text()
  })
  .then(function(html){
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");

    console.log(doc.querySelectorAll('li.stream-item')[0])
  })
}

getTweets()

export default App;

