// src/pages/PrivacyPolicy.jsx
import React from "react";
import { 
  ShieldCheck, Lock, Eye, UserCheck, FileText, Database, 
  Share2, Bell, AlertTriangle, UserPlus, Globe, CreditCard, 
  Cookie, Smartphone, RefreshCw, Mail 
} from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      id: "regulatory",
      icon: ShieldCheck,
      title: "1. Regulatory Framework and Legal Basis",
      content: (
        <>
          <p>This Privacy Policy has been formulated in accordance with applicable Indian laws and regulatory frameworks, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
            <li>The Information Technology Act, 2000</li>
            <li>The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
            <li>The Digital Personal Data Protection Act, 2023 (“DPDP Act”)</li>
            <li>The Telemedicine Practice Guidelines, 2020 issued by the Ministry of Health & Family Welfare</li>
            <li>The National Medical Commission (Professional Conduct, Etiquette and Ethics) Regulations</li>
            <li>The Drugs and Cosmetics Act, 1940 and Rules thereunder</li>
            <li>The Pharmacy Act, 1948</li>
            <li>Applicable RBI guidelines governing digital payment processing</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Globe className="w-3 h-3" /> DATA RESIDENCY
            </p>
            <p className="text-xs mt-1 text-blue-600 dark:text-blue-300">
              In compliance with the DPDP Act, Doorspitals confirms that all personal data and SPDI are stored and processed exclusively on secured servers located within the territory of India.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "definitions",
      icon: FileText,
      title: "2. Definitions",
      content: (
        <ul className="space-y-3">
          <li className="text-sm"><strong>“Personal Data”</strong> means any data about an individual who is identifiable by or in relation to such data.</li>
          <li className="text-sm"><strong>“Sensitive Personal Data or Information (SPDI)”</strong> includes, but is not limited to, medical records, health conditions, biometric data, financial details, and any other information categorized as sensitive under applicable law.</li>
          <li className="text-sm"><strong>“Data Principal”</strong> refers to the individual to whom the personal data relates.</li>
          <li className="text-sm"><strong>“Processing”</strong> includes collection, storage, use, sharing, disclosure, or destruction of data.</li>
        </ul>
      ),
    },
    {
      id: "categories",
      icon: Database,
      title: "3. Categories and Nature of Information Collected",
      content: (
        <div className="space-y-4">
          <p>Doorspitals collects data in a structured and purpose-driven manner to enable efficient healthcare delivery and platform functionality:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card/50">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 underline">Registration Data</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Name, mobile number, email, gender, Date of Birth, and address for account verification and clinical identification.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 underline">Sensitive Personal Data</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Medical history, consultation records, prescriptions, diagnostic reports, symptoms, and health-related communications.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 underline">Professional Data</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">For doctors/pharmacies: Educational qualifications, MCI/NMC registration, licenses, clinic certifications, and location data.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 underline">Financial Data</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We collect transaction IDs, billing history, and masked identifiers for reconciliation. 
                <span className="font-bold text-foreground"> Doorspitals does not store complete card or banking credentials</span>; all payments use Razorpay (RBI-compliant).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "purpose",
      icon: Eye,
      title: "4. Purpose Limitation and Data Minimization",
      content: (
        <p>Data is collected only to the extent necessary for facilitating doctor consultations, enabling telemedicine services (per 2020 Guidelines), managing prescriptions, and supporting pharmacy services. Wherever possible, data is processed in anonymized or de-identified form for internal analytics and service improvements.</p>
      ),
    },
    {
      id: "consent",
      icon: UserCheck,
      title: "5. Consent Framework and User Control",
      content: (
        <p>In compliance with the DPDP Act 2023, we process data based on informed and explicit consent. Users retain the right to withdraw consent at any time through account settings, though this may restrict access to features requiring health data for service delivery.</p>
      ),
    },
    {
      id: "telemedicine",
      icon: Smartphone,
      title: "6. Telemedicine Compliance and Medical Data Handling",
      content: (
        <p>Healthcare providers are required to be registered medical practitioners (MCI/NMC) and must adhere to professional and ethical standards, maintaining strict patient confidentiality and issuing prescriptions in compliance with applicable laws.</p>
      ),
    },
    {
      id: "sharing",
      icon: Share2,
      title: "7. Data Sharing, Disclosure, and Cross-Functional Access",
      content: (
        <div className="space-y-3 font-normal">
          <p>We maintain a strict policy against the sale of personal data. Sharing is limited to:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm italic">
            <li><strong>Healthcare Fulfillment:</strong> Sharing patient records with the selected doctor and prescriptions with the designated pharmacy.</li>
            <li><strong>Service Partners:</strong> Cloud infrastructure (AWS/GCP), API service providers for OTP/Email, and RBI-compliant payment gateways.</li>
            <li><strong>Legal Mandates:</strong> Disclosure required by law, regulatory authority, or court order to protect safety or security.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "security",
      icon: Lock,
      title: "8. Data Security and Risk Management",
      content: (
        <p>We implement AES-256 encryption, secure transmission protocols (SSL/TLS), firewalls, and audit mechanisms. Regular security assessments identify and mitigate risks. However, users are responsible for maintaining the confidentiality of their own login credentials.</p>
      ),
    },
    {
      id: "retention",
      icon: RefreshCw,
      title: "9. Data Retention, Archival, and Deletion",
      content: (
        <p>Data is retained only as long as necessary for the purpose of collection or as mandated by medico-legal requirements. Medical records may be archived for extended periods (typically 3-7 years) per IHC guidelines before being securely purged or anonymized.</p>
      ),
    },
    {
      id: "rights",
      icon: UserPlus,
      title: "10. Rights of Data Principals",
      content: (
        <div className="space-y-4">
          <p>Under the DPDP Act 2023, you have the following enforceable rights:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Right to access information",
              "Right to correction & update",
              "Right to request erasure",
              "Right to withdraw consent",
              "Right to nominate a proxy",
              "Right to grievance redressal"
            ].map(r => (
              <div key={r} className="flex items-center gap-2 text-sm p-2 bg-secondary/30 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> {r}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            * The <strong>Right to Nomination</strong> allows you to nominate another individual to exercise your rights in the event of death or incapacity.
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "11. Cookies and Automated Data Collection",
      content: "We use cookies to improve experience and analyze patterns. Disabling cookies may affect certain platform features like session persistence or personalized preferences.",
    },
    {
      id: "children",
      icon: ShieldCheck,
      title: "12. Children and Minor Data Protection",
      content: (
        <p>Doorspitals does not knowingly collect data from individuals under 18 without verifiable parental/guardian consent. We implement ID-based age verification for parents/guardians to authorize pediatric consultations for minors.</p>
      ),
    },
    {
      id: "thirdparty",
      icon: Globe,
      title: "13. Third-Party Platforms and External Links",
      content: "We are not responsible for the privacy practices of external entities linked from our platform. Please review their policies independently.",
    },
    {
      id: "updates",
      icon: Bell,
      title: "14. Policy Updates and Modifications",
      content: "We reserved the right to update this policy. Material changes will be notified via app notifications or registered email. Continued use constitutes acceptance.",
    },
    {
      id: "grievance",
      icon: Mail,
      title: "15. Grievance Officer and Contact Details",
      content: (
        <div className="p-4 bg-secondary/50 rounded-2xl border border-border">
          <p className="text-sm"><strong>Grievance Officer:</strong> Riffa Noor</p>
          <p className="text-sm"><strong>Email:</strong> doorspitals@gmail.com</p>
          <p className="text-sm mt-2"><strong>Address:</strong> WARD NO. 05, NISAR MEMBER WALI GALI, MUNDIYA PISTOR, Bazpur, Udham Singh Nagar, Uttarakhand, 262401</p>
          <p className="text-xs mt-4 text-muted-foreground italic">
            Grievances will be addressed within 30 days. If unresolved, users may escalate to the <strong>Data Protection Board of India</strong>.
          </p>
        </div>
      ),
    },
    {
      id: "acknowledgment",
      icon: UserCheck,
      title: "16. Explicit Consent and Acknowledgment",
      content: "By using the Doorspitals platform, you expressly acknowledge that you have read this Privacy Policy and provide informed consent to the collection, processing, storage, and disclosure of your personal and sensitive personal data.",
    },
    {
      id: "breach",
      icon: AlertTriangle,
      title: "17. Data Breach Notification Protocol",
      content: (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-4 rounded-xl">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            In the event of a Personal Data Breach, Doorspitals will notify the affected Data Principals and the <strong>Data Protection Board / CERT-In</strong> without undue delay and as prescribed by the DPDP Act and IT Act guidelines. This notification will include the nature of the breach, the data affected, and remedial actions taken.
          </p>
        </div>
      ),
    }
  ];

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>
      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #0f2d4a 100%)",
        padding: "80px 16px 64px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.08)", color: "#93c5fd",
            padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.12)", marginBottom: 24,
          }}>
            <ShieldCheck className="w-3 h-3" />
            Legal Compliance
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: "#fff", margin: "0 0 20px", lineHeight: 1.1 }}>
            Privacy Policy – <span style={{ color: "#60a5fa" }}>Doorspitals (India)</span>
          </h1>
          <p style={{ fontSize: 16, color: "#93c5fd", maxWidth: 700, margin: "0 auto" }}>
            Effective Date: April 7, 2026. This comprehensive policy details our commitment to protecting your health data in compliance with the Digital Personal Data Protection Act, 2023.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: 40 }}>
          
          {/* Side Nav / Outline */}
          <aside className="hidden md:block" style={{ position: "sticky", top: 100, height: "fit-content" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)", marginBottom: 16 }}>Table of Contents</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sections.map(s => (
                <a 
                  key={s.id} 
                  href={`#${s.id}`} 
                  style={{ fontSize: 13, textDecoration: "none", color: "var(--muted-foreground)", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#2563eb"}
                  onMouseLeave={e => e.target.style.color = "var(--muted-foreground)"}
                >
                  {s.title.split(".")[1].trim()}
                </a>
              ))}
            </div>
          </aside>

          {/* Main sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                Doorspitals (“Company”, “we”, “our”, or “us”) is committed to ensuring the privacy, confidentiality, and security of personal data and sensitive health-related information entrusted to us by users. This document sets out the manner in which we collect, use, process, store, and protect information when users access the Doorspitals mobile application and platform.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8 }}>
                By accessing, registering on, or using the Services, you confirm that you have read, understood, and agreed to this Privacy Policy, and you expressly consent to the processing of your data in accordance with the terms herein.
              </p>
            </div>

            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} style={{ scrollMarginTop: 100 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ width: 20, height: 20, color: "#2563eb" }} />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 700 }}>{section.title}</h2>
                  </div>
                  <div style={{ color: "var(--muted-foreground)", lineHeight: 1.7, fontSize: 15 }}>
                    {typeof section.content === "string" ? <p>{section.content}</p> : section.content}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── FOOTER NOTICE ── */}
      <section style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)", padding: "40px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)" }}>
          © 2026 GoHype Technologies Private Limited. All rights reserved. Registered in Bazpur, Uttarakhand.
        </p>
      </section>
    </div>
  );
}
