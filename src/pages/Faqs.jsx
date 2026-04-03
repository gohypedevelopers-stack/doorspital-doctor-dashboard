// src/pages/Faqs.jsx
// Also serves as /faqs#about (About section) via anchor
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star, Users, Building2, Stethoscope, CreditCard, ShieldCheck, Smartphone } from "lucide-react";

const faqData = {
  "General": [
    { q: "What is Doorspitals?", a: "Doorspitals is a digital health platform that connects verified Doctors, Pharmacies, and Patients in one ecosystem. Doctors can manage appointments and prescriptions; pharmacies can receive prescription orders and manage inventory; and patients can find trusted healthcare providers near them." },
    { q: "Who can join the Doorspitals Partner Platform?", a: "Any licensed Medical Doctor (MBBS, MD, or equivalent), Specialist, or registered Pharmacist/Medical Shop owner in India can join. All partners must complete our KYC verification process before going live on the platform." },
    { q: "Is Doorspitals available across India?", a: "Yes! Doorspitals is available across major cities and towns in India. Our partner network is expanding continuously. You can check if your area is covered by entering your PIN code in the app." },
    { q: "Is Doorspitals free to join?", a: "Yes! Joining as a Doctor or Pharmacy partner is completely free. We earn a small platform service fee only on completed transactions, which is transparently displayed before any deduction. There are no hidden charges." },
  ],
  "Registration & KYC": [
    { q: "How do I register as a Doctor on Doorspitals?", a: "Click 'Register Free' on the top right of our website, fill in your personal and professional details, upload your MCI/NMC registration certificate, educational qualifications, and a government-issued photo ID, then complete the live face verification. Approval takes 2–5 business days." },
    { q: "What documents are needed for KYC?", a: "For Doctors: Government-issued photo ID (Aadhaar, PAN, Passport, or Driving License), MCI/NMC medical registration certificate, educational degree certificate (MBBS/MD), and a recent photograph. For Pharmacies: Drug license, GST certificate, owner's government ID." },
    { q: "How long does KYC verification take?", a: "KYC verification typically takes 2–5 business days from the date all documents are correctly submitted. You will be notified via email and in-app notification once your account is approved or if any documents need resubmission." },
    { q: "Can my account be rejected during KYC?", a: "Yes. Accounts can be rejected if documents are unclear, expired, or fraudulent. You will receive a detailed rejection reason and an opportunity to resubmit the correct documents. Multiple failed attempts may lead to permanent rejection." },
  ],
  "Appointments & Consultations": [
    { q: "How do patients find and book my profile?", a: "Once your profile is verified and live, patients in the Doorspitals patient app can search for doctors by specialty, location, and availability. Your profile will appear in search results, and patients can book directly from the app." },
    { q: "Can I offer both in-person and online consultations?", a: "Yes! You can configure your profile to offer in-clinic visits, video consultations, or both. You can set different fees and availability for each consultation type from your Dashboard settings." },
    { q: "What happens if a patient doesn't show up?", a: "If a patient is marked as a no-show (doesn't join within 10 minutes of the scheduled time), the appointment is automatically marked as no-show. The patient is eligible for a refund as per our Cancellation Policy. The doctor's schedule is freed up automatically." },
    { q: "Can I reschedule or cancel an appointment?", a: "Yes. You can reschedule or cancel appointments from your Dashboard. If you cancel, the patient receives a 100% refund. Please note that frequent cancellations may negatively impact your profile's visibility on the platform." },
  ],
  "Payments & Payouts": [
    { q: "How are payments processed on Doorspitals?", a: "All payments are securely processed via Razorpay, an RBI-licensed Payment Aggregator. Patients pay for consultations and medicine orders through UPI, credit/debit cards, or net banking. All transactions are encrypted end-to-end." },
    { q: "When do I receive my payout?", a: "Payouts are processed on a T+2 to T+7 business day cycle from the date of completed consultation or order fulfillment. You can view your upcoming payouts and payout history in the Financial Dashboard section." },
    { q: "Are there any platform fees or commissions?", a: "During our introductory period, onboarding is completely free. A platform service fee (displayed transparently in your Dashboard) applies on completed transactions. This fee varies by service type and will be communicated in advance of any changes." },
    { q: "What if I don't receive my payout?", a: "If a payout is not received within the stated timeline, contact us at refunds@doorspitals.com with your transaction ID. Our finance team will investigate and resolve the issue within 5 business days." },
  ],
  "Privacy & Security": [
    { q: "How does Doorspitals protect my personal data?", a: "All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption. Patient health records are handled in compliance with applicable Indian health data regulations. We do not sell or share your data with advertisers." },
    { q: "How can I delete my account and data?", a: "You can request account deletion by navigating to Account Settings > Delete Account, or by emailing privacy@doorspitals.com. We will securely erase your data within 30 days, excluding any data legally required to be retained." },
    { q: "Are video consultations private?", a: "Yes. All video consultations on Doorspitals are conducted through encrypted, private sessions. Recordings are not made without explicit consent from both parties. Sessions are not shared with any third parties." },
    { q: "Who can see my patient's prescription data?", a: "Prescription data is only visible to the prescribing Doctor, the patient, and the pharmacy fulfilling the order (with patient consent). No other parties, including Doorspitals employees, can access prescription details without legal requirements." },
  ],
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: open ? "#f8fafc" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}
      >
        <span style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>{q}</span>
        {open
          ? <ChevronUp style={{ width: 18, height: 18, color: "#94a3b8", flexShrink: 0 }} />
          : <ChevronDown style={{ width: 18, height: 18, color: "#94a3b8", flexShrink: 0 }} />}
      </button>
      {open && (
        <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#475569", lineHeight: 1.7, background: "#f8fafc" }}>{a}</div>
      )}
    </div>
  );
}

