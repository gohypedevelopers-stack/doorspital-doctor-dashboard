// src/pages/Testimonials.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight, Stethoscope, ShoppingBag, Filter } from "lucide-react";

const allTestimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "General Physician",
    city: "Delhi",
    type: "doctor",
    avatar: "PS",
    color: "#2563eb",
    stars: 5,
    highlight: "Patient base grew by 40%",
    text: "Since joining Doorspitals, my patient base has grown by 40%. The digital prescription feature saves me hours every week, and the seamless pharmacy tie-up means my patients actually get their medicines on time. Absolutely worth it! The dashboard is intuitive and the payout process is completely transparent.",
  },
  {
    name: "Dr. Rakesh Menon",
    role: "Cardiologist",
    city: "Bengaluru",
    type: "doctor",
    avatar: "RM",
    color: "#059669",
    stars: 5,
    highlight: "20+ online patients daily",
    text: "The video consultation feature is incredibly smooth. I now see 20+ online patients daily without the overhead of a physical clinic. Payouts are always on time and transparent. Doorspitals has genuinely changed how I practice medicine. My patients in tier-2 cities can now access specialist care from me instantly.",
  },
  {
    name: "Fatima Medical Store",
    role: "Pharmacy Owner",
    city: "Hyderabad",
    type: "pharmacy",
    avatar: "FM",
    color: "#7c3aed",
    stars: 5,
    highlight: "3x prescription order volume",
    text: "Our prescription order volume went up 3x in the first month after joining Doorspitals. The inventory management system is intuitive, and the integration with doctors in our area means we never miss an order. Highly recommend to all pharmacies looking to grow their business digitally.",
  },
  {
    name: "Dr. Anita Desai",
    role: "Pediatrician",
    city: "Mumbai",
    type: "doctor",
    avatar: "AD",
    color: "#f59e0b",
    stars: 5,
    highlight: "Eliminated scheduling chaos",
    text: "As a busy pediatrician, managing appointments used to be chaos. The Doorspitals dashboard organizes everything perfectly. My patients love the digital prescriptions — no more illegible handwriting! The support team is also very responsive. Any issue is resolved within a few hours.",
  },
  {
    name: "MedLife Pharmacy",
    role: "Medical Store Chain",
    city: "Chennai",
    type: "pharmacy",
    avatar: "ML",
    color: "#ec4899",
    stars: 5,
    highlight: "Revenue up significantly",
    text: "We joined skeptically but the results speak for themselves. Doorspitals connected us with 20+ local doctors whose prescriptions now come directly to us. Our monthly revenue increased significantly. The platform is well-designed and reliable. The stock management alerts have saved us from multiple stockout situations.",
  },
  {
    name: "Dr. Suresh Kumar",
    role: "Orthopedic Surgeon",
    city: "Pune",
    type: "doctor",
    avatar: "SK",
    color: "#06b6d4",
    stars: 5,
    highlight: "Live in 48 hours after KYC",
    text: "The KYC process was smooth and professional. Once verified, I was live within 48 hours. Patients can now find me easily and book slots without calling my clinic. The analytics dashboard helps me understand peak hours and optimize my schedule. I've reduced my no-show rate by 60%.",
  },
  {
    name: "Apollo Care Pharmacy",
    role: "Pharmacy Partner",
    city: "Kolkata",
    type: "pharmacy",
    avatar: "AC",
    color: "#dc2626",
    stars: 5,
    highlight: "Zero missed prescriptions",
    text: "The real-time prescription alert system is a game changer. The moment a Doorspitals doctor issues a prescription in our delivery area, we receive it instantly. We've had zero missed prescriptions since joining. The payment settlement is quick and the support team is genuinely helpful.",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Dermatologist",
    city: "Kochi",
    type: "doctor",
    avatar: "MI",
    color: "#16a34a",
    stars: 5,
    highlight: "Extended reach to tier-2 patients",
    text: "Being a specialist in a metro city, I always wanted to help patients in smaller towns. Doorspitals made that possible. I now regularly consult patients from tier-2 and tier-3 towns in Kerala through video consultations. The prescription upload system is compliant and professionally designed.",
  },
  {
    name: "Dr. Arjun Patel",
    role: "Diabetologist",
    city: "Ahmedabad",
    type: "doctor",
    avatar: "AP",
    color: "#9333ea",
    stars: 5,
    highlight: "Prescription follow-up simplified",
    text: "Managing diabetic patients requires consistent follow-ups. Doorspitals' patient history and prescription management makes this seamless. I can see a patient's complete medication history instantly and adjust prescriptions accordingly. My patient retention rate has improved dramatically.",
  },
  {
    name: "Wellness Pharmacy Hub",
    role: "Independent Pharmacy",
    city: "Jaipur",
    type: "pharmacy",
    avatar: "WP",
    color: "#0891b2",
    stars: 5,
    highlight: "Inventory shrinkage reduced by 30%",
    text: "The Doorspitals pharmacy dashboard is incredibly detailed. I can forecast demand based on how many prescriptions are coming in for specific medicines. Our inventory shrinkage has reduced by 30% and we are never overstocked. The integration is seamless and the support team responds quickly.",
  },
  {
    name: "Dr. Fatima Khan",
    role: "Gynecologist",
    city: "Lucknow",
    type: "doctor",
    avatar: "FK",
    color: "#be185d",
    stars: 5,
    highlight: "Consultation fees collected 100%",
    text: "As a solo practitioner, collecting consultation fees used to be awkward. With Doorspitals, payment is collected upfront by Razorpay before every consultation — I've never missed a payment since joining. The platform handles all the billing so I can focus entirely on patient care.",
  },
  {
    name: "LifeCare Medical Store",
    role: "Pharmacy Partner",
    city: "Bhopal",
    type: "pharmacy",
    avatar: "LC",
    color: "#b45309",
    stars: 5,
    highlight: "Joined network of 1000+ pharmacies",
    text: "Doorspitals gave us credibility and visibility we couldn't build on our own. Being a verified Doorspitals pharmacy partner has increased patient trust in our store. Footfall increased noticeably as patients specifically come to us because we're on the Doorspitals network.",
  },
];

