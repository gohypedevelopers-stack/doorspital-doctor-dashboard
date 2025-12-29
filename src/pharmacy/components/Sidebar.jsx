// src/pharmacy/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import storePanelLogo from "../assets/storepanellogo.png";
import { getPharmacySession } from "../../lib/pharmacySession.js";

const menuItems = [
  { label: "Dashboard", to: "/pharmacy" },
  { label: "Orders", to: "/pharmacy/orders" },
  { label: "Inventory", to: "/pharmacy/inventory" },
  { label: "Earnings", to: "/pharmacy/earnings" },
  { label: "Store Profile", to: "/pharmacy/store-profile" },
  { label: "Support", to: "/pharmacy/support" },
  { label: "Settings", to: "/pharmacy/settings" },
];

const NavItem = ({ label, to, status, onNavigate }) => {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to !== "/" && to !== "/pharmacy" && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      onClick={() => onNavigate?.()}
      className={`relative flex items-center justify-between rounded-2xl border border-white/30 bg-slate-900/70 px-4 py-3 text-left text-sm font-semibold text-white shadow-md transition hover:bg-slate-900 ${
        isActive
          ? "border-emerald-400 text-white shadow-[0_10px_30px_rgba(0,255,173,0.15)]"
          : ""
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
          isActive ? "text-emerald-400" : "text-slate-500"
        }`}
      >
        {isActive ? "Active" : status ?? "View"}
      </span>
    </Link>
  );
};

const Sidebar = ({ onNavigate }) => {
  const session = getPharmacySession();
  const pharmacy = session?.pharmacy ?? {};
  const storeName =
    pharmacy?.storeName || session?.user?.userName || "City Pharmacy";
  const userName = session?.user?.userName ?? "Pharmacy Partner";

  return (
    <aside className="flex flex-col h-screen w-full space-y-9 overflow-hidden bg-[#050a1a] p-6 text-white md:w-82 lg:w-90 lg:border-r lg:border-border">
      <div className="space-y-6">
        {/* Top line */}
        <div className="flex justify-center">
          <span
            className="
            relative
            inline-flex
            items-center
            justify-center
            rounded-full bg-gradient-to-r from-blue-700 to-emerald-500
            px-6 py-1
            text-xs font-bold uppercase tracking-[0.5em] text-white
            shadow-[0_20px_45px_rgba(56,189,248,0.4)]
            after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-r after:from-blue-400 after:to-emerald-400 after:opacity-40 after:blur-xl
          "
          >
            Doorspital
          </span>
        </div>

        {/* Logo + Store name row */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 p-1 shrink-0">
            <img
              src={storePanelLogo}
              alt="Store badge"
              className="h-full w-full rounded-xl object-contain bg-white"
            />
          </div>

          <p className="text-lg font-semibold leading-tight">{storeName}</p>
        </div>

        {/* Divider */}
        <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500" />
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto pr-1 pb-2">
        {menuItems.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            to={item.to}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
