// src/pages/HelpCenter.jsx
import React from 'react';
import { Search } from 'lucide-react';

export default function HelpCenter() {
  return (
    <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl poppins-bold text-slate-900 dark:text-slate-100 mb-4">Help Center</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">How can we help you today?</p>
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for articles, guides..." 
            className="w-full py-4 pl-12 pr-4 rounded-full border border-border shadow-sm outline-none focus:ring-2 focus:ring-blue-500 bg-card"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { title: "Getting Started", desc: "Learn how to join and set up your profile." },
          { title: "Manage Appointments", desc: "Tips on handling multiple patient bookings." },
          { title: "Prescriptions", desc: "How to safely issue digital prescriptions." },
          { title: "Billing & Payments", desc: "Understanding how and when you get paid." },
        ].map((item, idx) => (
          <div key={idx} className="bg-card p-6 rounded-2xl border border-border hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
