// src/pages/RefundPolicy.jsx
import React, { useState } from "react";
import {
  RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle,
  CreditCard, ChevronDown, ChevronUp,
} from "lucide-react";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", marginBottom: "8px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer",
          textAlign: "left", gap: "12px",
        }}
      >
        <span style={{ fontWeight: 500, fontSize: "14px", color: "#1e293b" }}>{q}</span>
        {open
          ? <ChevronUp style={{ width: 16, height: 16, color: "#94a3b8", flexShrink: 0 }} />
          : <ChevronDown style={{ width: 16, height: 16, color: "#94a3b8", flexShrink: 0 }} />}
      </button>
      {open && (
        <div style={{ padding: "0 16px 14px", fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>{a}</div>
      )}
    </div>
  );
}

export default function RefundPolicy() {
  const tableRows = [
    { scenario: "Cancelled ≥ 24 hours before appointment", by: "Patient", refund: "100%", ok: true, timeline: "5–7 business days" },
    { scenario: "Cancelled 4–24 hours before appointment", by: "Patient", refund: "50%", ok: true, timeline: "5–7 business days" },
    { scenario: "Cancelled < 4 hours before appointment", by: "Patient", refund: "No refund", ok: false, timeline: "N/A" },
    { scenario: "Doctor cancels at any time", by: "Doctor", refund: "100%", ok: true, timeline: "3–5 business days" },
    { scenario: "Doctor does not join (No-show)", by: "Doctor", refund: "100%", ok: true, timeline: "3–5 business days" },
    { scenario: "Technical failure by platform", by: "Doorspitals", refund: "100%", ok: true, timeline: "3–5 business days" },
    { scenario: "Consultation completed", by: "—", refund: "No refund", ok: false, timeline: "N/A" },
  ];

  const steps = [
    { num: 1, color: "#3b82f6", title: "Raise a Dispute In-App", desc: "Go to 'My Appointments' or 'My Orders' → select the transaction → tap 'Request Refund'." },
    { num: 2, color: "#8b5cf6", title: "Provide Supporting Information", desc: "Describe the issue and attach photos or screenshots if applicable." },
    { num: 3, color: "#f59e0b", title: "Review by Support Team", desc: "Our team reviews the claim within 48 business hours." },
    { num: 4, color: "#10b981", title: "Refund Decision & Processing", desc: "If approved, refund is initiated via Razorpay to your original payment method." },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "48px 16px", maxWidth: 896, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, background: "#f5f3ff",
          color: "#7c3aed", padding: "6px 14px", borderRadius: 999, fontSize: 12,
          fontWeight: 600, border: "1px solid #ddd6fe", marginBottom: 14,
        }}>
          <RefreshCw style={{ width: 14, height: 14 }} />
          Refund &amp; Cancellation Policy
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
          Refund &amp; Cancellation Policy
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 520, margin: "0 auto" }}>
          Fair, transparent refund terms for consultations, medicine orders, and platform subscriptions.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 14, fontSize: 12, color: "#94a3b8" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock style={{ width: 12, height: 12 }} /> Last updated: April 2025
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <CreditCard style={{ width: 12, height: 12 }} /> Payments via Razorpay
          </span>
        </div>
      </div>

      {/* ── INTRO BOX ── */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "16px 20px", marginBottom: 32, fontSize: 14, color: "#1d4ed8" }}>
        <strong>Our Commitment:</strong> At Doorspitals, we prioritize a fair and patient-friendly platform. This policy outlines when refunds apply for consultations, medicine orders, and subscriptions.
      </div>

      {/* ── SECTION 1: CONSULTATIONS ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>1</span>
          Doctor Consultation Cancellations &amp; Refunds
        </h2>
        <p style={{ fontSize: 14, color: "#475569", marginBottom: 20 }}>
          Consultation fees paid by patients through the Doorspitals app are subject to the following refund rules:
        </p>

        {/* TABLE */}
        <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #e2e8f0", marginBottom: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                {["Scenario", "Cancelled By", "Refund", "Timeline"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "#374151" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "10px 14px", color: "#374151" }}>{row.scenario}</td>
                  <td style={{ padding: "10px 14px", color: "#6b7280", fontSize: 12 }}>{row.by}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 12, color: row.ok ? "#059669" : "#dc2626" }}>{row.refund}</td>
                  <td style={{ padding: "10px 14px", color: "#9ca3af", fontSize: 12 }}>{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400e", display: "flex", alignItems: "flex-start", gap: 8 }}>
          <AlertTriangle style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }} />
          Refund eligibility is determined at Doorspitals' discretion. Disputes must be raised within 7 days of the appointment.
        </div>
      </div>

      {/* ── SECTION 2: MEDICINE ORDERS ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#059669", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>2</span>
          Medicine &amp; Prescription Order Refunds
        </h2>
        <p style={{ fontSize: 14, color: "#475569", marginBottom: 20 }}>
          Medicine orders are governed by <strong>The Drugs and Cosmetics Act, 1940</strong>. Returns are subject to drug regulations.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ border: "1px solid #a7f3d0", background: "#ecfdf5", borderRadius: 12, padding: 16 }}>
            <CheckCircle style={{ width: 20, height: 20, color: "#059669", marginBottom: 8 }} />
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#065f46", marginBottom: 8 }}>Eligible for Refund</h3>
            <ul style={{ fontSize: 12, color: "#047857", lineHeight: 1.8, paddingLeft: 0, listStyle: "none" }}>
              <li>✓ Order cancelled before dispatch</li>
              <li>✓ Wrong medicines delivered</li>
              <li>✓ Damaged or tampered medicines</li>
              <li>✓ Expired medicines on delivery</li>
              <li>✓ Order never delivered</li>
              <li>✓ Quantity mismatch</li>
            </ul>
          </div>
          <div style={{ border: "1px solid #fca5a5", background: "#fef2f2", borderRadius: 12, padding: 16 }}>
            <XCircle style={{ width: 20, height: 20, color: "#dc2626", marginBottom: 8 }} />
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#991b1b", marginBottom: 8 }}>Not Eligible</h3>
            <ul style={{ fontSize: 12, color: "#b91c1c", lineHeight: 1.8, paddingLeft: 0, listStyle: "none" }}>
              <li>✗ Opened or used medicines</li>
              <li>✗ Change of mind after delivery</li>
              <li>✗ Schedule H &amp; H1 drugs</li>
              <li>✗ Refrigerated medicines accepted</li>
              <li>✗ Return after 48 hours</li>
              <li>✗ Broken seals / opened packs</li>
            </ul>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "#475569" }}>
          <strong>Return Window:</strong> Initiate returns within <strong>48 hours</strong> of delivery. Approved refunds processed in <strong>5–10 business days</strong> via Razorpay.
        </p>
      </div>

      {/* ── SECTION 3: SUBSCRIPTIONS ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#7c3aed", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>3</span>
          Platform Subscription Fees
        </h2>
        <p style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>
          Currently, Doorspitals does not charge any subscription or onboarding fee. If subscription plans are introduced:
        </p>
        <ul style={{ fontSize: 14, color: "#475569", lineHeight: 2, paddingLeft: 20 }}>
          <li>Subscription fees are <strong>non-refundable</strong> once a billing cycle starts.</li>
          <li>You may cancel anytime; access continues till end of billing period.</li>
          <li>No pro-rata refunds for early cancellations.</li>
          <li>If Doorspitals discontinues a plan, unused period will be refunded pro-rata.</li>
        </ul>
      </div>

      {/* ── SECTION 4: HOW TO REQUEST ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>4</span>
          How to Request a Refund
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < steps.length - 1 ? 0 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{step.num}</div>
                {i < steps.length - 1 && <div style={{ width: 2, height: 32, background: "#e2e8f0", marginTop: 4 }} />}
              </div>
              <div style={{ paddingBottom: 24 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", margin: "6px 0 4px" }}>{step.title}</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, fontSize: 14 }}>
          <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#0f172a" }}>For urgent refund queries:</p>
          <p style={{ margin: "0 0 4px", color: "#475569" }}>📧 <a href="mailto:refunds@doorspitals.com" style={{ color: "#2563eb" }}>refunds@doorspitals.com</a></p>
          <p style={{ margin: "0 0 4px", color: "#475569" }}>📧 <a href="mailto:support@doorspitals.com" style={{ color: "#2563eb" }}>support@doorspitals.com</a></p>
          <p style={{ margin: "6px 0 0", fontSize: 12, color: "#94a3b8" }}>Response guaranteed within 48 business hours.</p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Frequently Asked Questions</h2>
        <FaqItem q="How long does a refund take to reach my bank account?" a="Razorpay processes refunds within 5–7 business days for UPI/Net Banking and 7–10 days for cards. Actual credit depends on your bank." />
        <FaqItem q="What if my consultation was interrupted due to poor internet?" a="If the interruption was on the platform's side, a full refund is issued. If caused by your connectivity, no refund applies. We recommend using a stable connection." />
        <FaqItem q="Can a doctor refuse to issue a refund?" a="Doctors do not control refunds. All decisions are made by the Doorspitals support team based on session logs. Doctors cannot withhold valid refunds." />
        <FaqItem q="I paid via UPI and money was deducted but not confirmed. What should I do?" a="Such amounts are automatically reversed by your bank within 3–5 business days. If not resolved, contact us with your UPI transaction reference ID." />
        <FaqItem q="Can I request a refund for a completed consultation?" a="Refunds are not issued for completed consultations unless there was a platform or technical failure. For service quality concerns, raise a grievance at grievance@doorspitals.com." />
      </div>

      {/* ── FOOTER CTA ── */}
      <div style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Need Help With a Refund?</h2>
        <p style={{ fontSize: 14, color: "#ddd6fe", margin: "0 0 20px" }}>Our support team is ready to assist you with any refund or cancellation query.</p>
        <a href="/contact" style={{ display: "inline-block", background: "#fff", color: "#7c3aed", fontWeight: 600, padding: "10px 24px", borderRadius: 999, fontSize: 14, textDecoration: "none" }}>
          Contact Support
        </a>
      </div>
    </div>
  );
}
