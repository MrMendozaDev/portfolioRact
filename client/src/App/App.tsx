import { Provider } from "react-redux";
import { store } from "../Modules/Users/Store/Stores";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'Context/ConfigContext';
import { loadConfig, getConfig } from "Config/index"
import { Sidebar } from "../Components/Body/Sidebar";

import "./App.scss";
import SidebarMobile from "../Components/Body/SidebarMobile";
import AppRoutes from "Routes/AppRoutes";

export const App = () => {
  loadConfig();
  return (
    <Provider store={store}>
      <ConfigProvider config={getConfig()}>
        <BrowserRouter>
          <div className="App">
            <header className="bg-[#111827] App-header">
              <div className="w-full">
                <SidebarMobile />
                <Sidebar />
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
