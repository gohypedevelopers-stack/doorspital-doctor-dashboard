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

  const handleDashboardClick = (event) => {
    if (!isAuthenticated) {
      event.preventDefault();
      onLoginClick?.();
    }
  };

  const hasPharmacySession = Boolean(pharmacySession?.token);
  const pharmacyName =
    pharmacySession?.pharmacy?.storeName ||
    pharmacySession?.user?.userName ||
    "Partner Pharmacy";

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur ">
      <div className="flex w-full items-center justify-between py-3 md:flex">
        <button
  className="md:hidden text-2xl"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>

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

          <a href="#testimonials" className="hover:text-foreground hover:underline underline-offset-4"
          >
            Testimonials
          </a>
          <Link
            to="/benefits"
            className={`hover:text-foreground hover:underline underline-offset-4 ${isBenefits ? "font-semibold text-foreground" : ""
              }`}
          >
            Benefits
          </Link>
          <Link
            to="/dashboard"
            onClick={handleDashboardClick}
            className={`hover:text-foreground hover:underline underline-offset-4 ${isDashboard ? "font-semibold text-foreground" : ""
              }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Right-side auth buttons */}
        <div className="flex items-center gap-3 md:flex">
          <ModeToggle />
          {hasPharmacySession ? (
            <div className="flex items-center gap-3">
              <div className="text-right">

              </div>
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
                className="rounded-full border-2 border-red-800 px-2 py-2 text-sm font-semibold text-red-600 hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          ) : isAuthenticated ? (
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
                className="rounded-full border-2 border-red-800 px-2 py-2 text-sm font-semibold text-red-600 hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                className="rounded-full border-2 border-blue-700 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 "
                onClick={onLoginClick}
              >
                Login
              </button>
              <button
                className="rounded-full bg-gradient-to-r from-blue-700 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow "
                onClick={onSignupClick}
              >
                Register Free
              </button>
            </>
          )}
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

            

            {/* Auth buttons */}
            {!isAuthenticated ? (
              <>
                <button
                className="rounded-full border-2 border-blue-700 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 hidden md:block"
                onClick={onLoginClick}
              >
                Login
              </button>
              <button
                className="rounded-full bg-gradient-to-r from-blue-700 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hidden md:block"
                onClick={onSignupClick}
              >
                Register Free
              </button>

                
              </>
            ) : (
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="rounded-md border border-red-700 px-4 py-2 text-red-600"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
