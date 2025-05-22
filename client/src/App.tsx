import React from 'react';
import logo from './logo.svg';
import './App.css';
import FaceDetection from './components/FaceDetection/FaceDetection'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <React.StrictMode>
          <FaceDetection msg={''} />
        </React.StrictMode>
      </header>
    </div>
  );
}

export default App;
