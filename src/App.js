import React, { Component } from "react";
import Map from "./Components/Map";
import "./App.css";

class App extends Component {
  render() {

    return (
      <div className="container">
        <h1>Mine-Sweeper</h1>
        <div className="App">
          <Map  />
          
        </div>
        
      </div>
    );
  }
}

export default App;
