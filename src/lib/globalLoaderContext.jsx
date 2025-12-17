import { createContext, useCallback, useContext, useMemo, useState } from "react";
import GlobalLoader from "@/GlobalLoader.jsx";

const GlobalLoaderContext = createContext(null);

export function GlobalLoaderProvider({ children }) {
  const [activeCount, setActiveCount] = useState(0);

  const showLoader = useCallback(() => {
    setActiveCount((prev) => prev + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setActiveCount((prev) => Math.max(prev - 1, 0));
  }, []);

  const contextValue = useMemo(
    () => ({ showLoader, hideLoader }),
    [showLoader, hideLoader]
  );

  return (
    <GlobalLoaderContext.Provider value={contextValue}>
      {children}
      {activeCount > 0 && (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-slate-950/70">
          <GlobalLoader fullPage />
        </div>
      )}
    </GlobalLoaderContext.Provider>
  );
}

export function useGlobalLoader() {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error("useGlobalLoader must be used within GlobalLoaderProvider");
  }
  return context;
}
