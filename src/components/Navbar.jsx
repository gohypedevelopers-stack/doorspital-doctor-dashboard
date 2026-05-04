// src/components/Navbar.jsx
// Top navigation for Home & Benefits pages.
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import icon from "../assets/icon.png";
import { ModeToggle } from "@/components/mode-toggle";

const SUPPORT_TEL = "tel:+919837715111";

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

  const isHome = pathname === "/";
  const isPartner = pathname === "/partner";
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
      {/* ✅ Keeping your container/padding as-is */}
<div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">        {/* Logo / brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={icon}
            className="h-10 w-10 sm:h-11 sm:w-11 object-contain"
            alt="Doorspitals logo"
          />
          <span className="text-base sm:text-lg font-semibold text-foreground">
            Doorspitals
          </span>
        </Link>

        {/* Main nav links (tablet+ but compact on md) */}
        <nav
          className="hidden md:flex items-center font-medium text-muted-foreground
                     md:gap-3 md:text-xs
                     lg:gap-6 lg:text-sm
                     xl:gap-8"
        >
          <Link
            to="/"
            className={`hover:text-foreground hover:underline underline-offset-4 ${
              isHome ? "font-semibold text-foreground" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/partner"
            className={`hover:text-foreground hover:underline underline-offset-4 ${
              isPartner ? "font-semibold text-foreground" : ""
            }`}
          >
            Partner
          </Link>
          <Link
            to="/about"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            to="/testimonials"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            Testimonials
          </Link>
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

        {/* Right-side */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          <a
            href={SUPPORT_TEL}
            className="hidden items-center gap-2 rounded-full border border-sky-200 bg-[linear-gradient(135deg,#eff6ff,#dbeafe)] px-4 py-2 text-sm font-semibold text-sky-800 shadow-[0_10px_24px_-18px_rgba(37,99,235,0.7)] transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-[linear-gradient(135deg,#dbeafe,#bfdbfe)] dark:border-sky-900 dark:bg-[linear-gradient(135deg,rgba(30,64,175,0.82),rgba(8,47,73,0.92))] dark:text-sky-100 dark:hover:bg-[linear-gradient(135deg,rgba(29,78,216,0.94),rgba(14,116,144,0.88))] xl:flex"
          >
            <PhoneCall className="h-4 w-4" />
            Call Now
          </a>

          {/* Auth buttons: show only on laptop+ to prevent tablet overflow */}
          <div className="hidden items-center gap-2 lg:flex">
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
                  className="rounded-full bg-gradient-to-r from-blue-700 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
                  onClick={onSignupClick}
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {/* Hamburger: show on phones + tablets (< lg) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden rounded-full border border-border p-2 text-foreground/80 hover:text-foreground"
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

      {/* Mobile/Tablet dropdown (< lg) */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/partner" onClick={() => setMenuOpen(false)}>
              Partner
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/testimonials" onClick={() => setMenuOpen(false)}>
              Testimonials
            </Link>
            <Link to="/benefits" onClick={() => setMenuOpen(false)}>
              Benefits
            </Link>
            <Link
              to="/dashboard"
              onClick={(e) => {
                handleDashboardClick(e);
                setMenuOpen(false);
              }}
            >
              Dashboard
            </Link>
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href={SUPPORT_TEL}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-sky-200 bg-[linear-gradient(135deg,#eff6ff,#dbeafe)] px-4 py-2 text-sm font-semibold text-sky-800 shadow-[0_10px_24px_-18px_rgba(37,99,235,0.7)] dark:border-sky-900 dark:bg-[linear-gradient(135deg,rgba(30,64,175,0.82),rgba(8,47,73,0.92))] dark:text-sky-100"
            >
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
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
                    onLoginClick?.();
                    setMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full rounded-full bg-gradient-to-r from-blue-700 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
                  onClick={() => {
                    onSignupClick?.();
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
