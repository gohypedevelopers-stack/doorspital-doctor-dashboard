// src/App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginModal from "./components/LoginModal.jsx";
import SignupModal from "./components/SignupModal.jsx";
import OTPModal from "./components/OTPModal.jsx";
import AuthChoiceModal from "./components/AuthChoiceModal.jsx";

// Pharmacy modals
import PharmacyLoginModal from "./pharmacypage/PharmacyLoginModal.jsx";
import PharmacySignupModal from "./pharmacypage/PharmacySignupModal.jsx";

import Home from "./pages/Home.jsx";
import Benefits from "./pages/Benefits.jsx";
import DoctorPersonalDetails from "./pages/DoctorPersonalDetails.jsx";
import DoctorQualifications from "./pages/DoctorQualifications.jsx";
import DoctorRegistration from "./pages/DoctorRegistration.jsx";
import DoctorIdentity from "./pages/DoctorIdentity.jsx";
import DoctorFaceVerification from "./pages/DoctorFaceVerification.jsx";
import DoctorVerificationSubmitted from "./pages/DoctorVerificationSubmitted.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import {
  DashboardOnboarding,
  DashboardProfile,
  DashboardServices,
  DashboardAvailability,
  DashboardAppointments,
  DashboardFollowUps,
  DashboardPatients,
  DashboardNotes,
  DashboardPrescriptions,
  DashboardFinancial,
  DashboardLeads,
  DashboardChat,
  DashboardNotifications,
} from "./pages/dashboard/DashboardSections.jsx";

