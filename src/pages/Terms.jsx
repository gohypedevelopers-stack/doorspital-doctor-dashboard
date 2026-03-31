// src/pages/Terms.jsx
import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl text-slate-700 dark:text-slate-300 space-y-6">
      <h1 className="text-4xl poppins-bold text-slate-900 dark:text-slate-100 mb-8">Terms &amp; Conditions</h1>
      
      <p>Last updated: October 2024</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h2>
      <p>
        By accessing the Doorspitals Partner Platform, you agree to be bound by these Terms and Conditions. 
        If you disagree with any part of these terms and conditions, do not use our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">2. Professional Conduct</h2>
      <p>
        Doctors and medical shops operating in our ecosystem are expected to act in the best interests 
        of patients at all times. Any violation of medical ethics or false presentation of identity 
        may result in immediate termination.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">3. Platform Fees</h2>
      <p>
        Currently, our onboarding is completely free and without any hidden charges. Any applicable platform 
        transaction fees on medical services will be clearly displayed before you incur any cost.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">4. Modifications</h2>
      <p>
        Doorspitals reserves the right, at its sole discretion, to modify or replace these terms at any time. 
        It is your responsibility to review these terms periodically for changes.
      </p>
    </div>
  );
}
