// src/pages/HelpCenter.jsx
import React, { useState } from "react";
import { Search, Book, CreditCard, Stethoscope, ShoppingBag, ShieldCheck, Smartphone, ChevronRight } from "lucide-react";

const articles = {
  "Getting Started": [
    { title: "How to register as a Doctor", desc: "Step-by-step guide to complete your registration and KYC verification." },
    { title: "How to register as a Pharmacy", desc: "Set up your pharmacy store profile and start accepting orders." },
    { title: "Understanding KYC verification", desc: "What documents are needed and how long verification takes." },
    { title: "Setting up your profile and availability", desc: "Configure your working hours, consultation types, and fees." },
  ],
  "Appointments": [
    { title: "How to manage your appointments", desc: "Accept, reschedule, or cancel patient bookings from the dashboard." },
    { title: "Video consultation guide", desc: "Best practices for a smooth and professional video consultation." },
    { title: "Handling no-show patients", desc: "What to do when a patient doesn't join their booked slot." },
    { title: "Sending appointment reminders", desc: "Automated and manual reminder settings for patients." },
  ],
  "Prescriptions": [
    { title: "Issuing digital prescriptions", desc: "How to create and send legally valid digital prescriptions in-app." },
    { title: "Prescription templates", desc: "Save time by creating reusable prescription templates." },
    { title: "Controlled substance guidelines", desc: "Legal requirements when prescribing Schedule H, H1, and X drugs." },
    { title: "Patient prescription history", desc: "View and manage a patient's full prescription record." },
  ],
  "Billing & Payments": [
    { title: "How and when do I get paid?", desc: "Understand the payout schedule — T+2 to T+7 business days." },
    { title: "Setting your consultation fees", desc: "How to configure and update your per-session pricing." },
    { title: "Understanding platform transaction fees", desc: "Full transparency on any fees deducted from your earnings." },
    { title: "Requesting a refund for a patient", desc: "When and how to process refunds via the partner dashboard." },
  ],
  "Technical Issues": [
    { title: "App not loading or crashing", desc: "Troubleshooting steps for performance issues on Android and iOS." },
    { title: "Login and authentication problems", desc: "Can't log in? Here's how to recover your account." },
    { title: "Video call quality issues", desc: "Tips to improve video and audio quality during consultations." },
    { title: "Reporting a bug", desc: "How to report a platform bug to the Doorspitals tech team." },
  ],
  "Privacy & Security": [
    { title: "How is my data protected?", desc: "Overview of our AES-256 encryption and security practices." },
    { title: "How to delete your account", desc: "Steps to request permanent account and data deletion." },
    { title: "Two-factor authentication setup", desc: "Add an extra layer of security to your partner account." },
    { title: "Understanding our Privacy Policy", desc: "Key highlights from our Privacy Policy in plain language." },
  ],
};

const categoryIcons = {
  "Getting Started": Book,
  "Appointments": Stethoscope,
  "Prescriptions": ShieldCheck,
  "Billing & Payments": CreditCard,
  "Technical Issues": Smartphone,
  "Privacy & Security": ShieldCheck,
};

const categoryColors = {
  "Getting Started": { bg: "#eff6ff", icon: "#2563eb" },
  "Appointments": { bg: "#d1fae5", icon: "#059669" },
  "Prescriptions": { bg: "#fef3c7", icon: "#d97706" },
  "Billing & Payments": { bg: "#ede9fe", icon: "#7c3aed" },
  "Technical Issues": { bg: "#fce7f3", icon: "#db2777" },
  "Privacy & Security": { bg: "#fee2e2", icon: "#dc2626" },
};

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Getting Started");

  const categories = Object.keys(articles);

  const filteredArticles = query.trim()
    ? Object.entries(articles).flatMap(([cat, arts]) =>
        arts.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.desc.toLowerCase().includes(query.toLowerCase()))
          .map(a => ({ ...a, cat }))
      )
    : articles[activeCategory].map(a => ({ ...a, cat: activeCategory }));

  return (
    <div style={{ minHeight: "100vh", padding: "48px 16px", maxWidth: 1024, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: "var(--foreground)", margin: "0 0 12px" }}>Help Center</h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 16, margin: "0 0 28px" }}>
          Find answers, guides, and support for everything on the Doorspitals Partner Platform.
        </p>
        {/* Search */}
        <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
          <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 18, height: 18, color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search articles, guides, FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "14px 14px 14px 48px", borderRadius: 50, border: "1px solid var(--border)", fontSize: 15, outline: "none", backgroundColor: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", color: "var(--foreground)" }}
          />
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      {!query.trim() && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Book;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                  borderRadius: 999, border: isActive ? "2px solid #2563eb" : "1px solid var(--border)",
                  background: isActive ? "#eff6ff" : "var(--card)", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, color: isActive ? "#2563eb" : "var(--muted-foreground)",
                  transition: "all 0.15s",
                }}
              >
                <Icon style={{ width: 14, height: 14 }} />
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* ── ARTICLES GRID ── */}
      {query.trim() && filteredArticles.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <Search style={{ width: 48, height: 48, margin: "0 auto 12px", opacity: 0.4 }} />
          <p style={{ fontSize: 16, fontWeight: 600 }}>No articles found for "{query}"</p>
          <p style={{ fontSize: 14 }}>Try a different search term or browse by category.</p>
        </div>
      )}

      {filteredArticles.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
          {filteredArticles.map((article, i) => {
            const color = categoryColors[article.cat] || { bg: "var(--secondary)", icon: "var(--muted-foreground)" };
            const Icon = categoryIcons[article.cat] || Book;
            return (
              <div key={i} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, cursor: "pointer", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: color.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon style={{ width: 16, height: 16, color: color.icon }} />
                  </div>
                  {query.trim() && (
                    <span style={{ fontSize: 11, backgroundColor: "var(--secondary)", color: "var(--muted-foreground)", padding: "2px 8px", borderRadius: 999, fontWeight: 500 }}>{article.cat}</span>
                  )}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 15, color: "var(--foreground)", margin: "0 0 6px" }}>{article.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 14px", lineHeight: 1.5 }}>{article.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#2563eb", fontWeight: 500 }}>
                  Read article <ChevronRight style={{ width: 14, height: 14 }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── POPULAR TOPICS ── */}
      <div style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, marginBottom: 30 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Popular Help Topics</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["How to get verified", "Setting consultation fees", "Payout schedule", "Issuing prescriptions", "Cancel an appointment", "Video call setup", "KYC documents required", "Delete account"].map((t) => (
            <button key={t} onClick={() => setQuery(t)} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", fontSize: 13, color: "var(--foreground)", cursor: "pointer", fontWeight: 500 }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTACT CTA ── */}
      <div style={{ background: "linear-gradient(135deg, #2563eb, #059669)", borderRadius: 20, padding: "32px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--card)", margin: "0 0 6px" }}>Still need help?</h2>
          <p style={{ fontSize: 14, color: "#bfdbfe", margin: 0 }}>Our support team is available Mon–Sat from 9 AM–7 PM IST.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/contact" style={{ backgroundColor: "var(--card)", color: "#2563eb", fontWeight: 600, padding: "10px 22px", borderRadius: 999, fontSize: 14, textDecoration: "none" }}>
            Contact Support
          </a>
          <a href="/faqs" style={{ background: "rgba(255,255,255,0.15)", color: "var(--card)", fontWeight: 600, padding: "10px 22px", borderRadius: 999, fontSize: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
            View FAQs
          </a>
        </div>
      </div>
    </div>
  );
}
