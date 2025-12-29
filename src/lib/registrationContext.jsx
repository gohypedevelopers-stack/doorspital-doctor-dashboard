import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RegistrationContext } from "@/lib/registration-context";

const STORAGE_KEY = "doctorRegistrationData";

const defaultState = {
  doctorId: "",
  personal: {
    fullName: "",
    email: "",
    phoneNumber: "",
    medicalSpecialization: "",
    yearsOfExperience: "",
    clinicHospitalName: "",
    clinicAddress: "",
    state: "",
    city: "",
  },
  registration: {
    registrationNumber: "",
    councilName: "",
    councilDisplayName: "",
    issueDate: "",
  },
  identity: {
    documentType: "",
  },
  files: {
    mbbsCertificate: null,
    mdMsBdsCertificate: null,
    registrationCertificate: null,
    governmentId: null,
    selfie: null,
  },
};

const hydrateFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      personal: { ...defaultState.personal, ...parsed.personal },
      registration: { ...defaultState.registration, ...parsed.registration },
      identity: { ...defaultState.identity, ...parsed.identity },
      files: { ...defaultState.files },
    };
  } catch {
    return defaultState;
  }
};

export const RegistrationProvider = ({ children }) => {
  const [data, setData] = useState(() => hydrateFromStorage());

  useEffect(() => {
    const snapshot = {
      doctorId: data.doctorId,
      personal: data.personal,
      registration: data.registration,
      identity: data.identity,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [data.doctorId, data.personal, data.registration, data.identity]);

  const setDoctorId = useCallback(
    (doctorId) =>
      setData((prev) => ({
        ...prev,
        doctorId: doctorId?.trim() ?? "",
      })),
    []
  );

  const updatePersonal = useCallback(
    (updates) =>
      setData((prev) => ({
        ...prev,
        personal: { ...prev.personal, ...updates },
      })),
    []
  );

  const updateRegistration = useCallback(
    (updates) =>
      setData((prev) => ({
        ...prev,
        registration: { ...prev.registration, ...updates },
      })),
    []
  );

  const updateIdentity = useCallback(
    (updates) =>
      setData((prev) => ({
        ...prev,
        identity: { ...prev.identity, ...updates },
      })),
    []
  );

  const updateFiles = useCallback(
    (files) =>
      setData((prev) => ({
        ...prev,
        files: { ...prev.files, ...files },
      })),
    []
  );

  const resetRegistration = useCallback(
    (preserveDoctorId = true) => {
      const doctorId = preserveDoctorId ? data.doctorId : "";
      setData({ ...defaultState, doctorId });
      if (!preserveDoctorId) {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    [data.doctorId]
  );

  const value = useMemo(
    () => ({
      data,
      setDoctorId,
      updatePersonal,
      updateRegistration,
      updateIdentity,
      updateFiles,
      resetRegistration,
    }),
    [
      data,
      setDoctorId,
      updatePersonal,
      updateRegistration,
      updateIdentity,
      updateFiles,
      resetRegistration,
    ]
  );

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
};



