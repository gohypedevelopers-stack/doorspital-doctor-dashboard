import { createContext, useContext } from "react";

const GlobalLoaderContext = createContext(null);

function useGlobalLoader() {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error("useGlobalLoader must be used within GlobalLoaderProvider");
  }
  return context;
}

export { GlobalLoaderContext, useGlobalLoader };


