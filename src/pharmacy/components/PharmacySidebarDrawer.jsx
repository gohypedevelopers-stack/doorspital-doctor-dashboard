// src/pharmacy/components/PharmacySidebarDrawer.jsx
import React from "react";
import Sidebar from "./Sidebar.jsx";

export function PharmacySidebarDrawer({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex lg:hidden ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity ${
          open ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />
    <div
      className={`relative h-full w-64 max-w-[80vw] transform bg-card shadow-2xl transition-transform ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Sidebar onNavigate={onClose} />
    </div>
  </div>
);
}


