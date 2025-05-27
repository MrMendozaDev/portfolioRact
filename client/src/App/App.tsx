import React from "react";
import { Provider } from "react-redux";
import { store } from "../Modules/Users/Store/Stores";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import Sidebar from "../Components/Body/Sidebar";
import AppRoutes from "Routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Sidebar />
          </header>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
