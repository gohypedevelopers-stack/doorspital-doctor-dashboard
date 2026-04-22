import React, { useCallback, useEffect, useMemo, useState } from "react";
import PharmacyLayout, { PharmacyMenuToggle } from "../components/PharmacyLayout.jsx";
import bellicon from "../assets/bellicon.png";
import PharmacyProfileBadge from "../components/PharmacyProfileBadge.jsx";
import { apiRequest } from "../../lib/api.js";
import { getPharmacyToken } from "../../lib/pharmacySession.js";
import { useGlobalLoader } from "../../lib/global-loader-context.js";
import GlobalLoader from "@/GlobalLoader.jsx";

const resolveDocUrl = (document) => {
  if (!document) return "";
  if (typeof document === "string") return document;
  return document.url || document.path || "";
};

const Field = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">{label}</p>
    <p className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-700">{value}</p>
  </div>
);

const EditableField = ({ label, value, name, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="h-11 rounded-2xl border border-border bg-muted/60 px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-emerald-500 focus:bg-card focus:ring-2 focus:ring-emerald-100"
    />
  </div>
);

export default function StoreProfile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    storeName: "",
    ownerName: "",
    phoneNumber: "",
    whatsappNumber: "",
    drugLicenseNumber: "",
    licenseAuthority: "",
    licenseExpiryDate: "",
    gstNumber: "",
    panNumber: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notices, setNotices] = useState({ expiry: null, status: null });
  const [documents, setDocuments] = useState({
    drugLicenseDocument: null,
    gstDocument: null,
    panDocument: null,
  });
  const token = getPharmacyToken();
  const { showLoader, hideLoader } = useGlobalLoader();

  const renderHeader = (title) => ({ openDrawer }) => (
    <header className="flex items-center justify-between border-b border-border bg-card dark:bg-[#1E293B] px-4 sm:px-6 lg:px-10 py-1">
      <div className="flex items-center gap-3">
        <PharmacyMenuToggle onClick={openDrawer} />
        <h1 className="text-[20px] font-semibold text-slate-100">{title}</h1>
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
  );

  const loadProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest("/api/pharmacy/profile", { token });
      setProfile(response?.data ?? null);
      setNotices(response?.notices ?? { expiry: null, status: null });
      if (response?.data) {
        setForm({
          storeName: response.data.storeName || "",
          ownerName: response.data.ownerName || "",
          phoneNumber: response.data.phoneNumber || "",
          whatsappNumber: response.data.whatsappNumber || "",
          drugLicenseNumber: response.data.drugLicenseNumber || "",
          licenseAuthority: response.data.licenseAuthority || "",
          licenseExpiryDate:
            response.data.licenseExpiryDate &&
            response.data.licenseExpiryDate.slice(0, 10),
          gstNumber: response.data.gstNumber || "",
          panNumber: response.data.panNumber || "",
          line1: response.data.address?.line1 || "",
          line2: response.data.address?.line2 || "",
          city: response.data.address?.city || "",
          state: response.data.address?.state || "",
          pincode: response.data.address?.pincode || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setError(err.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (field) => (event) => {
    const file = event.target.files?.[0] || null;
    setDocuments((prev) => ({ ...prev, [field]: file }));
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    setError("");
    showLoader();
    try {
      const payload = new FormData();
      payload.append("storeName", form.storeName);
      payload.append("ownerName", form.ownerName);
      payload.append("phoneNumber", form.phoneNumber);
      payload.append("whatsappNumber", form.whatsappNumber);
      payload.append("drugLicenseNumber", form.drugLicenseNumber);
      payload.append("licenseAuthority", form.licenseAuthority);
      payload.append("licenseExpiryDate", form.licenseExpiryDate);
      payload.append("gstNumber", form.gstNumber);
      payload.append("panNumber", form.panNumber);
      payload.append("address[line1]", form.line1);
      payload.append("address[line2]", form.line2);
      payload.append("address[city]", form.city);
      payload.append("address[state]", form.state);
      payload.append("address[pincode]", form.pincode);
      if (documents.drugLicenseDocument) {
        payload.append("drugLicenseDocument", documents.drugLicenseDocument);
      }
      if (documents.gstDocument) {
        payload.append("gstDocument", documents.gstDocument);
      }
      if (documents.panDocument) {
        payload.append("panDocument", documents.panDocument);
      }

      await apiRequest("/api/pharmacy/profile", {
        method: "PUT",
        token,
        body: payload,
        isForm: true,
      });
      setEditing(false);
      setDocuments({
        drugLicenseDocument: null,
        gstDocument: null,
        panDocument: null,
      });
      await loadProfile();
    } catch (err) {
      console.error("Failed to update profile", err);
      setError(err.message || "Unable to save profile");
    } finally {
      setSaving(false);
      hideLoader();
    }
  };

  const expirationLabel = useMemo(() => {
    if (!profile?.licenseExpiryDate) return "Not set";
    return new Date(profile.licenseExpiryDate).toLocaleDateString();
  }, [profile]);

  if (loading) {
    return <GlobalLoader fullPage />;
  }

  if (!profile) {
    return (
      <PharmacyLayout
        mainClassName="flex-1 bg-[#f4f8f7] dark:bg-[#1E293B] px-4 sm:px-6 lg:px-10 py-7"
        header={renderHeader("Store Profile")}
      >
        <div className="flex flex-1 items-center justify-center text-sm text-slate-600">
          No profile available.
        </div>
      </PharmacyLayout>
    );
  }

  return (
    <PharmacyLayout
      mainClassName="flex-1 bg-[#f4f8f7] px-4 sm:px-6 lg:px-10 py-6 dark:bg-[#1E293B]"
      header={renderHeader("Store Profile")}
    >
      <div className="mx-auto w-full max-w-5xl space-y-6 rounded-3xl border border-border bg-card/95 p-6 md:p-10 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        {error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}

        {notices.status && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {notices.status.message}
          </div>
        )}

        {notices.expiry && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
            {notices.expiry.message}
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Store Profile
            </span>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Manage your pharmacy details and contact information.
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              This information is used on invoices, prescriptions and communication with your customers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEditing((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(16,185,129,0.45)] transition hover:bg-emerald-600"
          >
            {editing ? "Cancel" : "Edit profile"}
          </button>
        </div>

        {editing ? (
          <form className="space-y-7">
            <div className="grid gap-5 md:grid-cols-2">
              <EditableField label="Store Name" name="storeName" value={form.storeName} onChange={handleFormChange} />
              <EditableField label="Owner / Contact Person" name="ownerName" value={form.ownerName} onChange={handleFormChange} />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <EditableField label="Phone" name="phoneNumber" value={form.phoneNumber} onChange={handleFormChange} />
              <EditableField label="WhatsApp" name="whatsappNumber" value={form.whatsappNumber} onChange={handleFormChange} />
              <EditableField label="License ID" name="drugLicenseNumber" value={form.drugLicenseNumber} onChange={handleFormChange} />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <EditableField label="License Authority" name="licenseAuthority" value={form.licenseAuthority} onChange={handleFormChange} />
              <EditableField label="License Expiry" name="licenseExpiryDate" value={form.licenseExpiryDate} onChange={handleFormChange} />
              <EditableField label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleFormChange} />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <EditableField label="PAN Number" name="panNumber" value={form.panNumber} onChange={handleFormChange} />
              <EditableField label="City" name="city" value={form.city} onChange={handleFormChange} />
              <EditableField label="State" name="state" value={form.state} onChange={handleFormChange} />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <EditableField label="Address Line 1" name="line1" value={form.line1} onChange={handleFormChange} />
              <EditableField label="Address Line 2" name="line2" value={form.line2} onChange={handleFormChange} />
              <EditableField label="Pincode" name="pincode" value={form.pincode} onChange={handleFormChange} />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">Drug License Document</label>
                <input type="file" accept=".pdf,image/*" onChange={handleDocumentChange("drugLicenseDocument")} className="h-11 rounded-2xl border border-border bg-muted/60 px-3 pt-2 text-sm text-slate-900" />
                {documents.drugLicenseDocument && <p className="text-xs text-slate-500">{documents.drugLicenseDocument.name}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">GST Document</label>
                <input type="file" accept=".pdf,image/*" onChange={handleDocumentChange("gstDocument")} className="h-11 rounded-2xl border border-border bg-muted/60 px-3 pt-2 text-sm text-slate-900" />
                {documents.gstDocument && <p className="text-xs text-slate-500">{documents.gstDocument.name}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">PAN Document</label>
                <input type="file" accept=".pdf,image/*" onChange={handleDocumentChange("panDocument")} className="h-11 rounded-2xl border border-border bg-muted/60 px-3 pt-2 text-sm text-slate-900" />
                {documents.panDocument && <p className="text-xs text-slate-500">{documents.panDocument.name}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(16,185,129,0.45)] transition hover:bg-emerald-600 disabled:opacity-60 disabled:shadow-none"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-9">
            <div className="grid gap-4 rounded-2xl bg-slate-100 p-4 md:p-5 md:grid-cols-3">
              <Field label="Store Name" value={profile.storeName || "Unknown"} />
              <Field label="Owner / Contact person" value={profile.ownerName || "Unknown"} />
              <Field label="Phone" value={profile.phoneNumber || "Unknown"} />
            </div>

            <div className="grid gap-4 rounded-2xl bg-slate-100 p-8 md:p-5 md:grid-cols-3">
              <Field label="License ID" value={profile.drugLicenseNumber || "Unknown"} />
              <Field label="License Authority" value={profile.licenseAuthority || "Unknown"} />
              <Field label="License Expiry" value={expirationLabel} />
              <Field label="WhatsApp" value={profile.whatsappNumber || "Unknown"} />
              <Field label="GST Number" value={profile.gstNumber || "Unknown"} />
              <Field label="PAN Number" value={profile.panNumber || "Unknown"} />
              <Field label="Current Status" value={profile.status || "Unknown"} />
              <Field
                label="Store Address"
                value={[
                  profile.address?.line1,
                  profile.address?.line2,
                  profile.address?.city,
                  profile.address?.state,
                  profile.address?.pincode,
                ].filter(Boolean).join(", ") || "Unknown"}
              />
            </div>

            <div className="grid gap-4 rounded-2xl bg-slate-100 p-5 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">Drug License Document</p>
                {resolveDocUrl(profile.verificationDocuments?.drugLicenseDocument) ? (
                  <a
                    href={resolveDocUrl(profile.verificationDocuments?.drugLicenseDocument)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-emerald-600 hover:underline"
                  >
                    Open document
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-500">Not uploaded</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">GST Document</p>
                {resolveDocUrl(profile.verificationDocuments?.gstDocument) ? (
                  <a
                    href={resolveDocUrl(profile.verificationDocuments?.gstDocument)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-emerald-600 hover:underline"
                  >
                    Open document
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-500">Not uploaded</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">PAN Document</p>
                {resolveDocUrl(profile.verificationDocuments?.panDocument) ? (
                  <a
                    href={resolveDocUrl(profile.verificationDocuments?.panDocument)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-emerald-600 hover:underline"
                  >
                    Open document
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-500">Not uploaded</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PharmacyLayout>
  );
}

