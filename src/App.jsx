// src/App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginModal from "./components/LoginModal.jsx";
import SignupModal from "./components/SignupModal.jsx";
import OTPModal from "./components/OTPModal.jsx";

import Home from "./pages/Home.jsx";
import Benefits from "./pages/Benefits.jsx";
import DoctorPersonalDetails from "./pages/DoctorPersonalDetails.jsx";
import DoctorQualifications from "./pages/DoctorQualifications.jsx";
import DoctorRegistration from "./pages/DoctorRegistration.jsx";
import DoctorIdentity from "./pages/DoctorIdentity.jsx";
import DoctorFaceVerification from "./pages/DoctorFaceVerification.jsx"; // 👈 NEW
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import DoctorVerificationSubmitted from "./pages/DoctorVerificationSubmitted.jsx";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterFlow = location.pathname.startsWith("/register");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  const [authUser, setAuthUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

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

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  const handleLoginSuccess = ({ user, token }) => {
    setAuthUser(user || null);
    setAuthToken(token || null);
    setIsLoginOpen(false);
    navigate("/dashboard");
  };

  const handleSignupSuccess = (email) => {
    setIsSignupOpen(false);
    setOtpEmail(email);
    setIsOtpOpen(true);
  };

  const handleLogout = () => {
    setAuthUser(null);
    setAuthToken(null);
    navigate("/");
  };

  const handleHomeJoinClick = () => {
    if (authToken) {
      navigate("/dashboard");
    } else {
      setIsLoginOpen(true);
    }
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
            className="ml-3 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Open login
          </button>
        </div>
      );
    }
    return children;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-[50px]">
      {!isRegisterFlow && (
        <>
          <Navbar
            onLoginClick={() => setIsLoginOpen(true)}
            isAuthenticated={Boolean(authUser)}
            onLogout={handleLogout}
            onSignupClick={() => setIsSignupOpen(true)}
          />
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
        </>
      )}

      <main className="flex-1">
        <Routes>
          {/* Marketing pages */}
          <Route path="/" element={<Home onJoinClick={handleHomeJoinClick} />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute onRequireAuth={() => setIsLoginOpen(true)}>
                <DoctorDashboard token={authToken} user={authUser} />
              </ProtectedRoute>
            }
          />

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
        </Routes>
      </main>

      {!isRegisterFlow && <Footer />}
    </div>
  );
}
