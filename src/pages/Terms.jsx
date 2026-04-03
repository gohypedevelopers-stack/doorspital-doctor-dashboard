// src/pages/Terms.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Scale, Shield, AlertTriangle, FileText, Clock, Lock, Globe, Phone } from 'lucide-react';

const Section = ({ number, title, icon: Icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 bg-card hover:bg-muted transition-colors text-left gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            {Icon ? <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" /> : <span className="text-xs font-bold text-blue-600">{number}</span>}
          </span>
          <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">{number}. {title}</span>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 space-y-3 bg-card">
          {children}
        </div>
      )}
    </div>
  );
};

const InfoBox = ({ type = 'info', children }) => {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
    success: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
  };
  return (
    <div className={`border rounded-lg p-4 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
};

export default function Terms() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-blue-200 dark:border-blue-800">
          <Scale className="h-3.5 w-3.5" />
          Legal Document
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">Terms &amp; Conditions</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
          Please read these Terms and Conditions carefully before using the Doorspitals Partner Platform.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Last updated: April 2025</span>
          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Governed by Indian Law</span>
          <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> Version 2.0</span>
        </div>
      </div>

      {/* Intro box */}
      <InfoBox type="info">
        <strong>Important:</strong> By accessing or using the Doorspitals Partner Platform — including our website, mobile application (Android &amp; iOS), or any associated services — you agree to be legally bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.
      </InfoBox>

      <div className="mt-8 space-y-0">

        <Section number="1" title="Acceptance of Terms" icon={FileText} defaultOpen>
          <p>By registering on, accessing, or using the Doorspitals Partner Platform (referred to as "the Platform", "we", "us", or "Doorspitals"), you confirm that:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>You are at least 18 years of age and hold a valid medical license or pharmacy permit issued by the relevant government authority in India.</li>
            <li>You have the legal authority to enter into binding contracts in your jurisdiction.</li>
            <li>You have read, understood, and agreed to these Terms and Conditions, our Privacy Policy, and any other policies referenced herein.</li>
            <li>You are accessing this platform for legitimate professional purposes, and not on behalf of a competitor or for fraudulent reasons.</li>
          </ul>
          <InfoBox type="warning">
            Failure to meet eligibility criteria may result in immediate suspension or termination of your account without prior notice.
          </InfoBox>
        </Section>

        <Section number="2" title="Nature of Platform & Services" icon={Globe}>
          <p>Doorspitals is a digital health platform that enables:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Doctors</strong> to create verified profiles, set availability, consult patients online or in-person, issue digital prescriptions, and manage patient relationships.</li>
            <li><strong>Medical Shops / Pharmacies</strong> to list medicines, accept prescription-based orders, manage inventory, and process payments through integrated third-party gateways.</li>
            <li><strong>Patients</strong> to discover verified healthcare providers, book appointments, receive prescriptions, and order medicines for delivery.</li>
          </ul>
          <p className="mt-2">Doorspitals acts as a <strong>technology intermediary</strong> and does <strong>not</strong> provide medical advice, diagnosis, or treatment. All medical decisions remain the sole professional responsibility of the registered healthcare provider.</p>
        </Section>

        <Section number="3" title="User Accounts & Professional Conduct">
          <p>All users who join as Doctors or Medical Shops must:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Provide accurate, truthful, and complete information during registration and at all times thereafter.</li>
            <li>Hold valid, active medical or pharmaceutical licenses as required by Indian law (e.g., MCI/NMC registration, state pharmacy board permits).</li>
            <li>Maintain the security and confidentiality of your account credentials. You are responsible for any actions taken through your account.</li>
            <li>Not impersonate any other person or provide false qualifications, credentials, or identity information.</li>
            <li>Not use the Platform for any unlawful purpose, including the sale of controlled substances without valid prescriptions.</li>
            <li>Maintain the highest standards of professional ethics and patient care in all interactions facilitated through the Platform.</li>
          </ul>
          <InfoBox type="warning">
            Any submission of forged documents, false qualifications, or fraudulent identity information will result in immediate account termination, and may be reported to the relevant regulatory authorities and law enforcement agencies.
          </InfoBox>
        </Section>

        <Section number="4" title="KYC Verification & Onboarding">
          <p>To protect patients and maintain trust, Doorspitals requires all Partners to complete a mandatory Know Your Customer (KYC) verification process, which includes:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Submission of a government-issued photo ID (Aadhaar Card, Passport, Driving License, or Voter ID).</li>
            <li>Submission of medical registration certificate / pharmacy license from the appropriate regulatory body.</li>
            <li>Submission of educational qualifications (MBBS, MD, etc.) for doctors.</li>
            <li>Live face verification matched against submitted ID documents.</li>
          </ul>
          <p className="mt-2">KYC data is processed under our Privacy Policy and stored securely. KYC verification is a prerequisite for any service activation or payment processing on the Platform.</p>
        </Section>

        <Section number="5" title="Platform Fees, Payments & Razorpay">
          <p>Financial transactions on the Doorspitals Partner Platform are governed as follows:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Onboarding Fee:</strong> Doctor and pharmacy onboarding is currently <strong>free of charge</strong>. Doorspitals reserves the right to introduce subscription plans with advance notice.</li>
            <li><strong>Transaction Fees:</strong> A platform service fee may apply to consultation fees and prescription order revenues processed through the Platform. The applicable percentage will be clearly disclosed in your Dashboard before any charge is applied.</li>
            <li><strong>Payment Gateway:</strong> All payment transactions are processed via <strong>Razorpay</strong>, a licensed Payment Aggregator regulated by the Reserve Bank of India (RBI). By using our payment features, you also agree to <a href="https://razorpay.com/terms/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Razorpay's Terms of Service</a>.</li>
            <li><strong>Payouts:</strong> Earnings are settled to your registered bank account as per the payout schedule displayed in your Dashboard (typically T+2 to T+7 business days).</li>
            <li><strong>GST &amp; Taxes:</strong> You are responsible for compliance with all applicable tax obligations, including GST, on services rendered through the Platform.</li>
          </ul>
          <InfoBox type="success">
            All transaction fees, deductions, and payout amounts are transparently shown in your Financial Dashboard before any deduction is made.
          </InfoBox>
        </Section>

        <Section number="6" title="Cancellations & Refunds">
          <p>For detailed cancellation and refund terms, please refer to our dedicated <a href="/refund-policy" className="text-blue-600 underline">Refund &amp; Cancellation Policy</a>. In summary:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Appointment fees may be refunded if a doctor cancels or fails to attend within the agreed window.</li>
            <li>Medicine orders may be returned or refunded as per the pharmacy's stated policy and applicable drug regulations.</li>
            <li>Platform subscription fees (if applicable in the future) are non-refundable after the billing cycle has commenced.</li>
          </ul>
        </Section>

        <Section number="7" title="Intellectual Property">
          <p>All content, software, branding, and materials on the Doorspitals Platform — including the name "Doorspitals", logos, icons, interface design, databases, and underlying code — are the exclusive intellectual property of <strong>GoHype Technologies Private Limited</strong>, unless otherwise specified.</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>You are granted a limited, non-exclusive, non-transferable, revocable license to use the Platform for its intended purpose.</li>
            <li>You may not reproduce, distribute, modify, create derivative works, publicly display, or commercially exploit any part of the Platform without express written permission.</li>
            <li>Any content you submit to the Platform (e.g. profile photos, prescription data) grants Doorspitals a worldwide, royalty-free license to use such content strictly for improving and operating the Platform services.</li>
          </ul>
        </Section>

        <Section number="8" title="Data Privacy & Security">
          <p>Your privacy is of utmost importance to us. Our comprehensive <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a> governs how we collect, process, and protect your data. Key principles:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>All data is encrypted in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Patient health data (PHR) is handled in compliance with applicable Indian health data regulations.</li>
            <li>We do not sell your personal data to third-party advertisers under any circumstances.</li>
            <li>KYC and identity documents are stored with access restricted to authorized compliance personnel only.</li>
          </ul>
        </Section>

        <Section number="9" title="Prohibited Activities" icon={AlertTriangle}>
          <p>The following activities are strictly prohibited on the Platform:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Issuing prescriptions without proper clinical consultation, or for non-medical reasons.</li>
            <li>Selling medicines or drugs that are banned, Schedule X, or otherwise restricted under Indian law without valid authorization.</li>
            <li>Using the Platform to facilitate money laundering, tax evasion, or any other financial crime.</li>
            <li>Attempting to bypass, hack, or exploit any security measure on the Platform.</li>
            <li>Uploading malicious code, viruses, or disruptive content.</li>
            <li>Harassing, threatening, or abusing other users, patients, or Doorspitals staff.</li>
            <li>Creating multiple accounts to circumvent bans or verification requirements.</li>
            <li>Representing services or products that you are not authorized or licensed to provide.</li>
          </ul>
          <InfoBox type="warning">
            Violation of prohibited activities may result in immediate account suspension, legal action, and reporting to relevant regulatory authorities including the Medical Council, State pharmacy boards, and cybercrime cells.
          </InfoBox>
        </Section>

        <Section number="10" title="Limitation of Liability">
          <p>To the maximum extent permitted by applicable law:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Doorspitals shall not be held liable for any medical outcomes, patient harm, or professional negligence arising from services rendered by registered Doctors or Medical Shops.</li>
            <li>Doorspitals shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Platform.</li>
            <li>Our total cumulative liability to you for any claim arising under these Terms shall not exceed the amount of fees you paid to Doorspitals in the three (3) months preceding the claim.</li>
            <li>We do not guarantee uninterrupted, error-free service and shall not be liable for any downtime, data loss, or service disruptions caused by technical errors, cyberattacks, or force majeure events.</li>
          </ul>
        </Section>

        <Section number="11" title="Indemnification">
          <p>You agree to indemnify, defend, and hold harmless Doorspitals, its directors, officers, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising from:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Your breach of these Terms and Conditions.</li>
            <li>Your violation of any applicable law, regulation, or third-party rights.</li>
            <li>Any content you submit, post, or transmit through the Platform.</li>
            <li>Any professional malpractice, negligence, or misconduct in services provided to patients.</li>
          </ul>
        </Section>

        <Section number="12" title="Termination & Suspension">
          <p>Either party may terminate this agreement at any time. Doorspitals reserves the right to suspend or terminate your account immediately, with or without notice, for:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Breach of these Terms &amp; Conditions or any associated policies.</li>
            <li>Revocation or expiry of your professional license.</li>
            <li>Engaging in prohibited activities or fraudulent behavior.</li>
            <li>Non-payment of applicable platform fees (if any).</li>
            <li>Any activity deemed by Doorspitals, at its sole discretion, to be harmful to users, patients, or the Platform.</li>
          </ul>
          <p className="mt-2">Upon termination, your access to the Platform will be revoked. Earned payouts due to you will be disbursed as per the standard payout schedule, minus any outstanding dues.</p>
        </Section>

        <Section number="13" title="Modifications to Terms">
          <p>Doorspitals reserves the right to update or modify these Terms and Conditions at any time. You will be notified of significant changes via:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>An in-app notification in your Dashboard.</li>
            <li>An email to your registered email address.</li>
            <li>An updated "Last Updated" date on this page.</li>
          </ul>
          <p className="mt-2">Your continued use of the Platform after the effective date of any modification constitutes your acceptance of the revised Terms. It is your responsibility to review these Terms periodically.</p>
        </Section>

        <Section number="14" title="Governing Law & Dispute Resolution" icon={Scale}>
          <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>First attempted to be resolved through good-faith negotiations between the parties.</li>
            <li>If unresolved within 30 days, submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, with a single arbitrator mutually agreed upon.</li>
            <li>Subject to the exclusive jurisdiction of courts in <strong>Hyderabad, Telangana, India</strong>.</li>
          </ul>
        </Section>

        <Section number="15" title="Grievance Redressal" icon={Phone}>
          <p>In accordance with the Information Technology Act, 2000 and the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Doorspitals has designated a Grievance Officer:</p>
          <div className="bg-muted rounded-lg p-4 mt-3 border border-border space-y-1">
            <p><strong>Name:</strong> Grievance Officer, Doorspitals</p>
            <p><strong>Company:</strong> GoHype Technologies Private Limited</p>
            <p><strong>Email:</strong> <a href="mailto:grievance@doorspitals.com" className="text-blue-600 underline">grievance@doorspitals.com</a></p>
            <p><strong>Support Email:</strong> <a href="mailto:support@doorspitals.com" className="text-blue-600 underline">support@doorspitals.com</a></p>
            <p><strong>Response Time:</strong> Within 48 hours of receipt</p>
            <p><strong>Resolution Time:</strong> Within 30 days</p>
          </div>
        </Section>

      </div>

      {/* Footer CTA */}
      <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Questions about our Terms?</h2>
        <p className="text-sm text-blue-100 mb-4">Our support team is here to help clarify any points in this document.</p>
        <a href="/contact" className="inline-block bg-white text-blue-700 font-semibold px-6 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors">
          Contact Support
        </a>
      </div>
    </div>
  );
}
