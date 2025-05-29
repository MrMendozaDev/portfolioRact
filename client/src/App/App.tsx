import React from "react";
import { Provider } from "react-redux";
import { store } from "../Modules/Users/Store/Stores";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import { Sidebar } from "../Components/Body/Sidebar";
import SidebarMobile from "../Components/Body/SidebarMobile";
import AppRoutes from "Routes/AppRoutes";
import { ConfigProvider } from 'Context/ConfigContext';
import { loadConfig, getConfig } from "Config/index"

export const App = () => {
  loadConfig();
  return (
    <Provider store={store}>
      <ConfigProvider config={getConfig()}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <div className="flex">
                <SidebarMobile />
                <div className="flex-1">
                  <Sidebar />
                </div>
              </div>
            </header>
            <section>
              <AppRoutes />
            </section>
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}
