import React, { useEffect, useState } from "react";
import { apiRequest } from "../lib/api.js";

const inputClass =
  "h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

export default function PharmacyForgotPasswordModal({
  isOpen,
  onClose,
  defaultEmail = "",
  onSuccess,
}) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setEmail(defaultEmail);
      setOtp("");
      setResetToken("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setStatus("");
    } else {
      setEmail(defaultEmail);
    }
  }, [defaultEmail, isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");
    try {
      await apiRequest("/api/auth/forgot-password-send-otp", {
        method: "POST",
        body: { email },
      });
      setStatus("OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");
    try {
      const response = await apiRequest("/api/auth/forgot-password-verify-otp", {
        method: "POST",
        body: { email, otp },
      });
      setResetToken(response.reset_token || "");
      setStatus("OTP verified. You can now set a new password.");
      setStep(3);
    } catch (err) {
      setError(err.message || "Unable to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    setStatus("");
    try {
      await apiRequest("/api/auth/reset-password", {
        method: "POST",
        body: {
          reset_token: resetToken,
          password,
          confirm_password: confirmPassword,
        },
      });
      setStatus("Password reset successful. Please log in with your new password.");
      onSuccess?.(email);
      setTimeout(() => {
        onClose?.();
      }, 800);
    } catch (err) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Reset Pharmacy Password</h2>
            <p className="mt-1 text-sm text-slate-500">
              Recover access using email OTP verification.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-600"
          >
            &times;
          </button>
        </div>

        {step === 1 && (
          <form className="space-y-4" onSubmit={handleSendOtp}>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Business email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="store@example.com"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-blue-400"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              OTP sent to <span className="font-semibold">{email}</span>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Enter OTP</label>
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                maxLength={6}
                required
                className={inputClass}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Resend OTP
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-blue-400"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-4" onSubmit={handleResetPassword}>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">New password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-blue-400"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {status && <p className="mt-4 text-sm text-emerald-600">{status}</p>}
        {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
      </div>
    </div>
  );
}
