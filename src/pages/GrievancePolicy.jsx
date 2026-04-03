// src/pages/GrievancePolicy.jsx
import React from "react";
import { MessageSquare, Scale, Clock, CheckCircle, Users, Shield, Mail, Globe } from "lucide-react";

function Step({ num, color, title, desc, isLast }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
          {num}
        </div>
        {!isLast && <div style={{ width: 2, height: 48, background: "#e2e8f0", marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 0, paddingTop: 8 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", margin: "0 0 4px" }}>{title}</p>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>{desc}</p>
      </div>
    </div>
  );
}

export default function GrievancePolicy() {
  const grievanceTypes = [
    { cat: "Account & Access Issues", desc: "Unauthorized access, locked accounts, profile deletion errors." },
    { cat: "Data Privacy Violations", desc: "Unauthorized sharing of personal data, privacy breaches." },
    { cat: "Payment & Refund Disputes", desc: "Unresolved refund claims, incorrect charges, double deductions." },
    { cat: "Content & Listings Disputes", desc: "Fraudulent profiles, incorrect information displayed publicly." },
    { cat: "Service Quality Complaints", desc: "No-show doctors, undelivered medicines, substandard products." },
    { cat: "Harassment or Misconduct", desc: "Inappropriate conduct by doctor, pharmacy staff, or users." },
    { cat: "Platform Technical Issues", desc: "Persistent bugs, data loss, failures unresolved by support." },
    { cat: "Any other T&C Violation", desc: "Any breach of Terms, Privacy Policy, or applicable Indian law." },
  ];

  const escalations = [
    { name: "Ministry of Electronics & Information Technology (MeitY)", url: "https://www.meity.gov.in/", display: "www.meity.gov.in" },
    { name: "National Consumer Disputes Redressal Commission (NCDRC)", url: "https://edaakhil.nic.in", display: "edaakhil.nic.in" },
    { name: "Reserve Bank of India (RBI) – Payment Issues", url: "https://cms.rbi.org.in", display: "cms.rbi.org.in" },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "48px 16px", maxWidth: 896, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, background: "#fef2f2",
          color: "#b91c1c", padding: "6px 14px", borderRadius: 999, fontSize: 12,
          fontWeight: 600, border: "1px solid #fecaca", marginBottom: 14,
        }}>
          <Scale style={{ width: 14, height: 14 }} />
          Grievance Redressal Policy
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
          Grievance Redressal Policy
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 540, margin: "0 auto" }}>
          In accordance with the IT Act, 2000 and IT (Intermediary Guidelines) Rules 2021, Doorspitals maintains a formal grievance redressal mechanism.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 14, fontSize: 12, color: "#94a3b8" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock style={{ width: 12, height: 12 }} /> Last updated: April 2025
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Globe style={{ width: 12, height: 12 }} /> Governed by Indian law
          </span>
        </div>
      </div>

      {/* ── LEGAL BASIS ── */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Shield style={{ width: 20, height: 20, color: "#2563eb", flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 14, color: "#1e40af" }}>
          <strong>Legal Basis:</strong> This policy is established pursuant to the Information Technology Act, 2000 and the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. As a digital intermediary, Doorspitals is required to appoint a Grievance Officer and resolve complaints within specified timelines.
        </div>
      </div>

      {/* ── GRIEVANCE OFFICER ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <Users style={{ width: 20, height: 20, color: "#2563eb" }} />
          Grievance Officer Details
        </h2>
        <p style={{ fontSize: 14, color: "#475569", marginBottom: 16 }}>
          In accordance with the IT (Intermediary Guidelines) Rules 2021, Doorspitals has appointed the following Grievance Officer:
        </p>
        <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Name", value: "Grievance Officer" },
              { label: "Company", value: "GoHype Technologies Private Limited" },
              { label: "Email", isLink: true, href: "mailto:grievance@doorspitals.com", value: "grievance@doorspitals.com" },
              { label: "Support Email", isLink: true, href: "mailto:support@doorspitals.com", value: "support@doorspitals.com" },
              { label: "Acknowledgement Time", value: "Within 24 hours" },
              { label: "Resolution Time", value: "Within 30 days" },
            ].map((item) => (
              <div key={item.label}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</span>
                <p style={{ margin: "4px 0 0", fontWeight: 600, fontSize: 14, color: "#0f172a" }}>
                  {item.isLink
                    ? <a href={item.href} style={{ color: "#2563eb", textDecoration: "underline" }}>{item.value}</a>
                    : item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRIEVANCE TYPES ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <MessageSquare style={{ width: 20, height: 20, color: "#7c3aed" }} />
          What Grievances Can Be Filed?
        </h2>
        <p style={{ fontSize: 14, color: "#475569", marginBottom: 16 }}>
          You may file a formal grievance for any of the following categories:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {grievanceTypes.map((item) => (
            <div key={item.cat} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0", padding: 12 }}>
              <CheckCircle style={{ width: 16, height: 16, color: "#059669", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: 13, color: "#0f172a", margin: "0 0 2px" }}>{item.cat}</p>
                <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Clock style={{ width: 20, height: 20, color: "#f59e0b" }} />
          Grievance Resolution Process
        </h2>
        <Step num={1} color="#3b82f6" title="Submit Your Grievance" desc="Email grievance@doorspitals.com with your registered email/phone, detailed description, and supporting evidence (screenshots, order IDs, etc.)." isLast={false} />
        <Step num={2} color="#7c3aed" title="Acknowledgement" desc="Our Grievance Officer will acknowledge your complaint within 24 hours with a unique Grievance Reference ID." isLast={false} />
        <Step num={3} color="#059669" title="Investigation & Resolution" desc="The Grievance Officer will investigate and communicate resolution within 30 days. Complex cases may require additional time." isLast={true} />
      </div>

      {/* ── ESCALATION ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Escalation Path</h2>
        <p style={{ fontSize: 14, color: "#475569", marginBottom: 16 }}>
          If unsatisfied with our resolution within 30 days, you may escalate to:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {escalations.map((e) => (
            <div key={e.name} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px" }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", margin: "0 0 4px" }}>{e.name}</p>
              <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#2563eb", textDecoration: "underline" }}>{e.display}</a>
            </div>
          ))}
        </div>
      </div>

      {/* ── EMAIL FORMAT ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <Mail style={{ width: 20, height: 20, color: "#2563eb" }} />
          How to Write Your Grievance Email
        </h2>
        <p style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>
          Include the following in your email to <a href="mailto:grievance@doorspitals.com" style={{ color: "#2563eb" }}>grievance@doorspitals.com</a>:
        </p>
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: 16, border: "1px solid #e2e8f0", fontFamily: "monospace", fontSize: 12, color: "#374151", lineHeight: 1.8 }}>
          <p style={{ margin: 0 }}><strong>Subject:</strong> Formal Grievance – [Issue Type] – [Your Email]</p>
          <p style={{ margin: "8px 0 0" }}><strong>Body:</strong></p>
          <p style={{ margin: 0 }}>1. Full Name:</p>
          <p style={{ margin: 0 }}>2. Registered Email / Phone:</p>
          <p style={{ margin: 0 }}>3. Order ID / Appointment ID (if applicable):</p>
          <p style={{ margin: 0 }}>4. Date of Incident:</p>
          <p style={{ margin: 0 }}>5. Detailed Description of the Issue:</p>
          <p style={{ margin: 0 }}>6. Resolution Sought:</p>
          <p style={{ margin: 0 }}>7. Attachments: [screenshots, receipts, etc.]</p>
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div style={{ background: "linear-gradient(135deg, #dc2626, #f43f5e)", borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>File a Formal Grievance</h2>
        <p style={{ fontSize: 14, color: "#fecdd3", margin: "0 0 20px" }}>
          All grievances are handled with strict confidentiality and resolved within 30 days.
        </p>
        <a href="mailto:grievance@doorspitals.com" style={{ display: "inline-block", background: "#fff", color: "#dc2626", fontWeight: 600, padding: "10px 24px", borderRadius: 999, fontSize: 14, textDecoration: "none" }}>
          grievance@doorspitals.com
        </a>
      </div>
    </div>
  );
}
