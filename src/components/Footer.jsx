// src/components/Footer.jsx
// Footer styled to match the provided design (Poppins) + animation from bottom to top.

import React from "react";
/* eslint-disable-next-line no-unused-vars */
import { motion } from "framer-motion";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import icon from "../assets/icon.png";

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-border bg-card mt-12 mb-1 md:mb-1"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full px-4 md:px-2 py-10">
        <div className="grid grid-cols-1 gap-10 md:gap-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1.2fr] md:items-start">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={icon}
                className="h-9 w-9 object-contain"
                alt="Doorspital logo"
              />
              <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Doorspital Partner
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Connecting Doctors, Medical Shops &amp; Patients.
            </p>
            <p className="text-xs text-slate-400">
              <span className="text-base font-bold">©</span> 2024 Doorspital.
              All rights reserved.
            </p>
            <div className="mt-2 flex items-center gap-3">
              {[AtSign, Mail, MessageCircle].map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              About
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>About Us</li>
              <li>Benefits</li>
              <li>Testimonials</li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Contact</li>
              <li>Help Center</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Privacy Policy</li>
              <li>Terms &amp; Conditions</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Stay Updated
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Get the latest news and updates from our network.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                name="newsletterEmail"
                placeholder="Enter your email"
                className="h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-slate-900 dark:text-slate-200 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 sm:w-72"
              />
              <button className="h-10 rounded-md bg-gradient-to-r from-blue-600 to-emerald-500 px-5 text-sm font-semibold text-white hover:opacity-90">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
