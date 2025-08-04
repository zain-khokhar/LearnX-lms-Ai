// app/uicomponents/RouteLoaderProvider.js
"use client";
import { createContext, useContext } from "react";

const RouteLoaderContext = createContext();

export function useRouteLoader() {
  return useContext(RouteLoaderContext);
}

export default function RouteLoaderProvider({ children }) {
  return (
    <RouteLoaderContext.Provider value={{ loading: false }}>
      {children}
    </RouteLoaderContext.Provider>
  );
}
