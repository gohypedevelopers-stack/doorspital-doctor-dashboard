// src/pages/DeleteAccount.jsx
import React, { useState } from "react";
import { Trash2, AlertTriangle, ShieldCheck, Mail, ArrowRight, CheckCircle, Info } from "lucide-react";

export default function DeleteAccount() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Show success message
  };

  return (
    <div style={{ minHeight: "100vh", padding: "60px 16px", maxWidth: 800, margin: "0 auto", background: "#fff" }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fee2e2", color: "#dc2626", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid #fecaca", marginBottom: 14 }}>
          <Trash2 style={{ width: 14, height: 14 }} />
          Data Privacy & Account Deletion
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
          Delete Your Account
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 500, margin: "0 auto" }}>
          We are sorry to see you go. Please review the implications of account deletion before proceeding.
        </p>
      </div>

      {step === 1 && (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "32px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "16px", display: "flex", gap: 12, marginBottom: 24 }}>
            <AlertTriangle style={{ width: 24, height: 24, color: "#ea580c", flexShrink: 0 }} />
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#9a3412", margin: "0 0 4px" }}>Warning: Irreversible Action</p>
              <p style={{ fontSize: 13, color: "#c2410c", margin: 0 }}>
                Deleting your account will permanently remove all your data, profile information, consultation history, and prescriptions from our active records. This action cannot be undone.
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>What happens when you delete your account?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              { icon: ShieldCheck, title: "Personal Data", desc: "All personal identifiers, including name, email, and phone number, will be scrubbed." },
              { icon: Trash2, title: "History Cleaned", desc: "Your appointment history and medical notes will be permanently purged." },
              { icon: Info, title: "30-Day Window", desc: "Data is moved to a 'Deletion Queue' and permanently erased after 30 days." },
              { icon: Mail, title: "No More Alerts", desc: "You will immediately stop receiving any marketing or platform notifications." },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.icon style={{ width: 16, height: 16, color: "#475569" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", margin: "0 0 2px" }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setStep(2)}
            style={{ width: "100%", background: "#dc2626", color: "#fff", fontWeight: 700, padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            I Understand, Proceed with Deletion
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "32px" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Final Confirmation</h3>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>Please provide your registered email/phone to initiate the deletion process.</p>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email Address or Phone Number *</label>
              <input 
                required
                type="text" 
                placeholder="e.g. jason@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Why are you leaving? (Optional)</label>
              <textarea 
                placeholder="We would love to hear your feedback..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, height: "100px", resize: "none", boxSizing: "border-box" }}
              />
            </div>
            
            <div style={{ display: "flex", gap: 12 }}>
              <button 
                type="button"
                onClick={() => setStep(1)}
                style={{ flex: 1, background: "#f3f4f6", color: "#374151", fontWeight: 600, padding: "12px", borderRadius: 10, border: "none", cursor: "pointer" }}
              >
                Go Back
              </button>
              <button 
                type="submit"
                style={{ flex: 2, background: "#dc2626", color: "#fff", fontWeight: 700, padding: "12px", borderRadius: 10, border: "none", cursor: "pointer" }}
              >
                Permanently Delete My Account
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "48px 32px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "#d1fae5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle style={{ width: 32, height: 32, color: "#059669" }} />
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Request Submitted</h3>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, marginBottom: 32 }}>
            Your account deletion request has been received. Our team will verify your identity via email/phone and complete the deletion process within 30 days. No further action is required from your side.
          </p>
          <a href="/" style={{ background: "#2563eb", color: "#fff", fontWeight: 600, padding: "12px 32px", borderRadius: 10, textDecoration: "none", fontSize: 14 }}>
            Return to Homepage
          </a>
        </div>
      )}

      {/* ── FOOTER INFO ── */}
      <div style={{ marginTop: 48, padding: "24px", background: "#f8fafc", borderRadius: 16, border: "1px solid #e2e8f0" }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <ShieldCheck style={{ width: 18, height: 18, color: "#059669" }} />
          Compliance with Play Store Policy
        </h4>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
          In accordance with Google Play Store's Data Safety policies, we provide a clear method for users to request account deletion. For any questions regarding your data, please contact our Data Protection Officer at <a href="mailto:privacy@doorspitals.com" style={{ color: "#2563eb", textDecoration: "none" }}>privacy@doorspitals.com</a>.
        </p>
      </div>
    </div>
  );
}
