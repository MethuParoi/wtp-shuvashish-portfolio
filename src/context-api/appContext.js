"use client";

import React, { createContext, useState, useContext } from "react";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [adminExists, setAdminExists] = useState(false);

  return (
    <AppContext.Provider value={{ adminExists, setAdminExists }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default AppContext;