import { createContext, useContext } from "react";

const RegistrationContext = createContext(null);

function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return ctx;
}

export { RegistrationContext, useRegistration };

