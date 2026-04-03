// src/pages/Faqs.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Search, 
  Building2, 
  Stethoscope, 
  CreditCard, 
  ShieldCheck, 
  Smartphone, 
  MessageCircle, 
  Mail, 
  Star 
} from "lucide-react";

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
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 12, background: "#fff" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: open ? "#f8fafc" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}
      >
        <span style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>{q}</span>
        {open
          ? <ChevronUp style={{ width: 18, height: 18, color: "#2563eb", flexShrink: 0 }} />
          : <ChevronDown style={{ width: 18, height: 18, color: "#94a3b8", flexShrink: 0 }} />}
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px", fontSize: 14, color: "#475569", lineHeight: 1.7, background: "#f8fafc" }}>
          {a}
        </div>
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
    <div style={{ minHeight: "100vh", padding: "60px 16px", maxWidth: 900, margin: "0 auto", background: "#fff" }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", color: "#2563eb", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid #bfdbfe", marginBottom: 14 }}>
          <HelpCircle style={{ width: 14, height: 14 }} />
          Help & Support
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 500, margin: "0 auto" }}>
          Everything you need to know about joining and using the Doorspitals platform.
        </p>
      </div>

      {/* ── CATEGORY BAR ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
        {categories.map((cat) => {
          const Icon = categoryIcons[cat] || Building2;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                borderRadius: 999, border: isActive ? "2px solid #2563eb" : "1px solid #e2e8f0",
                background: isActive ? "#eff6ff" : "#fff", cursor: "pointer",
                fontSize: 13, fontWeight: 600, color: isActive ? "#2563eb" : "#64748b",
              }}
            >
              <Icon style={{ width: 14, height: 14 }} />
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── FAQ LIST ── */}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {faqData[activeCategory].map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>

      {/* ── CONTACT ── */}
      <div style={{ textAlign: "center", marginTop: 48, padding: "32px", background: "#f8fafc", borderRadius: 20, border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Still have questions?</h3>
        <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 20px" }}>
          Our support team is here to help you get started or resolve any issues.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link to="/contact" style={{ background: "#2563eb", color: "#fff", fontWeight: 600, padding: "10px 24px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
            Contact Support
          </Link>
          <a href="mailto:support@doorspitals.com" style={{ background: "#fff", color: "#475569", fontWeight: 600, padding: "10px 24px", borderRadius: 8, fontSize: 14, textDecoration: "none", border: "1px solid #e2e8f0" }}>
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
