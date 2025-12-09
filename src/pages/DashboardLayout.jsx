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
    { id: "services", path: "/dashboard/services", label: "My Services" },
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
    const [verificationPending, setVerificationPending] = useState(false);
    const location = useLocation();

    const refreshDashboard = async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        setVerificationPending(false);

        try {
            const [overviewResp, profileResp] = await Promise.all([
                apiRequest("/api/doctors/dashboard/overview", { token, suppressErrorLog: true }),
                apiRequest("/api/profile/me", { token }),
            ]);

            setOverview(overviewResp?.data || overviewResp);
            setProfile(profileResp?.data || profileResp);
        } catch (fetchError) {
            console.error("Dashboard load error:", fetchError);
            // Check if this is the verification pending error
            if (fetchError.message && fetchError.message.toLowerCase().includes("verification is not approved")) {
                setVerificationPending(true);
                // Still try to get profile for name display
                try {
                    const profileResp = await apiRequest("/api/profile/me", { token });
                    setProfile(profileResp?.data || profileResp);
                } catch (e) {
                    // Ignore profile fetch error
                }
            } else {
                setError(fetchError.message || "Failed to load dashboard data");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshDashboard();
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

    // Verification Pending UI Component
    const VerificationPendingCard = () => (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
        >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">⏳</span>
                        <h2 className="text-xl font-bold text-white">Verification In Progress</h2>
                    </div>
                </div>
                <div className="px-6 py-8 text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                        <span className="text-5xl">📋</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                        Please Wait While We Verify Your Details
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto">
                        Our admin team is reviewing your submitted documents and credentials. 
                        This process typically takes up to <strong className="text-blue-600">48 hours</strong>.
                    </p>
                    <div className="bg-slate-50 rounded-xl border border-slate-200 px-6 py-4 mt-6">
                        <div className="flex items-center justify-center gap-3 text-blue-600">
                            <div className="animate-pulse flex gap-1">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            </div>
                            <span className="font-medium">Verification under review</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        You will receive an email notification once your verification is complete.
                        If you have any questions, please contact our support team.
                    </p>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar userName={welcomeName} />
            <main className="flex-1 px-4 pb-16 pt-6 md:px-6 lg:px-10">
                {loading && (
                    <div className="rounded-[5px] border border-blue-100 bg-white/90 px-6 py-4 shadow-sm text-sm text-slate-600">
                        Loading dashboard...
                    </div>
                )}
                {!loading && error && (
                    <div className="rounded-[5px] border border-rose-100 bg-rose-50 px-6 py-4 shadow-sm text-sm text-rose-600">
                        {error}
                    </div>
                )}
                {!loading && verificationPending ? (
                    <VerificationPendingCard />
                ) : (
                    <Outlet context={{ token, user, overview, profile, loading, error, verificationPending, refreshDashboard }} />
                )}
            </main>
        </div>
    );
}
