// src/pharmacy/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import storePanelLogo from "../assets/storepanellogo.png";
import bellicon from "../assets/bellicon.png";
import { getPharmacySession } from "../../lib/pharmacySession.js";

const menuItems = [
  { label: "Dashboard", to: "/pharmacy", status: "Active" },
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
        isActive ? "border-emerald-400 text-white shadow-[0_10px_30px_rgba(0,255,173,0.15)]" : ""
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
          status ? "text-emerald-400" : "text-slate-500"
        }`}
      >
        {status ?? "View"}
      </span>
    </Link>
  );
};

const Sidebar = ({ onNavigate }) => {
  const session = getPharmacySession();
  const pharmacy = session?.pharmacy ?? {};
  const storeName = pharmacy?.storeName || session?.user?.userName || "City Pharmacy";
  const userName = session?.user?.userName ?? "Pharmacy Partner";

  return (
    <aside className="flex flex-col w-full space-y-6 rounded-3xl bg-[#050a1a] p-6 text-white lg:w-64 lg:border-r lg:border-border">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 p-1">
            <img
              src={storePanelLogo}
              alt="Store badge"
              className="h-full w-full rounded-xl object-contain bg-white"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Doorspital</p>
            <p className="text-lg font-semibold">{storeName}</p>
            <p className="text-sm text-slate-400">Good afternoon, {userName}</p>
          </div>
        </div>
        <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500" />
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <NavItem
            key={item.label}
            label={item.label}
            to={item.to}
            status={index === 0 ? "Active" : undefined}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="flex items-center gap-3 rounded-2xl bg-slate-900/60 p-3 text-sm shadow-inner">
        <span className="h-10 w-10 rounded-xl bg-slate-800/50 flex items-center justify-center">
          <img src={bellicon} alt="Notification" className="h-6 w-6" />
        </span>
        <div>
          <p className="text-white">Need help?</p>
          <p className="text-xs text-slate-400">Reach out to support</p>
        </div>
        <div className="ml-auto rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
          Chat
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
