// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Building2, Target, Users, Stethoscope, ShoppingBag,
  ShieldCheck, Heart, Rocket, Globe, Award, Mail, ArrowRight,
} from "lucide-react";

const s = (styles) => styles; // passthrough for inline style objects

const teamMembers = [
  { name: "Founder & CEO", initials: "GH", color: "#2563eb", desc: "Visionary behind Doorspitals, with 10+ years in healthcare tech." },
  { name: "Chief Medical Officer", initials: "CM", color: "#059669", desc: "MBBS, MD. Ensures clinical integrity across all platform decisions." },
  { name: "Head of Technology", initials: "HT", color: "#7c3aed", desc: "Full-stack architect building the backbone of the Doorspitals ecosystem." },
  { name: "Head of Partnerships", initials: "HP", color: "#f59e0b", desc: "Leads doctor and pharmacy onboarding across India." },
];

const milestones = [
  { year: "2022", title: "Doorspitals Founded", desc: "GoHype Technologies Pvt. Ltd. was incorporated with a focus on digital healthcare infrastructure." },
  { year: "2023", title: "Beta Launch", desc: "The Doorspitals Partner Platform went live in Hyderabad with 50 founding doctor partners." },
  { year: "2024", title: "National Expansion", desc: "Expanded to 20+ cities across India. Pharmacy portal launched with prescription order management." },
  { year: "2025", title: "20,000+ Partners", desc: "Crossed 20,000 registered doctor and pharmacy partners. Razorpay payment integration live." },
  { year: "2026", title: "The Road Ahead", desc: "AI-powered appointment matching, telemedicine enhancements, and pan-India rural healthcare access." },
];

const values = [
  { icon: Heart, color: "#dc2626", bg: "#fef2f2", title: "Patient First", desc: "Every feature we build starts with one question: does this improve care for patients?" },
  { icon: ShieldCheck, color: "#059669", bg: "#ecfdf5", title: "Trust & Transparency", desc: "Zero hidden charges, verified professionals, and honest data practices — always." },
  { icon: Rocket, color: "#7c3aed", bg: "#f5f3ff", title: "Innovation", desc: "We constantly evolve our platform to bring the best of technology to healthcare." },
  { icon: Globe, color: "#2563eb", bg: "#eff6ff", title: "Accessibility", desc: "Making quality healthcare reachable for every Indian, regardless of location." },
  { icon: Users, color: "#f59e0b", bg: "#fefce8", title: "Community", desc: "Building a thriving ecosystem where doctors, pharmacies, and patients grow together." },
  { icon: Award, color: "#ec4899", bg: "#fdf2f8", title: "Excellence", desc: "We hold ourselves to the highest standards of quality in every product decision." },
];