// Pharmacy pages
import DashboardOverview from "./pharmacy/pharmacypages/DashboardOverview.jsx";
import InventoryList from "./pharmacy/pharmacypages/InventoryList.jsx";
import NewPrescriptionOrders from "./pharmacy/pharmacypages/NewPrescriptionOrders.jsx";
import OrderDetails from "./pharmacy/pharmacypages/OrderDetails.jsx";
import EarningsOverview from "./pharmacy/pharmacypages/EarningsOverview.jsx";
import SettingsPage from "./pharmacy/pharmacypages/SettingsPage.jsx";
import AddNewMedicine from "./pharmacy/pharmacypages/AddNewMedicine.jsx";
import EditMedicine from "./pharmacy/pharmacypages/EditMedicine.jsx";
import StoreProfile from "./pharmacy/pharmacypages/StoreProfile.jsx";
import Support from "./pharmacy/pharmacypages/Support.jsx";
import InvoicePage from "./pharmacy/pharmacypages/InvoicePage.jsx";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterFlow = location.pathname.startsWith("/register");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthChoiceOpen, setIsAuthChoiceOpen] = useState(false);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  const [authUser, setAuthUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Pharmacy session state
  const [pharmacySession, setPharmacySession] = useState(() => {
    try {
      const stored = localStorage.getItem("pharmacySession");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Pharmacy auth UI state
  const [isPharmacyLoginOpen, setIsPharmacyLoginOpen] = useState(false);
  const [isPharmacySignupOpen, setIsPharmacySignupOpen] = useState(false);

  useEffect(() => {
    if (!authToken && location.pathname.startsWith("/dashboard")) {
      setIsLoginOpen(true);
    }
  }, [authToken, location.pathname]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  useEffect(() => {
    if (pharmacySession) {
      localStorage.setItem("pharmacySession", JSON.stringify(pharmacySession));
    } else {
      localStorage.removeItem("pharmacySession");
    }
  }, [pharmacySession]);

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  const handleLoginSuccess = ({ user, token }) => {
    setAuthUser(user || null);
    setAuthToken(token || null);
    setIsLoginOpen(false);
    navigate("/dashboard");
  };

  // Pharmacy login success handler
  const handlePharmacyLoginSuccess = (session) => {
    setPharmacySession(session ?? null);
    setIsPharmacyLoginOpen(false);
    if (session?.token) {
      navigate("/pharmacy");
    }
  };

  // Pharmacy logout handler
  const handlePharmacyLogout = () => {
    setPharmacySession(null);
    navigate("/");
  };

  const handleSignupSuccess = (email) => {
    setIsSignupOpen(false);
    // OTP verification removed - go directly to login
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    setAuthUser(null);
    setAuthToken(null);
    navigate("/");
  };

  // Doctor CTA handler
  const handleDoctorJoinClick = () => {
    if (authToken) {
      navigate("/dashboard");
    } else {
      setIsAuthChoiceOpen(true);
    }
  };

  // Pharmacy CTA handler
  const handlePharmacyJoinClick = () => {
    setIsPharmacyLoginOpen(true);
  };

  const ProtectedRoute = ({ children, onRequireAuth }) => {
    if (!authToken) {
      onRequireAuth?.();
      return (
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
          Please log in to continue.
          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="ml-3 rounded-full border border-border px-3 py-1 text-xs font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-100"
          >
            Open login
          </button>
        </div>
      );
    }
    return children;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-[50px]">
      {!isRegisterFlow && (
        <>
          <Navbar
            onLoginClick={() => setIsAuthChoiceOpen(true)}
            isAuthenticated={Boolean(authUser)}
            onLogout={handleLogout}
            onSignupClick={() => setIsSignupOpen(true)}
            pharmacySession={pharmacySession}
            onPharmacyLogout={handlePharmacyLogout}
          />

          {/* Doctor auth modals */}
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSuccess={handleLoginSuccess}
            onSwitchToSignup={() => setIsSignupOpen(true)}
          />
          <SignupModal
            isOpen={isSignupOpen}
            onClose={() => setIsSignupOpen(false)}
            onSuccess={handleSignupSuccess}
            onSwitchToLogin={() => setIsLoginOpen(true)}
          />
          <OTPModal
            isOpen={isOtpOpen}
            onClose={() => setIsOtpOpen(false)}
            email={otpEmail}
            onVerified={() => {
              setIsOtpOpen(false);
              setIsLoginOpen(true);
            }}
          />

          <AuthChoiceModal
            isOpen={isAuthChoiceOpen}
            onClose={() => setIsAuthChoiceOpen(false)}
            onDoctorSelect={() => {
              setIsAuthChoiceOpen(false);
              setIsLoginOpen(true);
            }}
            onPharmacySelect={() => {
              setIsAuthChoiceOpen(false);
              setIsPharmacyLoginOpen(true);
            }}
          />

          {/* Pharmacy auth modals */}
          <PharmacyLoginModal
            isOpen={isPharmacyLoginOpen}
            onClose={() => setIsPharmacyLoginOpen(false)}
            onSuccess={handlePharmacyLoginSuccess}
            onSwitchToSignup={() => {
              setIsPharmacyLoginOpen(false);
              setIsPharmacySignupOpen(true);
            }}
            onForgotPassword={() => {
              navigate("/pharmacy/settings");
            }}
          />

          <PharmacySignupModal
            isOpen={isPharmacySignupOpen}
            onClose={() => setIsPharmacySignupOpen(false)}
            onSuccess={(email) => {
              setIsPharmacySignupOpen(false);
              setIsPharmacyLoginOpen(true);
            }}
            onSwitchToLogin={() => {
              setIsPharmacySignupOpen(false);
              setIsPharmacyLoginOpen(true);
            }}
          />
        </>
      )}

      <main className="flex-1">
        <Routes>
          {/* Marketing pages */}
          <Route
            path="/"
            element={
              <Home
                onDoctorJoinClick={handleDoctorJoinClick}
                onPharmacyJoinClick={handlePharmacyJoinClick}
              />
            }
          />
          <Route path="/benefits" element={<Benefits />} />

          {/* Dashboard with nested routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute onRequireAuth={() => setIsLoginOpen(true)}>
                <DashboardLayout token={authToken} user={authUser} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard/onboarding" replace />} />
            <Route path="onboarding" element={<DashboardOnboarding />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="services" element={<DashboardServices />} />
            <Route path="availability" element={<DashboardAvailability />} />
            <Route path="appointments" element={<DashboardAppointments />} />
            <Route path="follow-ups" element={<DashboardFollowUps />} />
            <Route path="patients" element={<DashboardPatients />} />
            <Route path="notes" element={<DashboardNotes />} />
            <Route path="prescriptions" element={<DashboardPrescriptions />} />
            <Route path="financial" element={<DashboardFinancial />} />
            <Route path="leads" element={<DashboardLeads />} />
            <Route path="chat" element={<DashboardChat />} />
            <Route path="notifications" element={<DashboardNotifications />} />
          </Route>

          {/* Registration + KYC flow */}
          <Route path="/register" element={<DoctorPersonalDetails />} />
          <Route
            path="/register/qualifications"
            element={<DoctorQualifications />}
          />
          <Route
            path="/register/registration"
            element={<DoctorRegistration />}
          />
          <Route path="/register/identity" element={<DoctorIdentity />} />
          <Route
            path="/register/face-verification"
            element={<DoctorFaceVerification />}
          />
          <Route
            path="/register/verification-submitted"
            element={<DoctorVerificationSubmitted />}
          />

          {/* Pharmacy routes */}
          <Route path="/pharmacy" element={<DashboardOverview />} />
          <Route path="/pharmacy/inventory" element={<InventoryList />} />
          <Route path="/pharmacy/orders" element={<NewPrescriptionOrders />} />
          <Route path="/pharmacy/orders/:orderId" element={<OrderDetails />} />
          <Route path="/pharmacy/orders/:orderId/invoice" element={<InvoicePage />} />
          <Route path="/pharmacy/add-medicine" element={<AddNewMedicine />} />
          <Route path="/pharmacy/edit-medicine/:id" element={<EditMedicine />} />
          <Route path="/pharmacy/settings" element={<SettingsPage />} />
          <Route path="/pharmacy/earnings" element={<EarningsOverview />} />
          <Route path="/pharmacy/store-profile" element={<StoreProfile />} />
          <Route path="/pharmacy/support" element={<Support />} />
        </Routes>
      </main>

      {!isRegisterFlow && <Footer />}
    </div>
  );
}
