import React, { useEffect, useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { City, State } from "country-state-city";
import { apiRequest } from "../lib/api.js";

const countryCode = "IN";
const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100";
const labelClass = "block text-sm font-medium text-slate-700";
const phoneInputClass =
  "!h-11 !w-full !rounded-xl !border !border-slate-200 !bg-slate-50 !pl-14 !pr-3.5 !text-sm !text-slate-900 !shadow-sm focus:!border-blue-500 focus:!bg-white focus:!ring-4 focus:!ring-blue-100";
const phoneButtonClass = "!rounded-l-xl !border-slate-200 !bg-slate-50";

const specializationOptions = [
  "General Physician",
  "Family Medicine Doctor",
  "Primary Care Doctor",
  "Cardiologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Nephrologist",
  "Endocrinologist",
  "Rheumatologist",
  "Hematologist",
  "Infectious Disease Specialist",
  "Neurologist",
  "Neurosurgeon",
  "Psychiatrist",
  "Psychologist",
  "Orthopedic Surgeon",
  "Physiotherapist",
  "Sports Medicine Specialist",
  "Oncologist",
  "Radiation Oncologist",
  "Surgical Oncologist",
  "ENT Specialist",
  "Ophthalmologist",
  "Optometrist",
  "Pediatrician",
  "Gynecologist",
  "Obstetrician",
  "Fertility Specialist",
  "Urologist",
  "Dermatologist",
  "Plastic Surgeon",
  "Dentist",
  "Orthodontist",
  "Endodontist",
  "Periodontist",
  "Oral & Maxillofacial Surgeon",
  "Pathologist",
  "Radiologist",
  "Emergency Medicine Specialist",
  "Critical Care Specialist",
  "Anesthesiologist",
  "Geriatrician",
  "Pain Management Specialist",
  "Palliative Care Specialist",
  "General Surgeon",
  "Cardiothoracic Surgeon",
  "Vascular Surgeon",
  "Spine Surgeon",
  "Hand Surgeon",
  "Hepatologist",
  "Allergist / Immunologist",
  "Occupational Medicine Specialist",
  "Nuclear Medicine Specialist",
  "Neonatologist",
  "Pulmonary Critical Care Specialist",
  "Bariatric Surgeon",
  "Chiropractor",
  "Audiologist",
  "Diabetologist",
  "Cosmetic Surgeon",
  "Forensic Medicine Specialist",
  "Public Health Specialist",
  "Medical Geneticist",
  "Reproductive Endocrinologist",
  "Sleep Medicine Specialist",
  "Tropical Medicine Specialist",
  "Internal Medicine Specialist",
  "Rehabilitation Medicine Specialist",
  "Proctologist",
  "Colorectal Surgeon",
  "Laparoscopic Surgeon",
  "Transplant Surgeon",
  "Clinical Nutritionist / Dietician",
  "Thoracic Surgeon",
  "Ortho Trauma Surgeon",
  "Neuropsychiatrist",
  "Interventional Cardiologist",
  "Interventional Radiologist",
  "Podiatrist",
  "Osteopath",
  "Speech & Language Therapist",
  "Other",
];

function PasswordToggleIcon({ open }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M12 5c-4.333 0-7.667 3.333-9 7 1.333 3.667 4.667 7 9 7s7.667-3.333 9-7c-1.333-3.667-4.667-7-9-7Zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
        />
        <circle cx="12" cy="12" r="2.5" fill="white" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12 5c-4.333 0-7.667 3.333-9 7 1.333 3.667 4.667 7 9 7s7.667-3.333 9-7c-1.333-3.667-4.667-7-9-7Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18"
      />
      <circle cx="12" cy="12" r="2.5" fill="white" />
    </svg>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function SignupModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    otherSpecialization: "",
    experienceYears: "",
    consultationFee: "",
    timezone: "Asia/Kolkata",
    state: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const stateOptions = useMemo(() => State.getStatesOfCountry(countryCode), []);

  useEffect(() => {
    if (!form.state) {
      setCityOptions([]);
      setForm((prev) => ({ ...prev, city: "" }));
    }
  }, [form.state]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSpecializationChange = (event) => {
    const { value } = event.target;
    setForm((prev) => ({
      ...prev,
      specialization: value,
      otherSpecialization: value === "Other" ? prev.otherSpecialization : "",
    }));
  };

  const handleStateChange = (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, state: value, city: "" }));
    setCityOptions(value ? City.getCitiesOfState(countryCode, value) : []);
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest("/api/doctors/sign-up", {
        method: "POST",
        body: {
          name: form.name,
          phoneNumber: form.phoneNumber,
          email: form.email,
          password: form.password,
          specialization:
            form.specialization === "Other" ? form.otherSpecialization : form.specialization,
          experienceYears: form.experienceYears,
          consultationFee: form.consultationFee,
          timeZone: form.timezone,
          state: form.state,
          city: form.city,
        },
      });

      const submittedEmail = form.email;
      setForm({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        specialization: "",
        otherSpecialization: "",
        experienceYears: "",
        consultationFee: "",
        timezone: "Asia/Kolkata",
        state: "",
        city: "",
      });
      onSuccess?.(submittedEmail);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto flex max-h-[calc(100vh-3rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-blue-200 bg-gradient-to-br from-white via-blue-50/50 to-slate-100 p-2 shadow-[0_32px_80px_rgba(15,23,42,0.24)] ring-1 ring-blue-300/60"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[26px] bg-white/95 shadow-lg shadow-blue-900/10 ring-1 ring-slate-200/80">
          <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-7">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Doctor Sign up</h2>
              <p className="mt-1 text-sm text-slate-500">
                Create your account with personal and practice details.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 lg:grid-cols-2">
                <Field label="Name">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    className={fieldClass}
                  />
                </Field>

                <Field label="Phone number">
                  <PhoneInput
                    country="in"
                    value={form.phoneNumber}
                    onChange={handlePhoneChange}
                    inputClass={phoneInputClass}
                    buttonClass={phoneButtonClass}
                    containerClass="w-full"
                    enableSearch
                    specialLabel=""
                  />
                </Field>

                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    className={fieldClass}
                  />
                </Field>

                <Field label="Password">
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange("password")}
                      required
                      className={`${fieldClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-500"
                    >
                      <PasswordToggleIcon open={showPassword} />
                    </button>
                  </div>
                </Field>

                <Field label="Confirm password">
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      required
                      className={`${fieldClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((value) => !value)}
                      className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-500"
                    >
                      <PasswordToggleIcon open={showConfirm} />
                    </button>
                  </div>
                </Field>

                <Field label="Specialization">
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleSpecializationChange}
                    required
                    className={fieldClass}
                  >
                    <option value="">Select specialization</option>
                    {specializationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {form.specialization === "Other" && (
                <div className="max-w-xl">
                  <Field label="Please specify">
                    <input
                      name="otherSpecialization"
                      value={form.otherSpecialization}
                      onChange={handleChange("otherSpecialization")}
                      required
                      className={fieldClass}
                    />
                  </Field>
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Experience (years)">
                    <input
                      type="number"
                      min="0"
                      name="experienceYears"
                      value={form.experienceYears}
                      onChange={handleChange("experienceYears")}
                      required
                      className={fieldClass}
                    />
                  </Field>

                  <Field label="Consultation fee (Rs)">
                    <input
                      type="number"
                      min="0"
                      step="10"
                      name="consultationFee"
                      value={form.consultationFee}
                      onChange={handleChange("consultationFee")}
                      required
                      className={fieldClass}
                    />
                  </Field>
                </div>

                <Field label="Timezone">
                  <input
                    name="timezone"
                    value={form.timezone}
                    readOnly
                    className={`${fieldClass} cursor-not-allowed bg-slate-100 text-slate-500`}
                  />
                </Field>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Field label="State">
                  <select
                    name="state"
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
                    name="city"
                    value={form.city}
                    onChange={handleChange("city")}
                    required
                    disabled={!cityOptions.length}
                    className={fieldClass}
                  >
                    <option value="">{cityOptions.length ? "Select city" : "Select state first"}</option>
                    {cityOptions.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </Field>
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
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
