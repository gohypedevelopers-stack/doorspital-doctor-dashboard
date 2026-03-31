// src/pages/CookiePolicy.jsx
import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl text-slate-700 dark:text-slate-300 space-y-6">
      <h1 className="text-4xl poppins-bold text-slate-900 dark:text-slate-100 mb-8">Cookie Policy</h1>

      <p>Last updated: October 2024</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">What Are Cookies?</h2>
      <p>
        A cookie is a small piece of text downloaded to your device when you visit a website. 
        Our web application utilizes basic cookies alongside modern local storage APIs to persist 
        your secure session and application preferences (such as your chosen Light/Dark theme).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">How We Use Cookies</h2>
      <p>We use essential cookies for the following purposes:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Authentication:</strong> Keeping you logged in as a verified Doctor or Medical Shop securely across sessions.</li>
        <li><strong>Preferences:</strong> Storing UI choices like light mode/dark mode and language preferences.</li>
        <li><strong>Security:</strong> Identifying and preventing fraudulent activities across the network.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">Managing Your Cookies</h2>
      <p>
        You can choose to delete or disable cookies within your browser settings. However, doing so 
        will disable the ability to log in or maintain an active session on the Doorspitals Partner dashboard.
      </p>
    </div>
  );
}
