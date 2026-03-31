// src/pages/Faqs.jsx
import React from 'react';

export default function Faqs() {
  const faqs = [
    {
      q: "How do I register as a partner?",
      a: "Click on the 'Register Free' button at the top right of the navigation bar and follow the simple 3-step verification process to become a partner."
    },
    {
      q: "Are there any hidden charges?",
      a: "No! Using the Doorspitals Partner network has transparent pricing with zero hidden charges for onboarding."
    },
    {
      q: "How can I connect with medical shops?",
      a: "Our app automatically bridges your digital prescriptions with trusted nearby medical shops in our network, ensuring quick patient access."
    },
    {
      q: "When do I get my payouts?",
      a: "Payouts are securely processed and reflected in your Dashboard. You can choose weekly or monthly payout cycles."
    }
  ];

  return (
    <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl">
      <h1 className="text-4xl poppins-bold text-slate-900 dark:text-slate-100 mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{faq.q}</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
