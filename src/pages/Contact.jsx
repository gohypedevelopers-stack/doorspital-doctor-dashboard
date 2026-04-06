// src/pages/Contact.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  const contactCards = [
    {
      icon: Mail,
      color: "#dbeafe",
      iconColor: "#2563eb",
      title: "Email Support",
      lines: ["support@doorspitals.com", "grievance@doorspitals.com"],
      sub: "We respond within 24 hours",
    },
    {
      icon: Phone,
      color: "#d1fae5",
      iconColor: "#059669",
      title: "Phone Support",
      lines: ["+91 98765 43210"],
      sub: "Mon–Sat, 9 AM – 7 PM IST",
    },
    {
      icon: MapPin,
      color: "#ede9fe",
      iconColor: "#7c3aed",
      title: "Head Office",
      lines: ["GoHype Technologies Pvt. Ltd.", "Hyderabad, Telangana, India"],
      sub: "Corporate office",
    },
    {
      icon: Clock,
      color: "#fef3c7",
      iconColor: "#d97706",
      title: "Support Hours",
      lines: ["Mon–Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 4:00 PM"],
      sub: "Indian Standard Time (IST)",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "48px 16px", maxWidth: 1024, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff",
          color: "#2563eb", padding: "6px 14px", borderRadius: 999, fontSize: 12,
          fontWeight: 600, border: "1px solid #bfdbfe", marginBottom: 14,
        }}>
          <MessageCircle style={{ width: 14, height: 14 }} />
          Get in Touch
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: "var(--foreground)", margin: "0 0 12px" }}>Contact Us</h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
          Have a question, need support, or want to partner with us? We're here to help — reach out through any channel below.
        </p>
      </div>

      {/* ── CONTACT CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
        {contactCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: card.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon style={{ width: 20, height: 20, color: card.iconColor }} />
              </div>
              <h3 style={{ fontWeight: 600, fontSize: 15, color: "var(--foreground)", margin: "0 0 8px" }}>{card.title}</h3>
              {card.lines.map((line) => (
                <p key={line} style={{ margin: "0 0 3px", fontSize: 14, color: "var(--foreground)", fontWeight: 500 }}>{line}</p>
              ))}
              <p style={{ margin: "8px 0 0", fontSize: 12, color: "#94a3b8" }}>{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── FORM + SIDE INFO ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 32, alignItems: "start" }}>
        {/* Left: Topics */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>Frequently Contacted For</h2>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 24 }}>
            Select the topic that best matches your query to get the fastest response.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { topic: "Doctor Registration & KYC", email: "support@doorspitals.com", tag: "Registration" },
              { topic: "Payment & Refund Issues", email: "refunds@doorspitals.com", tag: "Payments" },
              { topic: "Pharmacy / Medicine Orders", email: "support@doorspitals.com", tag: "Pharmacy" },
              { topic: "Technical Bugs & App Issues", email: "tech@doorspitals.com", tag: "Technical" },
              { topic: "Formal Grievances", email: "grievance@doorspitals.com", tag: "Grievance" },
              { topic: "Partnership & Business Enquiries", email: "partners@doorspitals.com", tag: "Business" },
            ].map((item) => (
              <div key={item.topic} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "var(--foreground)", margin: "0 0 3px" }}>{item.topic}</p>
                  <a href={"mailto:" + item.email} style={{ fontSize: 12, color: "#2563eb", textDecoration: "none" }}>{item.email}</a>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, backgroundColor: "var(--secondary)", color: "var(--muted-foreground)", padding: "3px 10px", borderRadius: 999 }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 32 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle style={{ width: 32, height: 32, color: "#059669" }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", margin: "0 0 8px" }}>Message Sent!</h3>
              <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
                Thank you for contacting us. We will respond within 24 business hours.
              </p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{ marginTop: 20, background: "#2563eb", color: "var(--card)", border: "none", borderRadius: 999, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 6px" }}>Send Us a Message</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 24px" }}>We'll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", display: "block", marginBottom: 6 }}>Full Name *</label>
                    <input
                      required type="text" placeholder="Dr. Arjun Mehta"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", display: "block", marginBottom: 6 }}>Email Address *</label>
                    <input
                      required type="email" placeholder="you@example.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", display: "block", marginBottom: 6 }}>Subject *</label>
                  <select
                    required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }}
                  >
                    <option value="">Select a subject...</option>
                    <option>Doctor Registration & KYC Help</option>
                    <option>Payment or Refund Query</option>
                    <option>Pharmacy / Medicine Order Issue</option>
                    <option>Technical Bug or App Issue</option>
                    <option>Partnership or Business Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", display: "block", marginBottom: 6 }}>Message *</label>
                  <textarea
                    required rows={5} placeholder="Describe your query in detail..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)", resize: "vertical" }}
                  />
                </div>
                <button type="submit" style={{ background: "linear-gradient(135deg, #2563eb, #059669)", color: "var(--card)", border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Send style={{ width: 16, height: 16 }} /> Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
