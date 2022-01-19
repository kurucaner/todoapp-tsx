import React from "react";
import ListScreen from "./screens/ListScreen";
import "./App.css";
import HeaderImage from "../src/assets/bg-desktop-dark.jpg";

function App() {
  return (
    <div className="app">
      <img src={HeaderImage} className="img-dark-desktop"></img>
      <div className="container">
        <h3>TODO - TYPESCRIPT</h3>
        <ListScreen />
      </div>
    </div>
  );
}

export default App;
