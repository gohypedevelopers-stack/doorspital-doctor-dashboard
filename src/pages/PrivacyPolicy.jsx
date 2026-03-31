// src/pages/PrivacyPolicy.jsx
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl text-slate-700 dark:text-slate-300 space-y-6">
      <h1 className="text-4xl poppins-bold text-slate-900 dark:text-slate-100 mb-8">Privacy Policy</h1>
      
      <p>Last updated: October 2024</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">1. Information We Collect</h2>
      <p>
        When you use Doorspital Partner Network, we may collect personal information such as your name, 
        email address, phone number, professional qualifications, and medical registry details to verify 
        your identity and suitability for the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">2. How We Use Information</h2>
      <p>
        We use the information we collect to operate, maintain, and provide you with seamless connecting 
        features. E.g. allowing doctors to connect securely with patients and pharmacies. We do not sell 
        your personal information to third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">3. Data Security</h2>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information 
        when you enter, submit, or access your personal information. All sensitive credential information 
        is transmitted via Secure Socket Layer (SSL) technology and encrypted.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">4. Contacting Us</h2>
      <p>
        If there are any questions regarding this privacy policy, you may contact us via our Help Center 
        or Support email.
      </p>
    </div>
  );
}
