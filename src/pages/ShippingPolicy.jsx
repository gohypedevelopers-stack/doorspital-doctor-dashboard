// src/pages/ShippingPolicy.jsx
import React from "react";
import { Truck, MapPin, Clock, Package, AlertTriangle, CheckCircle, Globe } from "lucide-react";

export default function ShippingPolicy() {
  const prescriptionTable = [
    { cat: "OTC (Over-the-Counter)", req: "No", ok: true, note: "Available without prescription" },
    { cat: "Schedule H Drugs", req: "Yes – Mandatory", ok: false, note: "Antibiotics, anti-hypertensives, etc." },
    { cat: "Schedule H1 Drugs", req: "Yes – Mandatory", ok: false, note: "Includes habit-forming substances" },
    { cat: "Schedule X Drugs", req: "Yes – Special permit", ok: false, note: "Narcotics & psychotropic substances" },
    { cat: "Vitamins & Supplements", req: "Usually No", ok: true, note: "Unless therapeutically significant dose" },
  ];

  const infoCards = [
    {
      icon: Clock,
      color: "#dbeafe",
      iconColor: "#2563eb",
      title: "Estimated Delivery Time",
      points: [
        "Standard delivery: 24–48 hours",
        "Express delivery (where available): 2–4 hours",
        "Rural or remote areas: 3–7 business days",
        "Prescription drugs: Subject to verification",
      ],
    },
    {
      icon: Package,
      color: "#d1fae5",
      iconColor: "#059669",
      title: "Shipping Charges",
      points: [
        "Free delivery on orders above ₹499",
        "Standard delivery fee: ₹25 – ₹60 (by distance)",
        "Express delivery surcharge: ₹50 – ₹100",
        "All charges shown at checkout before payment",
      ],
    },
    {
      icon: MapPin,
      color: "#ede9fe",
      iconColor: "#7c3aed",
      title: "Delivery Coverage",
      points: [
        "Coverage depends on pharmacy's delivery radius",
        "Enter PIN code at checkout to find pharmacies",
        "Serving major cities and towns across India",
        "Coverage expanding as new pharmacies join",
      ],
    },
    {
      icon: Truck,
      color: "#fef3c7",
      iconColor: "#d97706",
      title: "Order Tracking",
      points: [
        "Real-time tracking in-app under 'My Orders'",
        "SMS and push notification updates at each stage",
        "Stages: Confirmed → Packed → Dispatched → Delivered",
        "Contact pharmacy via in-app chat for help",
      ],
    },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "48px 16px", maxWidth: 896, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, background: "#fff7ed",
          color: "#c2410c", padding: "6px 14px", borderRadius: 999, fontSize: 12,
          fontWeight: 600, border: "1px solid #fed7aa", marginBottom: 14,
        }}>
          <Truck style={{ width: 14, height: 14 }} />
          Shipping &amp; Delivery Policy
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "var(--foreground)", margin: "0 0 10px" }}>
          Shipping &amp; Delivery Policy
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 14, maxWidth: 520, margin: "0 auto" }}>
          Everything you need to know about medicine delivery from Doorspitals-registered pharmacies.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 14, fontSize: 12, color: "#94a3b8" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock style={{ width: 12, height: 12 }} /> Last updated: April 2025
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Globe style={{ width: 12, height: 12 }} /> Applicable within India
          </span>
        </div>
      </div>

      {/* ── INTRO BOX ── */}
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "16px 20px", marginBottom: 32, fontSize: 14, color: "#9a3412" }}>
        <strong>Please Note:</strong> Doorspitals operates as a technology intermediary connecting patients with locally registered pharmacies. Medicines are dispatched directly by pharmacy partners. Delivery timelines, charges, and availability may vary by pharmacy and location.
      </div>

      {/* ── INFO CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {infoCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: card.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon style={{ width: 20, height: 20, color: card.iconColor }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: 15, color: "var(--foreground)", margin: "0 0 8px" }}>{card.title}</h3>
                  <ul style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8, paddingLeft: 0, listStyle: "none", margin: 0 }}>
                    {card.points.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── PRESCRIPTION REQUIREMENTS ── */}
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle style={{ width: 20, height: 20, color: "#059669" }} />
          Prescription Requirements
        </h2>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 16 }}>
          India's drug laws require a valid prescription for certain categories of medicines:
        </p>
        <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid var(--border)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ backgroundColor: "var(--background)" }}>
              <tr>
                {["Drug Category", "Prescription Required?", "Notes"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "var(--foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prescriptionTable.map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 500, color: "var(--foreground)" }}>{row.cat}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 12, color: row.ok ? "#059669" : "#dc2626" }}>{row.req}</td>
                  <td style={{ padding: "10px 14px", color: "#6b7280", fontSize: 12 }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
          Digital prescriptions from Doorspitals-verified doctors are accepted in-app. Physical prescriptions may need to be uploaded as clear photographs.
        </p>
      </div>

      {/* ── DELAYS ── */}
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangle style={{ width: 20, height: 20, color: "#f59e0b" }} />
          Delays, Exceptions &amp; Non-Deliverable Areas
        </h2>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 12 }}>
          Doorspitals is not liable for delivery delays caused by:
        </p>
        <ul style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 2, paddingLeft: 20 }}>
          <li>Natural disasters, floods, or extreme weather conditions (force majeure).</li>
          <li>Government-mandated curfews, lockdowns, or supply chain disruptions.</li>
          <li>Incorrect or incomplete delivery address provided by the customer.</li>
          <li>Unavailability of customer at time of delivery (2 re-attempts before return).</li>
          <li>Medicines out of stock at selected pharmacy (full refund will be issued).</li>
          <li>Banking holidays or Razorpay processing delays.</li>
        </ul>
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400e", marginTop: 16 }}>
          If your order is delayed, contact the pharmacy via in-app chat or email <a href="mailto:support@doorspitals.com" style={{ color: "#d97706" }}>support@doorspitals.com</a>.
        </div>
      </div>

      {/* ── PACKAGING ── */}
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", marginBottom: 12 }}>Packaging Standards</h2>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 12 }}>
          Partner pharmacies are required to adhere to the following packaging standards:
        </p>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "All medicines must be in original, sealed manufacturer packaging.",
            "Fragile items (glass vials, syrups) must be padded and secured.",
            "Temperature-sensitive medicines (insulin, eye drops) must use insulated packaging with ice packs.",
            "A printed invoice must accompany every order for regulatory compliance.",
          ].map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--muted-foreground)" }}>
              <CheckCircle style={{ width: 16, height: 16, color: "#059669", flexShrink: 0, marginTop: 2 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── FOOTER CTA ── */}
      <div style={{ background: "linear-gradient(135deg, #f97316, #f59e0b)", borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--card)", margin: "0 0 8px" }}>Delivery Issues? We're Here to Help.</h2>
        <p style={{ fontSize: 14, color: "#fef3c7", margin: "0 0 20px" }}>Contact us if your order is delayed, damaged, or hasn't arrived.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <a href="/contact" style={{ backgroundColor: "var(--card)", color: "#c2410c", fontWeight: 600, padding: "10px 24px", borderRadius: 999, fontSize: 14, textDecoration: "none" }}>
            Contact Support
          </a>
          <a href="mailto:support@doorspitals.com" style={{ background: "rgba(255,255,255,0.2)", color: "var(--card)", fontWeight: 600, padding: "10px 24px", borderRadius: 999, fontSize: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>
            support@doorspitals.com
          </a>
        </div>
      </div>
    </div>
  );
}
