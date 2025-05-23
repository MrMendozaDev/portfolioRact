import React from "react";
import { Provider } from 'react-redux'
import { store } from '../Modules/Users/Store/Stores'

import "./App.scss";
import Sidebar from "../Components/Body/Sidebar";
import Dashboard from "../Components/Body/Dashboard";

function App() {
  
  return (
    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <header className="App-header">
            <Sidebar />
            <Dashboard />
          </header>
        </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
