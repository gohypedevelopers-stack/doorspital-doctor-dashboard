// src/components/Navbar.jsx
// Top navigation for Home & Benefits pages.
import React, { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar({
  onLoginClick,
  isAuthenticated,
  onLogout,
  onSignupClick,
  pharmacySession,
  onPharmacyLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const isBenefits = pathname === "/benefits";
  const isDashboard = pathname.startsWith("/dashboard");

  const isDoctorAuthenticated = Boolean(isAuthenticated);
  const hasPharmacySession = Boolean(pharmacySession?.token);

  const handleDashboardClick = (event) => {
    if (!isDoctorAuthenticated) {
      event.preventDefault();
      onLoginClick?.();
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex w-full items-center justify-between py-3">
        {/* Logo / brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src={icon} className="h-13 w-13 object-contain" />
          <span className="text-lg font-semibold text-foreground">
            Doorspital Partner
          </span>
        </Link>

        {/* Main nav links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a
            href="#about"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            About
          </a>
          <a
            href="#testimonials"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            Testimonials
          </a>
          <Link
            to="/benefits"
            className={`hover:text-foreground hover:underline underline-offset-4 ${
              isBenefits ? "font-semibold text-foreground" : ""
            }`}
          >
            Benefits
          </Link>
          <Link
            to="/dashboard"
            onClick={handleDashboardClick}
            className={`hover:text-foreground hover:underline underline-offset-4 ${
              isDashboard ? "font-semibold text-foreground" : ""
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Right-side auth buttons */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <div className="hidden items-center gap-3 md:flex">
            {hasPharmacySession ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/pharmacy")}
                  className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-800"
                >
                  Open Pharmacy
                </button>
                <button
                  type="button"
                  onClick={onPharmacyLogout}
                  className="rounded-full border-2 border-red-800 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-slate-200"
                >
                  Logout
                </button>
              </div>
            ) : isDoctorAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-800"
                >
                  Open Dashboard
                </Link>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-full border-2 border-red-800 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-slate-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="rounded-full border-2 border-blue-700 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  onClick={onLoginClick}
                >
                  Login
                </button>
                <button
                  className="rounded-full bg-gradient-to-r from-blue-700 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow"
                  onClick={onSignupClick}
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden rounded-full border border-border p-2 text-foreground/80 hover:text-foreground"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>
              Testimonials
            </a>
            <Link to="/benefits" onClick={() => setMenuOpen(false)}>
              Benefits
            </Link>
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            {hasPharmacySession ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/pharmacy");
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-800"
                >
                  Open Pharmacy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onPharmacyLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-full border-2 border-red-800 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-slate-200"
                >
                  Logout
                </button>
              </>
            ) : isDoctorAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-800 text-center"
                >
                  Open Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-full border-2 border-red-800 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-slate-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full rounded-full border-2 border-blue-700 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    onLoginClick();
                    setMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full rounded-full bg-gradient-to-r from-blue-700 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow"
                  onClick={() => {
                    onSignupClick();
                    setMenuOpen(false);
                  }}
                >
                  Register Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


