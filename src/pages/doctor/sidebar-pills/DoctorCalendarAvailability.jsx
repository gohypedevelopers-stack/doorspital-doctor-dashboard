import React from "react";

const DoctorCalendarAvailability = ({ isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-[5px] border px-4 py-3 text-sm font-medium leading-tight transition
      ${isActive
        ? "border-blue-300 bg-card shadow-sm text-slate-900 dark:text-slate-100"
        : "border-border bg-card text-slate-900 dark:text-slate-200 hover:border-blue-200 hover:bg-blue-50/40"}
    `}
  >
    <span className="flex-1 text-left text-base font-medium tracking-tight text-slate-900 dark:text-slate-100 leading-snug">
      Doctor Calendar &amp; Availability
    </span>
    <span
      className={`flex h-6 items-center rounded-[5px] px-3 py-1 text-[11px] font-semibold leading-none
        ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
    >
      {isActive ? "Active" : "View"}
    </span>
  </button>
);

export default DoctorCalendarAvailability;


