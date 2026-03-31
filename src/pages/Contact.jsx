// src/pages/Contact.jsx
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h1 className="text-4xl poppins-bold text-slate-900 dark:text-slate-100 mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-lg text-slate-600 dark:text-slate-300">
            We are here to help! If you have any questions, feedback, or need assistance, please feel free to reach out to us.
          </p>
          <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
            <Mail className="h-6 w-6 text-blue-600" />
            <span>support@doorspital.com</span>
          </div>
          <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
            <Phone className="h-6 w-6 text-blue-600" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
            <MapPin className="h-6 w-6 text-blue-600" />
            <span>123 Healthcare Ave, Tech District, City, Country</span>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-md border border-border bg-background outline-none focus:ring-2 focus:ring-blue-600" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded-md border border-border bg-background outline-none focus:ring-2 focus:ring-blue-600" />
            <textarea placeholder="Your Message" rows="4" className="w-full p-3 rounded-md border border-border bg-background outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md w-full transition-colors">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
