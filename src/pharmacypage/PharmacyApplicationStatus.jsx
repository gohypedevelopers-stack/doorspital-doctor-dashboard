import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequest } from "../lib/api.js";

const statusTone = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  active: "bg-emerald-50 text-emerald-800 border-emerald-200",
  suspended: "bg-rose-50 text-rose-800 border-rose-200",
};

export default function PharmacyApplicationStatus() {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const email = params.get("email") || "";

  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiRequest(
          `/api/pharmacy/application-status?email=${encodeURIComponent(email)}`
        );
        if (!cancelled) setData(response?.data ?? null);
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to load application status.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [email]);

  const pharmacy = data?.pharmacy;
  const currentStatus = pharmacy?.status || "pending";
  const expiryText = useMemo(() => {
    if (!pharmacy?.licenseExpiryDate) return "Not available";
    return new Date(pharmacy.licenseExpiryDate).toLocaleDateString("en-IN");
  }, [pharmacy?.licenseExpiryDate]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-6">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Pharmacy Application
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Application Status</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Track your pharmacy onboarding progress and see what admin has decided.
          </p>
        </div>

        {!email && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Open this page from the signup success flow to see the current status of a pharmacy application.
          </div>
        )}

        {loading && <div className="text-sm text-slate-500">Loading application status...</div>}
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {pharmacy && !loading && !error && (
          <div className="space-y-6">
            <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Store</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{pharmacy.storeName}</p>
                <p className="mt-1 text-sm text-slate-500">{email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Current Status</p>
                <div
                  className={`mt-2 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${statusTone[currentStatus] || statusTone.pending}`}
                >
                  {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Owner</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{pharmacy.ownerName}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">License Expiry</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{expiryText}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Applied On</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {pharmacy.createdAt ? new Date(pharmacy.createdAt).toLocaleDateString("en-IN") : "Not available"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin Note</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {pharmacy.statusReason ||
                  (currentStatus === "active"
                    ? "Your pharmacy is approved and ready to use the dashboard."
                    : currentStatus === "suspended"
                      ? "Your pharmacy access is currently suspended."
                      : "Your pharmacy is waiting for admin review. Please check again later.")}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">Status Timeline</h2>
              <div className="mt-4 space-y-3">
                {(pharmacy.statusHistory || []).length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                    No status updates yet.
                  </div>
                ) : (
                  pharmacy.statusHistory
                    .slice()
                    .reverse()
                    .map((entry, index) => (
                      <div
                        key={`${entry.changedAt || "now"}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          {entry.toStatus?.charAt(0).toUpperCase() + entry.toStatus?.slice(1)}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {entry.reason || "No reason provided."}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          {entry.changedAt
                            ? new Date(entry.changedAt).toLocaleString("en-IN")
                            : "Time not available"}
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
