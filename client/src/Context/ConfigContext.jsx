import React, { createContext, useContext } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ config, children }) => (
  <ConfigContext.Provider value={config}>
    {children}
  </ConfigContext.Provider>
);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig debe usarse dentro de <ConfigProvider>');
  }
  return context;
};
