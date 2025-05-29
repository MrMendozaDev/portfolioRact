import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { loadConfig } from 'Config/index';
import { App } from './App/App';

(async () => {
  await loadConfig();
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();