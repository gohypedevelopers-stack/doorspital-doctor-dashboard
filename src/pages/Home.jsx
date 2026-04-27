import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  HeartHandshake,
  HeartPulse,
  HousePlus,
  MapPin,
  MessageCircleMore,
  Microscope,
  Pill,
  PlayCircle,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Stethoscope,
} from "lucide-react";

const APK_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1ebrKLOt4hsy23W1XPWfV23zSGVxzNnYm";
const SUPPORT_TEL = "tel:+917500958439";

const services = [
  {
    title: "Elder Doctor Visits",
    description: "Book verified doctors for senior consultations, follow-up care, and family support.",
    icon: Stethoscope,
  },
  {
    title: "Doorstep Elder Care",
    description: "Nursing, wound dressing, vaccination, physiotherapy, and home support for seniors.",
    icon: HousePlus,
  },
  {
    title: "Pharmacy Delivery",
    description: "Upload prescriptions and get medicines from nearby medical stores.",
    icon: Pill,
  },
  {
    title: "Clinic Discovery",
    description: "Find nearby specialists, compare departments, and choose trusted care.",
    icon: MapPin,
  },
];

const appHighlights = [
  "Search doctors, medicines, and elder care services from one place",
  "Book home visits and senior support directly from the app",
  "Access support, articles, clinic listings, and pharmacy orders",
  "Built for families managing care, medicines, and follow-up together",
];

const trustPoints = [
  "Trusted elderly care at home",
  "Simple family-first booking flow",
  "Doorstep care and medicine ordering",
  "Support for clinic, home, and pharmacy journeys",
];

const journeySteps = [
  {
    title: "Discover care",
    description: "Browse departments, doctors, home services, and nearby pharmacies.",
  },
  {
    title: "Book or request",
    description: "Choose the service you need, book a visit, or submit a service request.",
  },
  {
    title: "Get support faster",
    description: "Track appointments, prescriptions, and care information from your phone.",
  },
];

