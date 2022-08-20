import React from "react";
import "./App.css";
import { Bestsellers } from "./Bestsellers";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

function App() {
  return (
    <div className="App">
      <TopNav />
      <div className="mainContent">
        <SideNav />
        <Bestsellers />
      </div>
    </div>
  );
}

export default App;
