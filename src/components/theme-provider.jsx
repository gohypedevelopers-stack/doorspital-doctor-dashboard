import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProviderContext } from "@/lib/theme-context";

// Matches shadcn/ui docs (Vite): https://ui-v4.shadcn.com/docs/dark-mode/vite
// Types removed (this repo is JS/JSX). Valid values: "light" | "dark" | "system".

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored === "light" ? "light" : defaultTheme;
  });

  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, location.pathname]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (nextTheme) => {
        const resolvedTheme = nextTheme === "light" ? "light" : defaultTheme;
        localStorage.setItem(storageKey, resolvedTheme);
        setThemeState(resolvedTheme);
      },
    }),
    [defaultTheme, theme, storageKey]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}


