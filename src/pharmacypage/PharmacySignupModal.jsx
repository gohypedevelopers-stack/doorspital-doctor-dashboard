import React, { useEffect, useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { State, City } from "country-state-city";
import { apiRequest } from "../lib/api.js";

const COUNTRY_CODE = "IN";
const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100";
const labelClass = "block text-sm font-medium text-slate-700";
const phoneInputClass =
  "!h-11 !w-full !rounded-xl !border !border-slate-200 !bg-slate-50 !pl-14 !pr-3.5 !text-sm !text-slate-900 !shadow-sm focus:!border-blue-500 focus:!bg-white focus:!ring-4 focus:!ring-blue-100";
const phoneButtonClass = "!rounded-l-xl !border-slate-200 !bg-slate-50";

const PHARMACY_TYPE_OPTIONS = [
  "Retail",
  "Online",
  "Hospital-attached",
  "Clinic-attached",
  "Wholesale",
  "Other",
];

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function PharmacyDeliverySignupModal({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToLogin,
}) {
  const [form, setForm] = useState({
    ownerName: "",
    whatsappNumber: "",
    storeName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    drugLicenseNumber: "",
    licenseAuthority: "",
    licenseExpiryDate: "",
    gstNumber: "",
    panNumber: "",
    pharmacyType: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const stateOptions = useMemo(() => State.getStatesOfCountry(COUNTRY_CODE), []);

  useEffect(() => {
    if (!form.state) {
      setCityOptions([]);
      setForm((prev) => ({ ...prev, city: "" }));
    }
  }, [form.state]);

  const closeModal = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handlePhoneChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStateChange = (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, state: value, city: "" }));
    setCityOptions(value ? City.getCitiesOfState(COUNTRY_CODE, value) : []);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.drugLicenseNumber.trim()) {
      setError("Drug License Number is required.");
      return;
    }

    if (!form.licenseAuthority.trim()) {
      setError("License issuing authority is required.");
      return;
    }

    if (!form.licenseExpiryDate) {
      setError("License validity / expiry date is required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await apiRequest("/api/pharmacy/delivery/sign-up", {
        method: "POST",
        body: {
          ownerName: form.ownerName,
          whatsappNumber: form.whatsappNumber,
          storeName: form.storeName,
          email: form.email,
          phoneNumber: form.phoneNumber,
          password: form.password,
          drugLicenseNumber: form.drugLicenseNumber,
          licenseAuthority: form.licenseAuthority,
          licenseExpiryDate: form.licenseExpiryDate,
          gstNumber: form.gstNumber || undefined,
          panNumber: form.panNumber || undefined,
          pharmacyType: form.pharmacyType,
          address: {
            line1: form.addressLine1,
            line2: form.addressLine2,
            state: form.state,
            city: form.city,
            pincode: form.pincode,
          },
        },
      });

      onSuccess?.(form.email);
      setForm({
        ownerName: "",
        whatsappNumber: "",
        storeName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        drugLicenseNumber: "",
        licenseAuthority: "",
        licenseExpiryDate: "",
        gstNumber: "",
        panNumber: "",
        pharmacyType: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        city: "",
        pincode: "",
      });
    } catch (err) {
      setError(err.message || "Unable to sign up right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="mx-auto flex max-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-blue-200 bg-gradient-to-br from-white via-blue-50/50 to-slate-100 p-2 shadow-[0_32px_80px_rgba(15,23,42,0.24)] ring-1 ring-blue-300/60"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[26px] bg-white/95 shadow-lg shadow-blue-900/10 ring-1 ring-slate-200/80">
          <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-7">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Pharmacy Sign up</h2>
              <p className="mt-1 text-sm text-slate-500">
                Add store, licensing, and location details for admin approval.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 lg:grid-cols-2">
                <Field label="Owner / Contact person name">
                  <input
                    value={form.ownerName}
                    onChange={handleChange("ownerName")}
                    required
                    className={fieldClass}
                  />
                </Field>

                <Field label="Official pharmacy / store name">
                  <input
                    value={form.storeName}
                    onChange={handleChange("storeName")}
                    required
                    className={fieldClass}
                  />
                </Field>

                <Field label="Business email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    placeholder="store@example.com"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Phone number">
                  <PhoneInput
                    country="in"
                    value={form.phoneNumber}
                    onChange={handlePhoneChange("phoneNumber")}
                    inputClass={phoneInputClass}
                    buttonClass={phoneButtonClass}
                    containerClass="w-full"
                    enableSearch
                    specialLabel=""
                  />
                </Field>

                <Field label="Password">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange("password")}
                      required
                      className={`${fieldClass} pr-16`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-500"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm password">
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      required
                      className={`${fieldClass} pr-16`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-500"
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </Field>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Field label="Drug License Number">
                  <input
                    value={form.drugLicenseNumber}
                    onChange={handleChange("drugLicenseNumber")}
                    required
                    className={fieldClass}
                  />
                </Field>

                <Field label="License issuing authority / council name">
                  <input
                    value={form.licenseAuthority}
                    onChange={handleChange("licenseAuthority")}
                    required
                    placeholder="e.g., State Drug Control Department"
                    className={fieldClass}
                  />
                </Field>

                <Field label="License validity / expiry date">
                  <input
                    type="date"
                    value={form.licenseExpiryDate}
                    onChange={handleChange("licenseExpiryDate")}
                    required
                    className={fieldClass}
                  />
                </Field>

                <Field label="Pharmacy type">
                  <select
                    value={form.pharmacyType}
                    onChange={handleChange("pharmacyType")}
                    required
                    className={fieldClass}
                  >
                    <option value="">Select type</option>
                    {PHARMACY_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Field label="GST Number">
                  <input
                    value={form.gstNumber}
                    onChange={handleChange("gstNumber")}
                    placeholder="Optional"
                    className={fieldClass}
                  />
                </Field>

                <Field label="PAN Number">
                  <input
                    value={form.panNumber}
                    onChange={handleChange("panNumber")}
                    placeholder="Optional"
                    className={fieldClass}
                  />
                </Field>
              </div>

              <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Store Address
                </h3>

                <Field label="Address Line 1">
                  <input
                    value={form.addressLine1}
                    onChange={handleChange("addressLine1")}
                    required
                    className={fieldClass}
                  />
                </Field>

                <Field label="Address Line 2">
                  <input
                    value={form.addressLine2}
                    onChange={handleChange("addressLine2")}
                    placeholder="Area or landmark"
                    className={fieldClass}
                  />
                </Field>

                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="State">
                    <select
                      value={form.state}
                      onChange={handleStateChange}
                      required
                      className={fieldClass}
                    >
                      <option value="">Select state</option>
                      {stateOptions.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="City">
                    <select
                      value={form.city}
                      onChange={handleChange("city")}
                      required
                      disabled={!cityOptions.length}
                      className={fieldClass}
                    >
                      <option value="">
                        {cityOptions.length ? "Select city" : "Select state first"}
                      </option>
                      {cityOptions.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="max-w-xs">
                  <Field label="Pincode">
                    <input
                      value={form.pincode}
                      onChange={handleChange("pincode")}
                      required
                      maxLength={10}
                      className={fieldClass}
                    />
                  </Field>
                </div>
              </div>

              {error && (
                <p className="text-sm text-rose-600" role="alert">
                  {error}
                </p>
              )}

              <div className="sticky bottom-0 -mx-5 border-t border-slate-200 bg-white/95 px-5 pt-4 backdrop-blur sm:-mx-7 sm:px-7">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-blue-600 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-slate-400 disabled:text-slate-100"
                >
                  {isSubmitting ? "Creating pharmacy account..." : "Create pharmacy account"}
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:px-7">
            Already have an account?{" "}
            <button
              type="button"
              className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              onClick={() => {
                closeModal();
                onSwitchToLogin?.();
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
