// src/pharmacy/components/PharmacyLayout.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { PharmacySidebarDrawer } from "./PharmacySidebarDrawer.jsx";
import { useLocation } from "react-router-dom";

export default function PharmacyLayout({
  header,
  children,
  outerClassName = "min-h-screen bg-[#f4f8f7] text-slate-900 dark:bg-[#1E293B] dark:text-slate-100",
  mainClassName = "flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-7 bg-[#f4f8f7] dark:bg-[#1E293B]",
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const location = useLocation();

  useEffect(() => {
    closeDrawer();
  }, [location.pathname]);

  return (
    <div className={outerClassName}>
      <PharmacySidebarDrawer open={drawerOpen} onClose={closeDrawer} />
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-64">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col">
          {header ? header({ openDrawer }) : null}
          <main className={`${mainClassName}`}>{children}</main>
        </div>
      </div>
    </div>
  );
}

export function PharmacyMenuToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-slate-600 hover:border-slate-400 active:bg-slate-100 lg:hidden"
      aria-label="Open navigation menu"
    >
      <span className="sr-only">Open menu</span>
      <span className="flex flex-col gap-1">
        <span className="h-0.5 w-6 bg-slate-900 dark:bg-slate-100" />
        <span className="h-0.5 w-6 bg-slate-900 dark:bg-slate-100" />
        <span className="h-0.5 w-4 bg-slate-900 dark:bg-slate-100" />
      </span>
    </button>
  );
}