export default function Testimonials() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? allTestimonials
    : allTestimonials.filter((t) => t.type === filter);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #064e3b 100%)", padding: "72px 16px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", color: "#fde68a", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)", marginBottom: 20 }}>
            <Star style={{ width: 13, height: 13 }} />
            Partner Testimonials
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: "var(--card)", margin: "0 0 16px", lineHeight: 1.2 }}>
            Trusted by Healthcare Professionals<br />
            <span style={{ color: "#86efac" }}>Across India</span>
          </h1>
          <p style={{ fontSize: 17, color: "#93c5fd", margin: "0 0 28px", lineHeight: 1.7 }}>
            Real stories from doctors and pharmacists who have transformed their practice with the Doorspitals Partner Platform.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            {[
              { value: "4.9 / 5", label: "Average Rating" },
              { value: "20,000+", label: "Partner Reviews" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#86efac" }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: "#93c5fd" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FILTER + GRID
      ══════════════════════════════════════ */}
      <section style={{ padding: "60px 16px", maxWidth: 1120, margin: "0 auto" }}>
        {/* Filter pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 44, flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All Partners", icon: Filter },
            { key: "doctor", label: "Doctors", icon: Stethoscope },
            { key: "pharmacy", label: "Pharmacies", icon: ShoppingBag },
          ].map((f) => {
            const Icon = f.icon;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
                  border: active ? "2px solid #2563eb" : "1px solid var(--border)",
                  background: active ? "#eff6ff" : "var(--card)",
                  color: active ? "#2563eb" : "var(--muted-foreground)",
                  transition: "all 0.15s",
                }}
              >
                <Icon style={{ width: 15, height: 15 }} />
                {f.label}
                <span style={{ background: active ? "#bfdbfe" : "var(--secondary)", color: active ? "#1d4ed8" : "var(--muted-foreground)", padding: "1px 8px", borderRadius: 999, fontSize: 12 }}>
                  {f.key === "all" ? allTestimonials.length : allTestimonials.filter(t => t.type === f.key).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ columns: "3 320px", columnGap: 24 }}>
          {filtered.map((t, i) => (
            <div
              key={i}
              style={{
                breakInside: "avoid", marginBottom: 24,
                backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24,
                display: "flex", flexDirection: "column", gap: 16,
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} style={{ width: 16, height: 16, fill: "#f59e0b", color: "#f59e0b" }} />
                ))}
              </div>

              {/* Highlight badge */}
              <div style={{ display: "inline-flex", alignSelf: "flex-start", background: "#f0fdf4", color: "#15803d", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid #bbf7d0" }}>
                ✦ {t.highlight}
              </div>

              {/* Quote icon + text */}
              <div style={{ position: "relative" }}>
                <Quote style={{ width: 28, height: 28, color: "var(--border)", position: "absolute", top: -4, left: -4 }} />
                <p style={{ fontSize: 14, color: "var(--foreground)", lineHeight: 1.75, margin: 0, paddingLeft: 20 }}>
                  {t.text}
                </p>
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 8, borderTop: "1px solid var(--secondary)" }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: t.color, color: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "var(--foreground)", margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{t.role} · {t.city}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, background: t.type === "doctor" ? "#eff6ff" : "#ecfdf5", color: t.type === "doctor" ? "#2563eb" : "#059669", padding: "3px 10px", borderRadius: 999 }}>
                  {t.type === "doctor" ? "Doctor" : "Pharmacy"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRUST STATS
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--background)", padding: "56px 16px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--foreground)", textAlign: "center", margin: "0 0 36px" }}>
            Why Partners Trust Doorspitals
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { icon: "⭐", value: "4.9/5", label: "Average Partner Rating", sub: "Based on 20,000+ reviews" },
              { icon: "✅", value: "98%", label: "Satisfaction Rate", sub: "Among active partners" },
              { icon: "💳", value: "T+5", label: "Avg. Payout Time", sub: "Business days" },
              { icon: "🛡️", value: "24/7", label: "Support Available", sub: "Chat, email & phone" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--foreground)" }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: "4px 0 2px" }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #2563eb, #059669)", padding: "64px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 700, color: "var(--card)", margin: "0 0 12px" }}>
            Ready to Write Your Own Success Story?
          </h2>
          <p style={{ fontSize: 16, color: "#bfdbfe", margin: "0 0 32px" }}>
            Join 20,000+ doctors and pharmacies growing their practice with Doorspitals.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link to="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "var(--card)", color: "#2563eb", fontWeight: 700, padding: "13px 28px", borderRadius: 999, fontSize: 15, textDecoration: "none" }}>
              Register Free <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link to="/benefits" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", color: "var(--card)", fontWeight: 600, padding: "13px 28px", borderRadius: 999, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
              See Benefits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
