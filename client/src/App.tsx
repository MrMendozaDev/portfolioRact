import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import FaceDetection from './components/FaceDetection/FaceDetection'
import Sidebar from "../src/components/Body/Sidebar";
import Dashboard from "../src/components/pages/Dashboard";

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <header className="App-header">
            <Sidebar />
            <Dashboard />
        </header>
        {/* <FaceDetection msg={''} /> */}
      </React.StrictMode>
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* </header> */}
    </div>
  );
}

export default App;
