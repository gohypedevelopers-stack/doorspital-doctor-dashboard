// src/pages/CookiePolicy.jsx
import React, { useState } from 'react';
import { Cookie, Shield, Settings, BarChart2, ChevronDown, ChevronUp, AlertTriangle, Clock, Globe } from 'lucide-react';

const CookieCategory = ({ name, type, description, cookies, badgeColor }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted transition-colors text-left gap-3"
      >
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>{type}</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {open ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-card space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
          {cookies && cookies.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">Cookie Name</th>
                    <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">Purpose</th>
                    <th className="text-left px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((c, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-3 py-2 font-mono text-blue-600 dark:text-blue-400">{c.name}</td>
                      <td className="px-3 py-2 text-slate-600 dark:text-slate-300">{c.purpose}</td>
                      <td className="px-3 py-2 text-slate-500">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-emerald-200 dark:border-emerald-800">
          <Cookie className="h-3.5 w-3.5" />
          Cookie Policy
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">Cookie Policy</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
          This Cookie Policy explains how Doorspitals uses cookies and similar tracking technologies when you visit our platform.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Last updated: April 2025</span>
          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Applies to web and mobile</span>
        </div>
      </div>

      {/* What are cookies */}
      <div className="prose-sm text-slate-600 dark:text-slate-300 space-y-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <Cookie className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website or use a web application. They are widely used to make websites and applications work efficiently, remember your preferences, and provide important information to website owners.
              </p>
              <p className="mt-2">
                In addition to cookies, our Platform may also use <strong>Local Storage</strong> and <strong>Session Storage</strong> — modern browser-based storage APIs that function similarly to cookies but remain on your device without an expiry transmitted to servers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie types overview */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Types of Cookies We Use</h2>
      <div className="space-y-3 mb-8">

        <CookieCategory
          name="Strictly Necessary Cookies"
          type="Required"
          badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
          description="These cookies are essential for the Platform to function. They enable core functionalities like user authentication, session management, and security. You cannot opt out of these cookies as the Platform cannot function without them."
          cookies={[
            { name: "authToken", purpose: "Authenticates your login session as a verified Doctor or Pharmacy partner", duration: "Session / 30 days" },
            { name: "pharmacySession", purpose: "Maintains your Pharmacy portal session after login", duration: "Session" },
            { name: "csrf_token", purpose: "Prevents Cross-Site Request Forgery attacks on form submissions", duration: "Session" },
            { name: "__secure-session", purpose: "Secure session identifier to associate requests with your account", duration: "24 hours" },
          ]}
        />

        <CookieCategory
          name="Preference & Functionality Cookies"
          type="Functional"
          badgeColor="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
          description="These cookies allow our Platform to remember choices you make (such as your preferred language or light/dark theme) and provide enhanced, more personalized features."
          cookies={[
            { name: "theme_preference", purpose: "Remembers your chosen UI theme (Light / Dark Mode)", duration: "1 year" },
            { name: "lang_pref", purpose: "Stores your selected language preference (e.g., English, Hindi)", duration: "1 year" },
            { name: "sidebar_state", purpose: "Remembers your dashboard sidebar collapsed or expanded state", duration: "90 days" },
            { name: "notification_prefs", purpose: "Stores your notification preferences and settings", duration: "1 year" },
          ]}
        />

        <CookieCategory
          name="Analytics & Performance Cookies"
          type="Analytics"
          badgeColor="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
          description="These cookies collect information about how you use our Platform, which pages are most visited, and any errors encountered. All data is aggregated and anonymized, and does not directly identify you. This helps us improve the Platform's performance and user experience."
          cookies={[
            { name: "_ga", purpose: "Google Analytics: Distinguishes unique users and tracks session behaviour", duration: "2 years" },
            { name: "_gid", purpose: "Google Analytics: Distinguishes users within a 24-hour window", duration: "24 hours" },
            { name: "_gat_UA-*", purpose: "Google Analytics: Rate limiting to throttle data send requests", duration: "1 minute" },
            { name: "doorspitals_perf", purpose: "Internal performance monitoring — tracks load times and error rates", duration: "7 days" },
          ]}
        />

        <CookieCategory
          name="Payment & Security Cookies"
          type="Payment"
          badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
          description="These cookies are set by our payment gateway partner, Razorpay, to securely process medical consultation fees and prescription order payments. They help prevent fraud and maintain transaction integrity in accordance with PCI-DSS standards."
          cookies={[
            { name: "rzp_*", purpose: "Razorpay: Tracks payment session to ensure secure and accurate payment processing", duration: "Session" },
            { name: "rzp_device_id", purpose: "Razorpay: Device fingerprinting for fraud detection and prevention", duration: "1 year" },
          ]}
        />

      </div>

      {/* How we use cookies */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">How We Use Cookie Data</h2>
        </div>
        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
            <span><strong>Authentication &amp; Security:</strong> Verifying your identity as a logged-in Doctor or Pharmacy partner and protecting your account from unauthorized access.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
            <span><strong>User Experience:</strong> Remembering your settings (theme, language, sidebar state) so you don't need to reconfigure on every visit.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
            <span><strong>Platform Improvement:</strong> Analyzing aggregated usage patterns to identify areas for improvement and fix performance issues.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
            <span><strong>Payment Security:</strong> Enabling secure, PCI-DSS compliant payment processing through Razorpay for consultation fees and prescription orders.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
            <span><strong>Fraud Prevention:</strong> Detecting and preventing fraudulent activities such as account takeover attempts and suspicious payment patterns.</span>
          </li>
        </ul>
      </div>

      {/* Third party cookies */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Globe className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Third-Party Cookies</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Our Platform may include content or functionality from the following trusted third-party services, each of which may set their own cookies:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300">Service</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300">Purpose</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300">Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: "Google Analytics", purpose: "Website analytics and performance monitoring", url: "https://policies.google.com/privacy" },
                { service: "Razorpay", purpose: "Payment processing and fraud prevention", url: "https://razorpay.com/privacy/" },
                { service: "Firebase (Google)", purpose: "Push notifications and real-time data", url: "https://firebase.google.com/support/privacy" },
              ].map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.service}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.purpose}</td>
                  <td className="px-4 py-3">
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">{row.url.replace("https://", "")}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Managing cookies */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Settings className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Managing Your Cookie Preferences</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
          You have the right to control non-essential cookies. Here's how you can manage them:
        </p>
        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their Settings or Preferences menu. You can set your browser to refuse all or some cookies, delete existing cookies, or warn you before a cookie is stored.</li>
          <li><strong>Google Analytics Opt-Out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Analytics Opt-Out Browser Add-on</a> to prevent analytics data collection.</li>
          <li><strong>Mobile App:</strong> On Android or iOS, you can reset your Advertising ID in your device's Privacy settings to limit tracking.</li>
        </ul>
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 inline mr-1" />
          <strong>Please note:</strong> Disabling strictly necessary cookies (such as authentication tokens) will prevent you from logging in and using the Doorspitals Partner Dashboard. We recommend keeping essential cookies enabled.
        </div>
      </div>

      {/* Contact */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Questions About Cookies?</h2>
        <p className="text-sm text-emerald-100 mb-4">Contact our Privacy team for any questions about our cookie practices.</p>
        <a href="mailto:privacy@doorspitals.com" className="inline-block bg-white text-emerald-700 font-semibold px-6 py-2 rounded-full text-sm hover:bg-emerald-50 transition-colors">
          privacy@doorspitals.com
        </a>
      </div>
    </div>
  );
}