export default function Home({ onDoctorJoinClick, onPharmacyJoinClick }) {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_22%,#f1f7ff_100%)] text-slate-900 dark:bg-[linear-gradient(180deg,#020617_0%,#07111d_25%,#08121b_100%)] dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute left-[-8rem] top-[-5rem] h-72 w-72 rounded-full bg-blue-200/45 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute right-[-6rem] top-28 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/20" />
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm backdrop-blur dark:border-blue-900 dark:bg-slate-900/75 dark:text-blue-200">
              <HeartPulse className="h-4 w-4" />
              Doorspitals healthcare app
            </div>
            <h1 className="mt-6 max-w-2xl text-[3.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 dark:text-slate-100 sm:text-[4.3rem]">
              Elder care and doorstep healthcare families can trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Doorspitals is built to make elderly care easier with doctor visits,
              home healthcare, pharmacy ordering, clinic discovery, and patient support
              in one mobile-first experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                <Download className="h-4 w-4" />
                Download APK
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Explore services
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SUPPORT_TEL}
                className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-[linear-gradient(135deg,#eff6ff,#dbeafe)] px-6 py-3 text-sm font-semibold text-sky-800 shadow-[0_14px_30px_-20px_rgba(37,99,235,0.75)] transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-[linear-gradient(135deg,#dbeafe,#bfdbfe)] dark:border-sky-900 dark:bg-[linear-gradient(135deg,rgba(30,64,175,0.82),rgba(8,47,73,0.92))] dark:text-sky-100 dark:hover:bg-[linear-gradient(135deg,rgba(29,78,216,0.94),rgba(14,116,144,0.88))]"
              >
                <PhoneCall className="h-4 w-4" />
                Call Now
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200"
                >
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  {point}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-[36px] border border-blue-100 bg-[linear-gradient(160deg,#0f172a_0%,#133b73_42%,#2563eb_100%)] p-6 text-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.55)] dark:border-slate-800">
              <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center justify-between text-sm text-blue-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    <Smartphone className="h-4 w-4" />
                    Mobile first
                  </span>
                  <span>Eldercare focused</span>
                </div>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-3xl bg-white px-5 py-5 text-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                          Elder care at home
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold">
                          Doctor visits, medicines, and support for seniors at home
                        </h2>
                      </div>
                      <HeartHandshake className="h-9 w-9 text-blue-700" />
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-blue-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                          Family help
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          Book care for parents and elderly family members in minutes.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-sky-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                          Support
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          Quick access to home visits, guidance, and care coordination.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
                      <p className="text-sm font-semibold text-blue-100">Most needed services</p>
                      <ul className="mt-4 space-y-3 text-sm text-white/85">
                        <li className="flex items-start gap-2">
                          <Stethoscope className="mt-0.5 h-4 w-4 text-blue-200" />
                          Elder doctor consultations at home
                        </li>
                        <li className="flex items-start gap-2">
                          <Pill className="mt-0.5 h-4 w-4 text-blue-200" />
                          Medicines from nearby pharmacies
                        </li>
                        <li className="flex items-start gap-2">
                          <HousePlus className="mt-0.5 h-4 w-4 text-blue-200" />
                          Nursing and in-home medical care
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
                      <p className="text-sm font-semibold text-blue-100">Care support inside app</p>
                      <div className="mt-4 grid gap-3">
                        <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/90">
                          Elder care guidance
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/90">
                          Follow-up coordination
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/90">
                          Service request flow
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-400">
              Core services
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
              Built around how families access elder care
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            The platform already supports multiple care journeys. This homepage now puts
            the elder care mission first while still covering doctor, pharmacy, clinic,
            and home support services.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.28)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_50px_-24px_rgba(37,99,235,0.22)] dark:border-slate-800 dark:bg-slate-900/95"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#dbeafe,#e0f2fe)] text-slate-900 dark:bg-[linear-gradient(135deg,#172554,#0c4a6e)] dark:text-blue-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-medium">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="rounded-[32px] bg-[linear-gradient(145deg,#0b1327,#0f5a74)] p-8 text-white"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
              Patient journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              One app that supports the full care cycle
            </h2>
            <div className="mt-8 space-y-5">
              {journeySteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-blue-100">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{step.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-white/75">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="rounded-[32px] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/95"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-400">
              What users can do
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Health Articles",
                  text: "Read helpful content directly inside the app.",
                  icon: Microscope,
                },
                {
                  title: "Help & Support",
                  text: "Reach support flows without leaving the product.",
                  icon: MessageCircleMore,
                },
                {
                  title: "Nearby Clinics",
                  text: "Browse clinic and speciality options with less friction.",
                  icon: MapPin,
                },
                {
                  title: "Medicine Orders",
                  text: "Move from prescription to pharmacy fulfilment faster.",
                  icon: Pill,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800/70"
                  >
                    <Icon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#eef4ff_45%,#e0f2fe_100%)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0b1220_0%,#101a31_45%,#0d1828_100%)]"
        >
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
                Better APK download section
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-slate-100">
                Download the Doorspitals Android app
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Install the APK to access patient services, pharmacy ordering,
                healthcare support, and booking flows in a single mobile experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={APK_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  <Download className="h-4 w-4" />
                  Download APK now
                </a>
                <a
                  href="/partner"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Partner platform
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={SUPPORT_TEL}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call now
                </a>
              </div>
            </div>

            <div className="rounded-[30px] bg-slate-950 p-6 text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.65)] dark:bg-slate-950/90">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
                Included in the app
              </p>
              <div className="mt-5 space-y-3">
                {appHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] bg-[linear-gradient(135deg,#102a5c_0%,#2563eb_100%)] px-6 py-10 text-white sm:px-8 lg:px-12 dark:bg-[linear-gradient(135deg,#102047_0%,#1d4ed8_100%)]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                For providers
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                Doctors and pharmacies still have a dedicated partner flow
              </h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                The previous homepage has been shifted into a separate partner page so both
                audiences are now covered properly.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onDoctorJoinClick}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Join as Doctor
              </button>
              <button
                type="button"
                onClick={onPharmacyJoinClick}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white"
              >
                Join as Pharmacy
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
