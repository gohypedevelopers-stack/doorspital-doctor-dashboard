// src/pages/PrivacyPolicy.jsx
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl text-slate-700 dark:text-slate-300 space-y-6">
      <h1 className="text-4xl poppins-bold text-slate-900 dark:text-slate-100 mb-8">Privacy Policy</h1>
      
      <p className="text-sm font-semibold">Last updated: October 2024</p>
      
      <p>
        Welcome to <strong>Doorspitals</strong>. This Privacy Policy outlines how we collect, use, protect, and handle your Personally Identifiable Information (PII) when you use our website, mobile application, and related services (collectively, the "Platform"). This policy is designed to comply with global privacy standards and serves as our official privacy disclosure for the Google Play Store and Apple App Store.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">1. Information We Collect</h2>
      <p>We collect different types of information to provide and improve our services for you:</p>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, and identity documents (such as government-issued IDs for verification).</li>
        <li><strong>Professional Information:</strong> For Doctors and Partners, we collect medical registration numbers, educational qualifications, clinic/hospital details, and face verification data.</li>
        <li><strong>Device Data:</strong> We may collect information about the device you use to access the app, including IP address, operating system, and browser type.</li>
        <li><strong>Usage Data:</strong> We collect data about how you interact with our Platform, including access times, app interactions, and diagnostic data.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">2. Device Permissions (Mobile App)</h2>
      <p>To provide core features, our app may request the following permissions:</p>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong>Camera &amp; Gallery:</strong> Required for secure onboarding, including uploading identity documents, medical certificates, and performing live face verification.</li>
        <li><strong>Location:</strong> Used to connect patients with nearby doctors and medical shops. Location data is never collected in the background unless explicitly authorized.</li>
        <li><strong>Storage:</strong> Required to save digital prescriptions and invoices directly to your device.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">3. How We Use Your Information</h2>
      <p>Your information is used to:</p>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>Facilitate account creation and authentication.</li>
        <li>Verify medical credentials to ensure platform safety.</li>
        <li>Provide seamless connections between Doctors, Patients, and Medical Shops.</li>
        <li>Send administrative information, security alerts, and operational updates.</li>
        <li>Improve our Platform's performance and user experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">4. Data Sharing and Disclosure</h2>
      <p>
        We DO NOT sell, trade, or rent your personal information to third parties. We may share information only in the following scenarios:
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong>With Service Providers:</strong> Trusted third-party vendors who assist us in operating our app (e.g., cloud hosting, SMS gateways) under strict non-disclosure agreements.</li>
        <li><strong>For Legal Reasons:</strong> If required by law, court order, or governmental regulation.</li>
        <li><strong>With Consent:</strong> Between Patients, Doctors, and Pharmacies strictly to fulfill prescription orders and medical services as requested by the user.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">5. Data Retention and Deletion</h2>
      <p>
        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. 
        You have the right to request the deletion of your account and personal data at any time. To request data deletion, you can navigate to your <strong>Account Settings &gt; Delete Account</strong> within the app, or email us directly at support@doorspitals.com. Upon request, we will securely erase your data within 30 days, excuding any data we are legally required to retain.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">6. Data Security</h2>
      <p>
        We implement industry-standard security measures including data encryption in transit (SSL/TLS) and at rest (AES-256). We maintain strict access controls to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">7. Children's Privacy</h2>
      <p>
        Our Partner platform is strictly for professional Doctors and Pharmacists aged 18 and above. Our patient-facing services do not knowingly collect personal information from children under the age of 13 without verifiable parental consent.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">8. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time to reflect changes in legal, regulatory, or operational requirements. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">9. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, your data, or our practices, please contact our Data Protection Officer at:
      </p>
      <div className="mt-4 p-4 bg-muted rounded-lg border border-border inline-block">
        <p><strong>Email:</strong> privacy@doorspitals.com</p>
        <p><strong>Support:</strong> support@doorspitals.com</p>
        <p><strong>Address:</strong> 123 Healthcare Ave, Tech District, City, Country</p>
      </div>
    </div>
  );
}