export default function About() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #0f2d4a 100%)",
        padding: "80px 16px 64px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.08)", color: "#93c5fd",
            padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.12)", marginBottom: 24,
          }}>
            <Building2 style={{ width: 13, height: 13 }} />
            About Doorspitals
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#fff", margin: "0 0 20px", lineHeight: 1.15 }}>
            Bridging the Gap Between<br />
            <span style={{ background: "linear-gradient(90deg, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Doctors, Pharmacies & Patients
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "#93c5fd", lineHeight: 1.7, margin: "0 0 36px" }}>
            Doorspitals is India's trusted digital health partner platform — built by <strong style={{ color: "#fff" }}>GoHype Technologies Private Limited</strong> — connecting verified healthcare professionals with millions of patients across India.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link to="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #2563eb, #059669)", color: "#fff", fontWeight: 700, padding: "13px 28px", borderRadius: 999, fontSize: 15, textDecoration: "none" }}>
              Join as a Partner <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, padding: "13px 28px", borderRadius: 999, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
              Contact Us
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ maxWidth: 900, margin: "56px auto 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            { value: "20,000+", label: "Verified Partners", icon: "🏥" },
            { value: "4.9 ★", label: "Average Rating", icon: "⭐" },
            { value: "25+", label: "Cities Covered", icon: "🗺️" },
            { value: "0%", label: "Commission (Intro)", icon: "💸" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#60a5fa" }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: "#93c5fd", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR MISSION
      ══════════════════════════════════════ */}
      <section style={{ padding: "72px 16px", maxWidth: 1024, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", color: "#2563eb", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid #bfdbfe", marginBottom: 16 }}>
              <Target style={{ width: 13, height: 13 }} />
              Our Mission
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 16px", lineHeight: 1.25 }}>
              Making Quality Healthcare Accessible to Every Indian
            </h2>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, margin: "0 0 16px" }}>
              India has over 1 million registered doctors and 900,000 pharmacies — yet patients often struggle to find trusted, accessible care. Doorspitals was built to fix this by creating a seamless, verified digital bridge between healthcare providers and the people who need them most.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, margin: "0 0 24px" }}>
              We empower doctors to manage their practice digitally, enable pharmacies to grow their prescription business, and ensure patients receive timely, quality healthcare — regardless of where they live.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Verified doctor and pharmacy profiles — no fake listings",
                "End-to-end encrypted patient data with full compliance",
                "RBI-compliant payment processing via Razorpay",
                "Zero hidden charges — complete financial transparency",
              ].map((point) => (
                <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>✓</span>
                  </div>
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: Stethoscope, color: "#2563eb", bg: "#eff6ff", title: "For Doctors", desc: "Manage appointments, video consultations, digital prescriptions, patient notes, and earnings — all from one clean dashboard." },
              { icon: ShoppingBag, color: "#059669", bg: "#ecfdf5", title: "For Pharmacies", desc: "Receive prescription orders from local doctors, manage inventory in real-time, and process payments securely." },
              { icon: Users, color: "#7c3aed", bg: "#f5f3ff", title: "For Patients", desc: "Find verified doctors nearby, book appointments, get digital prescriptions, and order medicines to your doorstep." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 20, display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: 22, height: 22, color: item.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", margin: "0 0 6px" }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR VALUES
      ══════════════════════════════════════ */}
      <section style={{ background: "#f8fafc", padding: "72px 16px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>Our Core Values</h2>
            <p style={{ color: "#64748b", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
              These principles guide every decision we make at Doorspitals.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 24 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon style={{ width: 24, height: 24, color: v.color }} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, color: "#0f172a", margin: "0 0 8px" }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOURNEY / MILESTONES
      ══════════════════════════════════════ */}
      <section style={{ padding: "72px 16px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>Our Journey</h2>
          <p style={{ color: "#64748b", fontSize: 15 }}>From a bold idea to India's growing healthcare partner network.</p>
        </div>
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 56, top: 0, bottom: 0, width: 2, background: "#e2e8f0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 24, paddingBottom: 36 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 112, flexShrink: 0 }}>
                  <div style={{ background: i === milestones.length - 1 ? "linear-gradient(135deg, #2563eb, #059669)" : "#fff", border: "2px solid #2563eb", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 700, color: i === milestones.length - 1 ? "#fff" : "#2563eb", zIndex: 1, whiteSpace: "nowrap" }}>
                    {m.year}
                  </div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "18px 22px", flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", margin: "0 0 6px" }}>{m.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.65 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section style={{ background: "#f8fafc", padding: "72px 16px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>The Team Behind Doorspitals</h2>
            <p style={{ color: "#64748b", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
              A passionate team of healthcare professionals, technologists, and entrepreneurs united by one goal.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {teamMembers.map((m) => (
              <div key={m.name} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 24, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: m.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, margin: "0 auto 16px" }}>
                  {m.initials}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: "0 0 8px" }}>{m.name}</h3>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMPLIANCE BADGES
      ══════════════════════════════════════ */}
      <section style={{ padding: "56px 16px", maxWidth: 1024, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Compliance & Certifications</h2>
          <p style={{ fontSize: 14, color: "#64748b" }}>We operate in full compliance with Indian regulatory requirements.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {[
            { emoji: "🏥", label: "MCI/NMC Verified Doctors" },
            { emoji: "💊", label: "State Pharmacy Board Partners" },
            { emoji: "🔒", label: "AES-256 Data Encryption" },
            { emoji: "💳", label: "RBI-Compliant Payments (Razorpay)" },
            { emoji: "⚖️", label: "IT Act 2000 Compliant" },
            { emoji: "📋", label: "DPDP Act Compliant" },
          ].map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 999, padding: "10px 20px", fontSize: 14, fontWeight: 500, color: "#374151" }}>
              <span style={{ fontSize: 20 }}>{b.emoji}</span>
              {b.label}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #1e3a8a, #065f46)", padding: "64px 16px", margin: "0 0 0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Join the Doorspitals Partner Network
          </h2>
          <p style={{ fontSize: 16, color: "#93c5fd", margin: "0 0 32px" }}>
            Whether you're a doctor, pharmacist, or healthcare entrepreneur — there's a place for you in our ecosystem.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link to="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#1e3a8a", fontWeight: 700, padding: "13px 28px", borderRadius: 999, fontSize: 15, textDecoration: "none" }}>
              Register Free <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", fontWeight: 600, padding: "13px 28px", borderRadius: 999, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
              <Mail style={{ width: 16, height: 16 }} /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
