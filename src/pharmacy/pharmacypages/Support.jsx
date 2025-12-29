import React from "react";
import PharmacyLayout, { PharmacyMenuToggle } from "../components/PharmacyLayout.jsx";
import bellicon from "../assets/bellicon.png";
import PharmacyProfileBadge from "../components/PharmacyProfileBadge.jsx";

const supportChannels = [
  { title: "Contact", info: "+91 79856 12345", description: "Call us 9am-9pm IST" },
  { title: "Help Center", info: "help@doorspital.com", description: "We usually respond within 4 hours" },
  { title: "WhatsApp", info: "+91 99856 54321", description: "Send us a WhatsApp to share screenshots" },
];

export default function Support() {
  return (
    <PharmacyLayout
      mainClassName="flex-1 overflow-y-auto bg-[#f4f8f7] dark:bg-[#1E293B] px-4 sm:px-6 lg:px-10 py-8"
      header={({ openDrawer }) => (
        <header className="flex items-center justify-between border-b border-border bg-[#020817] px-4 sm:px-6 lg:px-10 py-1">
          <div className="flex items-center gap-3">
            <PharmacyMenuToggle onClick={openDrawer} />
            <h1 className="text-[20px] font-semibold text-slate-100 dark:text-slate-100">
              Support
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <img src={bellicon} alt="Notifications" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe9d6]">
              <PharmacyProfileBadge wrapperClassName="h-full w-full overflow-visible" imgClassName="rounded-xl" />
            </div>
          </div>
        </header>
      )}
    >
      <div className="max-w-3xl rounded-3xl bg-card p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Support</h1>
        <p className="mt-2 text-sm text-slate-500">
          We are here to help you manage your pharmacy smoothly.
        </p>

        <div className="mt-6 space-y-4">
          {supportChannels.map((channel) => (
            <div
              key={channel.title}
              className="rounded-2xl border border-border bg-muted px-4 py-3"
            >
              <div className="flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-slate-100">
                <span>{channel.title}</span>
                <span>{channel.info}</span>
              </div>
              <p className="text-xs text-slate-500">{channel.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-700">
            Open support chat
          </button>
        </div>
      </div>
    </PharmacyLayout>
  );
}


