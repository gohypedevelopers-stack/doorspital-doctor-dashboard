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
import PharmacyForgotPasswordModal from "./pharmacypage/PharmacyForgotPasswordModal.jsx";
import PharmacyApplicationStatus from "./pharmacypage/PharmacyApplicationStatus.jsx";

import Home from "./pages/Home.jsx";
import PartnerHome from "./pages/PartnerHome.jsx";
import Benefits from "./pages/Benefits.jsx";
import DoctorPersonalDetails from "./pages/DoctorPersonalDetails.jsx";
import DoctorQualifications from "./pages/DoctorQualifications.jsx";
import DoctorRegistration from "./pages/DoctorRegistration.jsx";
import DoctorIdentity from "./pages/DoctorIdentity.jsx";
import DoctorFaceVerification from "./pages/DoctorFaceVerification.jsx";
import DoctorVerificationSubmitted from "./pages/DoctorVerificationSubmitted.jsx";
import Contact from "./pages/Contact.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import Faqs from "./pages/Faqs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import GrievancePolicy from "./pages/GrievancePolicy.jsx";
import About from "./pages/About.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import DeleteAccount from "./pages/DeleteAccount.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import FloatingCall from "./components/FloatingCall.jsx";
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

const ProtectedRoute = ({ children, authToken, onRequireAuth, onOpenLogin }) => {
  if (!authToken) {
    onRequireAuth?.();
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Please log in to continue.
        <button
          type="button"
          onClick={() => onOpenLogin?.()}
          className="ml-3 rounded-full border border-border px-3 py-1 text-xs font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-100"
        >
          Open login
        </button>
      </div>
    );
  }
  return children;
};

const PharmacyProtectedRoute = ({ children, pharmacySession, onOpenLogin }) => {
  if (!pharmacySession?.token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Pharmacy access is pending</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your pharmacy dashboard becomes available only after admin approval. Please log in with an approved pharmacy account to continue.
          </p>
          <button
            type="button"
            onClick={() => onOpenLogin?.()}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            Open Pharmacy Login
          </button>
        </div>
      </div>
    );
  }

  if (pharmacySession?.pharmacy?.status && pharmacySession.pharmacy.status !== "active") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {pharmacySession.pharmacy.status === "suspended" ? "Pharmacy account suspended" : "Pharmacy verification pending"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {pharmacySession.pharmacy.status === "suspended"
              ? "Your pharmacy dashboard is currently blocked by admin. Please contact support or wait for reactivation."
              : "Your pharmacy signup has been received. Once admin approves your account, you will be able to access the full pharmacy dashboard."}
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterFlow = location.pathname.startsWith("/register");

  // ✅ Keeping your px-1 padding exactly as requested
  const pageShellClasses = "mx-auto w-full px-0 sm:px-0 lg:px-0";

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
  const [isPharmacyForgotOpen, setIsPharmacyForgotOpen] = useState(false);
  const [pharmacyForgotEmail, setPharmacyForgotEmail] = useState("");

  useEffect(() => {
    if (!authToken && location.pathname.startsWith("/dashboard")) {
      const timeoutId = setTimeout(() => {
        setIsLoginOpen(true);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
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
  const [otpEmail] = useState("");

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

  const handleSignupSuccess = () => {
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

  return (
    <div className="flex min-h-screen flex-col bg-background w-full">
      <ScrollToTop />
      <FloatingWhatsApp />
      <FloatingCall />
      {!isRegisterFlow && (
        <>
          <div className="w-full">
            <div className={pageShellClasses}>
              <Navbar
                onLoginClick={() => setIsAuthChoiceOpen(true)}
                isAuthenticated={Boolean(authUser)}
                onLogout={handleLogout}
                onSignupClick={() => setIsSignupOpen(true)}
                pharmacySession={pharmacySession}
                onPharmacyLogout={handlePharmacyLogout}
              />
            </div>
          </div>

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
            onForgotPassword={(email) => {
              setPharmacyForgotEmail(email || "");
              setIsPharmacyLoginOpen(false);
              setIsPharmacyForgotOpen(true);
            }}
          />

          <PharmacySignupModal
            isOpen={isPharmacySignupOpen}
            onClose={() => setIsPharmacySignupOpen(false)}
            onSuccess={(submittedEmail) => {
              setIsPharmacySignupOpen(false);
              navigate(
                `/pharmacy/application-status?email=${encodeURIComponent(submittedEmail || "")}`
              );
            }}
            onSwitchToLogin={() => {
              setIsPharmacySignupOpen(false);
              setIsPharmacyLoginOpen(true);
            }}
          />

          <PharmacyForgotPasswordModal
            isOpen={isPharmacyForgotOpen}
            onClose={() => setIsPharmacyForgotOpen(false)}
            defaultEmail={pharmacyForgotEmail}
            onSuccess={(email) => {
              setPharmacyForgotEmail(email || "");
              setIsPharmacyForgotOpen(false);
              setIsPharmacyLoginOpen(true);
            }}
          />
        </>
      )}

      <main className="flex-1 min-w-0">
        <div className={`${pageShellClasses} min-w-0`}>
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
            <Route
              path="/partner"
              element={
                <PartnerHome
                  onDoctorJoinClick={handleDoctorJoinClick}
                  onPharmacyJoinClick={handlePharmacyJoinClick}
                />
              }
            />
            <Route path="/pharmacy/application-status" element={<PharmacyApplicationStatus />} />
            <Route path="/benefits" element={<Benefits />} />
            
            {/* Footer static pages */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/grievance-policy" element={<GrievancePolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/delete-account" element={<DeleteAccount />} />

            {/* Dashboard with nested routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  authToken={authToken}
                  onRequireAuth={() => setIsLoginOpen(true)}
                  onOpenLogin={() => setIsLoginOpen(true)}
                >
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
            <Route path="/register/qualifications" element={<DoctorQualifications />} />
            <Route path="/register/registration" element={<DoctorRegistration />} />
            <Route path="/register/identity" element={<DoctorIdentity />} />
            <Route path="/register/face-verification" element={<DoctorFaceVerification />} />
            <Route
              path="/register/verification-submitted"
              element={<DoctorVerificationSubmitted />}
            />

            {/* Pharmacy routes */}
            <Route path="/pharmacy" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><DashboardOverview /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/inventory" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><InventoryList /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/orders" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><NewPrescriptionOrders /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/orders/:orderId" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><OrderDetails /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/orders/:orderId/invoice" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><InvoicePage /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/add-medicine" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><AddNewMedicine /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/edit-medicine/:id" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><EditMedicine /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/settings" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><SettingsPage /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/earnings" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><EarningsOverview /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/store-profile" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><StoreProfile /></PharmacyProtectedRoute>} />
            <Route path="/pharmacy/support" element={<PharmacyProtectedRoute pharmacySession={pharmacySession} onOpenLogin={() => setIsPharmacyLoginOpen(true)}><Support /></PharmacyProtectedRoute>} />
          </Routes>
        </div>
      </main>

      {!isRegisterFlow && (
        <div className="w-full">
          <div className={pageShellClasses}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
