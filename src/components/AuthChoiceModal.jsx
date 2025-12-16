import React from "react";

export default function AuthChoiceModal({
  isOpen,
  onClose,
  onDoctorSelect,
  onPharmacySelect,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs rounded-2xl bg-card p-6 shadow-xl ring-1 ring-slate-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Continue as</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-slate-600"
            aria-label="Close login option dialog"
          >
            &times;
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Choose the role you want to sign in with.
        </p>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={onDoctorSelect}
            className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm transition hover:bg-muted/60"
          >
            Doctor
          </button>
          <button
            type="button"
            onClick={onPharmacySelect}
            className="w-full rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Pharmacy
          </button>
        </div>
      </div>
    </div>
  );
}