const categoryIcons = {
  "General": Building2,
  "Registration & KYC": ShieldCheck,
  "Appointments & Consultations": Stethoscope,
  "Payments & Payouts": CreditCard,
  "Privacy & Security": ShieldCheck,
};

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState("General");
  const categories = Object.keys(faqData);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ════════════ ABOUT SECTION ════════════ */}
      <section id="about" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)", padding: "72px 16px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", color: "#93c5fd", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)", marginBottom: 20 }}>
            <Building2 style={{ width: 13, height: 13 }} />
            About Doorspitals
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: 44, fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
                India's Trusted Healthcare Partner Platform
              </h1>
              <p style={{ fontSize: 16, color: "#93c5fd", lineHeight: 1.7, margin: "0 0 24px" }}>
                Doorspitals is built by <strong style={{ color: "#fff" }}>GoHype Technologies Private Limited</strong> with a single mission: to make quality healthcare accessible, efficient, and transparent for every Indian.
              </p>
              <p style={{ fontSize: 15, color: "#bfdbfe", lineHeight: 1.7, margin: "0 0 32px" }}>
                We bridge the gap between verified Doctors, licensed Pharmacies, and patients — creating a seamless digital ecosystem where prescriptions flow digitally, consultations happen online or in-person, and medicines reach patients' doorsteps.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { value: "20,000+", label: "Registered Partners" },
                  { value: "4.9★", label: "Partner Rating" },
                  { value: "0%", label: "Commission (Intro)" },
                  { value: "24/7", label: "Support" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#60a5fa" }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: "#93c5fd", marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: Stethoscope, title: "For Doctors", desc: "Manage appointments, issue digital prescriptions, consult patients via video, and track your earnings — all from one dashboard.", color: "#3b82f6" },
                { icon: ShoppingBag, title: "For Pharmacies", desc: "Receive prescription orders from nearby doctors, manage inventory in real-time, and grow your medicine dispensing business.", color: "#059669" },
                { icon: Users, title: "For Patients", desc: "Find verified doctors, book appointments, receive digital prescriptions, and get medicines delivered to your door.", color: "#7c3aed" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 18, display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: item.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon style={{ width: 18, height: 18, color: item.color }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: "#fff", margin: "0 0 4px", fontSize: 15 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: "#93c5fd", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ SECTION ════════════ */}
      <section style={{ padding: "64px 16px", maxWidth: 1024, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>Frequently Asked Questions</h2>
          <p style={{ color: "#64748b", fontSize: 15, maxWidth: 540, margin: "0 auto" }}>
            Everything you need to know about using the Doorspitals Partner Platform.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 36 }}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Building2;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 999, border: isActive ? "2px solid #2563eb" : "1px solid #e2e8f0", background: isActive ? "#eff6ff" : "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: isActive ? "#2563eb" : "#64748b" }}
              >
                <Icon style={{ width: 14, height: 14 }} />
                {cat}
              </button>
            );
          })}
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {faqData[activeCategory].map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* Still have questions */}
        <div style={{ textAlign: "center", marginTop: 48, padding: "32px 24px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 20, maxWidth: 600, margin: "48px auto 0" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Still have questions?</h3>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 20px" }}>
            Can't find the answer you're looking for? Our support team is happy to help.
          </p>
          <a href="/contact" style={{ display: "inline-block", background: "linear-gradient(135deg, #2563eb, #059669)", color: "#fff", fontWeight: 600, padding: "11px 28px", borderRadius: 999, fontSize: 14, textDecoration: "none" }}>
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
