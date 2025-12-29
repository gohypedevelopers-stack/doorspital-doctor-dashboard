// src/pharmacy/components/PharmacyProfileBadge.jsx
import React from "react";
import pharmacyProfile from "../assets/pharmacyprofile.png";
import { getPharmacySession } from "../../lib/pharmacySession.js";

export default function PharmacyProfileBadge({
  wrapperClassName = "h-10 w-10",
  imgClassName = "rounded-full",
  alt = "Profile",
}) {
  const session = getPharmacySession();
  const userName = session?.user?.fullName || session?.user?.userName || "Pharmacy Partner";
  const storeName = session?.pharmacy?.storeName || "City Pharmacy";

  return (
    <div className={`group relative inline-flex ${wrapperClassName}`}>
      <img
        src={pharmacyProfile}
        alt={alt}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      <div className="pointer-events-none absolute left-1/2 top-full z-20 flex w-max -translate-x-1/2 flex-col items-center gap-1 rounded-2xl bg-white/95 px-4 py-2 text-center text-[11px] font-semibold text-slate-700 shadow-lg shadow-slate-900/20 opacity-0 transition duration-200 group-hover:opacity-100 dark:bg-slate-900/90 dark:text-slate-100">
        <span className="text-xs">{userName}</span>
        <span className="text-[11px] font-normal text-slate-500 dark:text-slate-300">
          {storeName}
        </span>
      </div>
    </div>
  );
}
