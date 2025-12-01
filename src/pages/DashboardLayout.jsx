// src/pages/DashboardLayout.jsx
// Dashboard layout with sidebar navigation for nested routes

import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { apiRequest } from "../lib/api.js";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const sidebarSections = [
    { id: "onboarding", path: "/dashboard/onboarding", label: "Onboarding" },
    { id: "profile", path: "/dashboard/profile", label: "Doctor Profile" },
    { id: "availability", path: "/dashboard/availability", label: "Doctor Calendar & Availability" },
    { id: "appointments", path: "/dashboard/appointments", label: "Appointment Management" },
    // { id: "follow-ups", path: "/dashboard/follow-ups", label: "Follow-Up System" },
    { id: "patients", path: "/dashboard/patients", label: "Patient CRM" },
    // { id: "notes", path: "/dashboard/notes", label: "Consultation Notes" }, // Moved to Patient CRM
    // { id: "prescriptions", path: "/dashboard/prescriptions", label: "Prescription Writing" }, // Moved to Patient CRM
    // { id: "financial", path: "/dashboard/financial", label: "Financial Tools" },
    // { id: "leads", path: "/dashboard/leads", label: "Leads & Referrals" },
    { id: "chat", path: "/dashboard/chat", label: "Chat & Video" },
    { id: "notifications", path: "/dashboard/notifications", label: "Notifications" },
];

const Sidebar = ({ userName }) => {
    const location = useLocation();
    const hour = new Date().getHours();
    let greeting = "Hello";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 17) greeting = "Good afternoon";
    else greeting = "Good evening";

    return (
        <aside className="hidden md:flex md:w-72 xl:w-80 flex-col gap-4 border-r border-slate-200 bg-slate-50 px-4 py-6">
            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_12px_rgba(37,99,235,1),0_0_20px_rgba(16,185,129,1)] animate-pulse">
                    Doorspital
                </div>
                <p className="mt-2 text-lg text-slate-500">
                    {greeting}, <span className="font-semibold text-slate-900">{userName ?? "Doctor"}</span>
                </p>
            </div>
            <div className="w-full border-t border-transparent bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 py-0.5"></div>
            <nav className="flex-1 space-y-3 overflow-y-auto px-1 pt-3">
                <div className="space-y-2">
                    {sidebarSections.map((section) => {
                        const isActive = location.pathname === section.path;
                        return (
                            <Link
                                key={section.id}
                                to={section.path}
                                className={`flex w-full items-center justify-between rounded-[5px] border px-4 py-3 text-sm font-medium leading-tight transition
                  ${isActive
                                        ? "border-blue-300 bg-white shadow-sm text-slate-900"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/40"
                                    }
                `}
                            >
                                <span className="flex-1 text-left text-base font-medium tracking-tight text-slate-900 leading-snug">
                                    {section.label}
                                </span>
                                <span
                                    className={`flex h-6 items-center rounded-[5px] px-3 py-1 text-[11px] font-semibold leading-none
                    ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}
                  `}
                                >
                                    {isActive ? "Active" : "View"}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
};

export default function DashboardLayout({ token, user }) {
    const [overview, setOverview] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError("");

        const load = async () => {
            try {
                const [overviewResp, profileResp] = await Promise.all([
                    apiRequest("/api/doctors/dashboard/overview", { token }),
                    apiRequest("/api/profile/me", { token }),
                ]);
                if (cancelled) return;

                setOverview(overviewResp?.data || overviewResp);
                setProfile(profileResp?.data || profileResp);
            } catch (fetchError) {
                if (!cancelled) {
                    console.error("Dashboard load error:", fetchError);
                    setError(fetchError.message || "Failed to load dashboard data");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [token]);

    const profileData = profile?.doctor || profile;
    const welcomeName = useMemo(() => {
        const name = profileData?.name || profileData?.fullName || profileData?.userName;
        return name || user?.userName || "Doctor";
    }, [profileData, user]);

    // Redirect /dashboard to /dashboard/onboarding
    if (location.pathname === "/dashboard") {
        return <Navigate to="/dashboard/onboarding" replace />;
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar userName={welcomeName} />
            <main className="flex-1 px-4 pb-16 pt-6 md:px-6 lg:px-10">
                {loading && (
                    <div className="rounded-[5px] border border-blue-100 bg-white/90 px-6 py-4 shadow-sm text-sm text-slate-600">
                        {error ? <span className="text-rose-500">{error}</span> : "Loading dashboard..."}
                    </div>
                )}
                <Outlet context={{ token, user, overview, profile, loading, error }} />
            </main>
        </div>
    );
}
