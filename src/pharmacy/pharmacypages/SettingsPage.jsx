// src/pages/SettingsPage.jsx
import React, { useEffect, useState } from "react";
import PharmacyLayout, { PharmacyMenuToggle } from "../components/PharmacyLayout.jsx";
import bellicon from "../assets/bellicon.png";
import PharmacyProfileBadge from "../components/PharmacyProfileBadge.jsx";
import { apiRequest } from "../../lib/api.js";
import {getPharmacySession,getPharmacyToken,} from "../../lib/pharmacySession.js";
import { useGlobalLoader } from "../../lib/global-loader-context.js";

const formatAddress = (address) => {
  if (!address) return "";
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pincode,
  ];
  return parts.filter(Boolean).join(", ");
};

const SettingsPage = () => {
  const [profileData, setProfileData] = useState({
    storeName: "",
    ownerName: "",
    phoneNumber: "",
    storeAddress: "",
  });
  const token = getPharmacyToken();
  const { showLoader, hideLoader } = useGlobalLoader();

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const fetchProfile = async () => {
      showLoader();
      try {
        const response = await apiRequest("/api/pharmacy/profile", { token });
        if (cancelled) return;
        const data = response?.data ?? {};
        setProfileData({
          storeName: data.storeName ?? "",
          ownerName: data.ownerName ?? "",
          phoneNumber: data.phoneNumber ?? "",
          storeAddress: formatAddress(data.address),
        });
      } catch (error) {
        console.error("Unable to load pharmacy profile for settings:", error);
      } finally {
        hideLoader();
      }
    };

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [token, hideLoader, showLoader]);
  return (
    <PharmacyLayout
      mainClassName="flex-1 bg-[#f4f8f7] px-4 sm:px-6 lg:px-10 py-6 dark:bg-[#1E293B]"
      header={({ openDrawer }) => (
        <header className="flex items-center justify-between border-b border-border bg-[#707888] px-4 sm:px-6 lg:px-10 py-1">
          <div className="flex items-center gap-3">
            <PharmacyMenuToggle onClick={openDrawer} />
            <div>
              <h1 className="text-[20px] font-semibold text-slate-100 dark:text-slate-100">
                General Settings
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <img src={bellicon} alt="Notifications" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe9d6]">
              <PharmacyProfileBadge wrapperClassName="h-full w-full overflow-visible" imgClassName="rounded-xl" />
            </div>
          </div>
        </header>
      )}
    >
      <div className="mx-auto w-full max-w-5xl space-y-5 bg-[#f4f8f7] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 dark:bg-[#1E293B]">
        {/* Profile Information */}
        <section className="bg-card rounded-3xl shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-border px-6 py-5">
          <header className="border-b border-border pb-3 mb-4">
            <h3 className="font-semibold text-[14px] text-slate-900 dark:text-slate-100">
              Profile Information
            </h3>
          </header>

          <div className="space-y-4 text-[13px]">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name">
                <Input value={profileData.ownerName} readOnly />
              </Field>
              <Field label="Email Address">
                <Input
                  value={getPharmacySession()?.user?.email ?? ""}
                  readOnly
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Contact Number">
                <Input value={profileData.phoneNumber} readOnly />
              </Field>
            </div>
          </div>
        </section>

        {/* Pharmacy Details */}
        <section className="bg-card rounded-3xl shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-border px-6 py-5">
          <header className="border-b border-border pb-3 mb-4">
            <h3 className="font-semibold text-[14px] text-slate-900 dark:text-slate-100">
              Pharmacy Details
            </h3>
          </header>

          <div className="space-y-4 text-[13px]">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Store Name">
                <Input value={profileData.storeName} readOnly />
              </Field>
              <Field label="Hours of Operation">
                <Input defaultValue="9:00 AM - 7:00 PM, Mon-Sat" />
              </Field>
            </div>

            <Field label="Store Address">
              <Input value={profileData.storeAddress} readOnly />
            </Field>
          </div>
        </section>

        {/* General Preferences */}
        <section className="bg-card rounded-3xl shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-border px-6 py-5 mb-4">
          <header className="border-b border-border pb-3 mb-4">
            <h3 className="font-semibold text-[14px] text-slate-900 dark:text-slate-100">
              General Preferences
            </h3>
          </header>

          <div className="space-y-5 text-[13px]">
            <PreferenceRow
              title="Enable Dark Mode"
              description="Switch between light and dark themes."
            >
              <Toggle enabled={false} />
            </PreferenceRow>

            <PreferenceRow
              title="Email Notifications"
              description="Receive notifications about new orders and updates."
            >
              <Toggle enabled={true} />
            </PreferenceRow>
          </div>
        </section>

        {/* Footer buttons */}
        <div className="pb-10 flex justify-end gap-3 text-[13px]">
          <button className="px-4 py-2 rounded-full border border-border bg-card text-slate-600 hover:bg-muted/60">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600">
            Save Changes
          </button>
        </div>
      </div>
    </PharmacyLayout>
  );
};

/* Helper components - included here as they were in the original code */

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[12px] text-slate-500">{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
className="
      h-10 rounded-xl border border-border bg-muted/70 px-3 text-[13px]
      text-slate-900 dark:text-slate-100
      outline-none transition
      focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500
    "  />
);

const PreferenceRow = ({ title, description, children }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
    <div>
      <p className="font-medium text-slate-800 text-[13px]">{title}</p>
      <p className="text-[12px] text-slate-400">{description}</p>
    </div>
    <div>{children}</div>
  </div>
);

const Toggle = ({ enabled }) => (
  <button
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? "bg-emerald-500" : "bg-slate-300"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 rounded-full bg-card transform transition-transform ${
        enabled ? "translate-x-5" : "translate-x-1"
      }`}
    />
  </button>
);



export default SettingsPage;

