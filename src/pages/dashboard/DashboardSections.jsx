// src/pages/dashboard/DashboardSections.jsx
// All dashboard sections as components

import React, { useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { apiRequest } from "../../lib/api.js";
import Onboarding from "./Onboarding.jsx";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

// Utility functions
const pickValue = (source = {}, keys = [], fallback = undefined) => {
    for (const key of keys) {
        if (source?.[key] !== undefined && source?.[key] !== null) return source[key];
    }
    return fallback;
};

const safeArray = (...values) => {
    for (const value of values) {
        if (Array.isArray(value) && value.length) return value;
    }
    return [];
};

const normalizeList = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (payload.items && Array.isArray(payload.items)) return payload.items;
    if (payload.data && Array.isArray(payload.data)) return payload.data;
    return [];
};

const formatTime = (value) => {
    if (!value) return "TBD";
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return value;
};

// Section Header Component
const SectionHeader = ({ kicker, title, subtitle }) => (
    <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
            {kicker && (
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{kicker}</p>
            )}
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
    </div>
);

// Dashboard Section Components
// Dashboard Section Components
export const DashboardOnboarding = Onboarding;

export function DashboardServices() {
    const { profile, user, token, refreshDashboard } = useOutletContext();
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const PREDEFINED_SERVICES = [
        "Home Doctor",
        "Yoga Trainer",
        "Elderly Care",
        "Physiotherapy",
        "Blood Test",
        "Nursing & Caring",
        "Post-Operative Care",
        "Vaccination",
        "Wound Dressing",
        "Medical Attendant"
    ];

    useEffect(() => {
        const currentServices = profile?.doctor?.services || profile?.services || user?.services || [];
        setServices(currentServices);
    }, [profile, user]);

    // Clear success message after 3 seconds
    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const handleAddService = (serviceToAdd) => {
        // Support both event (form submit) and direct string input
        if (typeof serviceToAdd === 'object' && serviceToAdd.preventDefault) {
            serviceToAdd.preventDefault();
            serviceToAdd = newService;
        }

        if (!serviceToAdd || !serviceToAdd.trim()) return;
        const trimmed = serviceToAdd.trim();

        if (services.includes(trimmed)) {
            return;
        }

        setServices([...services, trimmed]);
        setNewService("");
    };

    const handleRemoveService = (serviceToRemove) => {
        setServices(services.filter(s => s !== serviceToRemove));
    };

    const toggleService = (service) => {
        if (services.includes(service)) {
            handleRemoveService(service);
        } else {
            handleAddService(service);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await apiRequest("/api/doctors/services", {
                token,
                method: "PUT",
                body: { services }
            });
            await refreshDashboard();
            setSuccessMsg("Services updated successfully!");
        } catch (err) {
            console.error("Update services error:", err);
            alert(err.message || "Failed to update services");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            className="space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
        >
            <SectionHeader
                kicker="My Services"
                title="Service Management"
                subtitle="Manage the services you offer to patients"
            />

            <div className="grid gap-6 md:grid-cols-2">
                {/* Popular Services Section */}
                <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm">
                    <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Popular Services</h4>
                    <p className="mb-4 text-xs text-slate-500">Tap to add or remove services from your profile.</p>
                    <div className="flex flex-wrap gap-2">
                        {PREDEFINED_SERVICES.map((service) => {
                            const isSelected = services.includes(service);
                            return (
                                <button
                                    key={service}
                                    onClick={() => toggleService(service)}
                                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all border ${isSelected
                                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                        : "bg-card text-slate-600 border-border hover:border-blue-300 hover:text-blue-600"
                                        }`}
                                >
                                    {isSelected ? "✓ " : "+ "}{service}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Custom Service Input & Active List */}
                <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm">
                    <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Custom & Active Services</h4>

                    <form onSubmit={handleAddService} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            placeholder="Add generic service..."
                            className="flex-1 rounded-[5px] border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!newService.trim()}
                            className="rounded-[5px] bg-slate-800 px-4 py-2 text-xs font-bold uppercase text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            Add
                        </button>
                    </form>

                    <div className="space-y-3">
                        {services.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {services.map((service) => (
                                    <span
                                        key={service}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900 dark:text-slate-200 border border-border"
                                    >
                                        {service}
                                        <button
                                            onClick={() => handleRemoveService(service)}
                                            className="ml-1 h-4 w-4 rounded-full text-slate-400 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-colors"
                                            title="Remove service"
                                        >
                                            <span className="sr-only">Remove</span>
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed border-border rounded-[5px]">
                                <span className="text-2xl mb-2">📋</span>
                                <p className="text-sm text-slate-500">No services selected.</p>
                                <p className="text-xs text-slate-400">Select from popular options or add your own.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Save Button Area */}
            <div className="flex items-center justify-end gap-4 border-t border-border pt-6">
                {successMsg && (
                    <span className="text-sm font-medium text-emerald-600 animate-pulse">
                        {successMsg}
                    </span>
                )}
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-[5px] bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving Changes..." : "Save Changes"}
                </button>
            </div>
        </motion.section>
    );
}

export function DashboardProfile() {
    const { profile, user, token, refreshDashboard } = useOutletContext();
    const profileData = profile?.doctor || profile || {};

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editForm, setEditForm] = useState({});

    // Helper to safely get values
    const getVal = (keys, fallback = "—") => pickValue(profileData, keys) || pickValue(user, keys) || fallback;

    const details = useMemo(() => ({
        // Personal
        name: getVal(["name", "fullName", "userName"], "Doctor"),
        email: getVal(["email"]),
        phone: getVal(["phone", "phoneNumber", "contact"]),

        // Professional
        specialty: getVal(["specialty", "specialization", "medicalSpecialization"], "General Practice"),
        experience: getVal(["experienceYears", "experience", "yearsOfExperience"]),
        qualifications: getVal(["qualification", "qualifications", "education", "degree"]), // Added 'qualification' based on user request
        consultationFee: getVal(["consultationFee", "fee"]),
        languages: profileData.languages?.join(", ") || "English",
        about: getVal(["about", "bio", "description"], "No bio available."),

        // Account / System
        doctorId: getVal(["doctorId", "doctor_id"]),
        userId: getVal(["_id", "id"]),
        role: getVal(["role"], "Doctor"),
        status: getVal(["status", "verificationStatus"], "Active"),
    }), [profileData, user]);

    const handleEdit = () => {
        setEditForm({
            about: details.about !== "No bio available." ? details.about : "",
            qualification: details.qualifications !== "—" ? details.qualifications : "",
            experienceYears: details.experience !== "—" ? details.experience : "",
            consultationFee: details.consultationFee !== "—" ? details.consultationFee : "",
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await apiRequest("/api/doctors/profile", {
                token,
                method: "PUT",
                body: editForm,
            });
            await refreshDashboard();
            setIsEditing(false);
        } catch (err) {
            alert(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.section
            className="space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
        >
            <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionHeader
                    kicker="Doctor Profile"
                    title="Professional Identity"
                    subtitle="Manage your public profile and account details"
                />
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="rounded-[5px] border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Main Profile Card */}
            <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    {/* Avatar Placeholder */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-slate-100 text-3xl font-bold text-slate-400">
                        {details.name.charAt(0)}
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{details.name}</h3>
                            <p className="text-lg text-slate-600">{details.specialty}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                    {details.role}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                    {details.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Info</p>
                                <div className="text-sm text-slate-900 dark:text-slate-200">
                                    <p><span className="font-medium">Email:</span> {details.email}</p>
                                    <p><span className="font-medium">Phone:</span> {details.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">System IDs</p>
                                <div className="text-sm text-slate-900 dark:text-slate-200">
                                    <p><span className="font-medium">Doctor ID:</span> <span className="font-mono text-xs">{details.doctorId}</span></p>
                                    <p><span className="font-medium">User ID:</span> <span className="font-mono text-xs">{details.userId}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Details Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm">
                    <h4 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">Professional Details</h4>

                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-900 dark:text-slate-200 mb-1">Qualification</label>
                                <input
                                    type="text"
                                    value={editForm.qualification}
                                    onChange={(e) => setEditForm({ ...editForm, qualification: e.target.value })}
                                    className="w-full rounded-[5px] border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    placeholder="e.g. MBBS, MD"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-900 dark:text-slate-200 mb-1">Experience ({details.experience}Years)</label>
                                    <input
                                        type="number"
                                        value={editForm.experienceYears}
                                        onChange={(e) => setEditForm({ ...editForm, experienceYears: e.target.value })}
                                        className="w-full rounded-[5px] border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-900 dark:text-slate-200 mb-1">Fee (₹)</label>
                                    <input
                                        type="number"
                                        value={editForm.consultationFee}
                                        onChange={(e) => setEditForm({ ...editForm, consultationFee: e.target.value })}
                                        className="w-full rounded-[5px] border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <dl className="space-y-4 text-sm">
                            <div className="grid grid-cols-3 gap-4">
                                <dt className="font-medium text-slate-500">Experience</dt>
                                <dd className="col-span-2 text-slate-900 dark:text-slate-100">{details.experience} Years</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <dt className="font-medium text-slate-500">Qualifications</dt>
                                <dd className="col-span-2 text-slate-900 dark:text-slate-100">{details.qualifications}</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <dt className="font-medium text-slate-500">Fee</dt>
                                <dd className="col-span-2 text-slate-900 dark:text-slate-100">₹{details.consultationFee}</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <dt className="font-medium text-slate-500">Languages</dt>
                                <dd className="col-span-2 text-slate-900 dark:text-slate-100">{details.languages}</dd>
                            </div>
                        </dl>
                    )}
                </div>

                <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm flex flex-col">
                    <h4 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">About</h4>
                    {isEditing ? (
                        <div className="flex-1 flex flex-col">
                            <textarea
                                value={editForm.about}
                                onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                                className="flex-1 w-full rounded-[5px] border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
                                placeholder="Write a brief bio about yourself..."
                                rows={4}
                            />
                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="rounded-[5px] border border-slate-300 bg-card px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-muted/60"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="rounded-[5px] bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed text-slate-600">
                            {details.about}
                        </p>
                    )}
                </div>
            </div>
        </motion.section>
    );
}

export function DashboardAppointments() {
    const { token } = useOutletContext();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await apiRequest("/api/doctors/dashboard/appointments?limit=20&sort=-startTime", { token });
            setAppointments(normalizeList(response?.data || response));
        } catch (err) {
            console.error("Appointments error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchAppointments();
    }, [token]);

    const handleStatusUpdate = async (apptId, newStatus) => {
        if (!confirm(`Are you sure you want to mark this appointment as ${newStatus}?`)) return;

        try {
            setActionLoading(apptId);
            await apiRequest(`/api/doctors/appointments/${apptId}/status`, {
                token,
                method: 'PUT',
                body: { status: newStatus }
            });
            // Refresh list
            await fetchAppointments();
        } catch (err) {
            alert(err.message || "Failed to update status");
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-900 dark:text-slate-200 border-border';
        }
    };

    // Helper to get patient name safely
    const getPatientName = (appt) => {
        return appt.patient?.userName || appt.patient?.name || appt.patientId?.userName || appt.patientName || "Unknown Patient";
    };

    return (
        <motion.section className="space-y-6" variants={fadeUp} initial="hidden" whileInView="visible">
            <SectionHeader kicker="Appointment Management" title="Upcoming Appointments" subtitle="Manage your patient schedule" />

            <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm">
                {loading ? (
                    <p className="text-center text-sm text-slate-500 py-8"></p>
                ) : appointments.length ? (
                    <div className="space-y-4">
                        {appointments.map((appt) => (
                            <div key={appt._id || appt.id} className="flex flex-col gap-4 rounded-[5px] border border-border bg-muted p-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">{getPatientName(appt)}</h4>
                                        <span className={`rounded-[5px] border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${getStatusColor(appt.status)}`}>
                                            {appt.status || "Pending"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-1">{appt.reason || "No reason provided"}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            📅 {new Date(appt.startTime).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            ⏰ {formatTime(appt.startTime)}
                                        </span>
                                        <span className="flex items-center gap-1 capitalize">
                                            🎥 {appt.mode || "Online"}
                                        </span>
                                    </div>
                                </div>

                                {(appt.status === 'scheduled' || appt.status === 'confirmed') && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(appt._id || appt.id, 'completed')}
                                            disabled={actionLoading === (appt._id || appt.id)}
                                            className="rounded-[5px] bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                        >
                                            Complete
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(appt._id || appt.id, 'cancelled')}
                                            disabled={actionLoading === (appt._id || appt.id)}
                                            className="rounded-[5px] border border-slate-300 bg-card px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200 hover:bg-muted/60 disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-3 rounded-full bg-slate-100 p-3 text-2xl">📅</div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">No Appointments</h3>
                        <p className="text-xs text-slate-500">You don't have any scheduled appointments yet.</p>
                    </div>
                )}
            </div>
        </motion.section>
    );
}

export function DashboardPatients() {
    const { token } = useOutletContext();
    const [activeTab, setActiveTab] = useState("list"); // list, notes, prescriptions
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        const load = async () => {
            try {
                const response = await apiRequest("/api/doctors/dashboard/patients?limit=50", { token });
                setPatients(normalizeList(response?.data || response));
            } catch (err) {
                console.error("Patients error:", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [token]);

    return (
        <motion.section className="space-y-6" variants={fadeUp} initial="hidden" whileInView="visible">
            <SectionHeader kicker="Patient CRM" title="My Patients" subtitle="History and records of your patients" />

            {/* Tabs */}
            <div className="flex border-b border-border">
                <button
                    onClick={() => setActiveTab("list")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "list" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-900 dark:text-slate-200"}`}
                >
                    Patient List
                </button>
                <button
                    onClick={() => setActiveTab("notes")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "notes" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-900 dark:text-slate-200"}`}
                >
                    Consultation Notes
                </button>
                <button
                    onClick={() => setActiveTab("prescriptions")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "prescriptions" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-900 dark:text-slate-200"}`}
                >
                    Prescriptions
                </button>
            </div>

            <div className="rounded-[5px] border border-border bg-card shadow-sm overflow-hidden p-6">
                {activeTab === "list" && (
                    <>
                        {loading ? (
                            <p className="text-center text-sm text-slate-500"></p>
                        ) : patients.length ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-muted text-xs uppercase text-slate-500">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">Patient Name</th>
                                            <th className="px-6 py-3 font-semibold">Last Visit</th>
                                            <th className="px-6 py-3 font-semibold">Total Visits</th>
                                            <th className="px-6 py-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {patients.map((patient, i) => (
                                            <tr key={i} className="hover:bg-muted/60">
                                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                                    {patient.user?.userName || patient.name || "Unknown"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : "—"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {patient.visitCount || 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                        Active
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="mb-3 rounded-full bg-slate-100 p-3 text-2xl">👥</div>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">No Patients Found</h3>
                                <p className="text-xs text-slate-500">Patients will appear here after their first appointment.</p>
                            </div>
                        )}
                    </>
                )}

                {activeTab === "notes" && (
                    <div className="text-center py-12">
                        <div className="mb-3 inline-flex rounded-full bg-slate-100 p-3 text-2xl">📝</div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Consultation Notes</h3>
                        <p className="mt-1 text-xs text-slate-500">Select a patient from the list to view or add notes.</p>
                        <button className="mt-4 rounded-[5px] bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                            Create New Note
                        </button>
                    </div>
                )}

                {activeTab === "prescriptions" && (
                    <div className="text-center py-12">
                        <div className="mb-3 inline-flex rounded-full bg-slate-100 p-3 text-2xl">💊</div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Prescriptions</h3>
                        <p className="mt-1 text-xs text-slate-500">Select a patient to write a digital prescription.</p>
                        <button className="mt-4 rounded-[5px] bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                            Write Prescription
                        </button>
                    </div>
                )}
            </div>
        </motion.section>
    );
}

export function DashboardNotifications() {
    const { token } = useOutletContext();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const response = await apiRequest("/api/notifications?limit=20", { token });
            setNotifications(normalizeList(response?.data || response));
        } catch (err) {
            console.error("Notifications error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchNotifications();
    }, [token]);

    const markAsRead = async (id) => {
        try {
            await apiRequest(`/api/notifications/${id}/read`, { token, method: 'PATCH' });
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error("Mark read error:", err);
        }
    };

    return (
        <motion.section className="space-y-6" variants={fadeUp} initial="hidden" whileInView="visible">
            <SectionHeader kicker="Signal Center" title="Notifications" subtitle="Alerts and updates" />

            <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm">
                {loading ? (
                    <p className="text-center text-sm text-slate-500 py-8"></p>
                ) : notifications.length ? (
                    <div className="space-y-2">
                        {notifications.map((notif) => (
                            <div
                                key={notif._id || notif.id}
                                className={`group relative flex gap-4 rounded-[5px] border p-4 transition-all ${notif.read ? "border-border bg-card" : "border-blue-100 bg-blue-50/50"
                                    }`}
                            >
                                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${notif.read ? "bg-slate-300" : "bg-blue-500"}`} />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <h4 className={`text-sm font-semibold ${notif.read ? "text-slate-900 dark:text-slate-200" : "text-slate-900 dark:text-slate-100"}`}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-xs text-slate-400 whitespace-nowrap">
                                            {new Date(notif.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600">{notif.body}</p>

                                    {!notif.read && (
                                        <button
                                            onClick={() => markAsRead(notif._id || notif.id)}
                                            className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-3 rounded-full bg-slate-100 p-3 text-2xl">🔔</div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">All Caught Up</h3>
                        <p className="text-xs text-slate-500">You have no new notifications.</p>
                    </div>
                )}
            </div>
        </motion.section>
    );
}

// Placeholder components for other sections
export function DashboardAvailability() {
    const { token, overview } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Default state for all 7 days (0=Sunday to 6=Saturday)
    // We'll use 1-7 for Mon-Sun in UI, but map to 0-6 for API
    const [schedule, setSchedule] = useState({
        1: { enabled: false, start: "09:00", end: "17:00", duration: 30 }, // Mon
        2: { enabled: false, start: "09:00", end: "17:00", duration: 30 }, // Tue
        3: { enabled: false, start: "09:00", end: "17:00", duration: 30 }, // Wed
        4: { enabled: false, start: "09:00", end: "17:00", duration: 30 }, // Thu
        5: { enabled: false, start: "09:00", end: "17:00", duration: 30 }, // Fri
        6: { enabled: false, start: "09:00", end: "17:00", duration: 30 }, // Sat
        0: { enabled: false, start: "09:00", end: "17:00", duration: 30 }, // Sun
    });

    const days = [
        { id: 1, label: "Monday" },
        { id: 2, label: "Tuesday" },
        { id: 3, label: "Wednesday" },
        { id: 4, label: "Thursday" },
        { id: 5, label: "Friday" },
        { id: 6, label: "Saturday" },
        { id: 0, label: "Sunday" },
    ];

    const doctorId = useMemo(() => {
        const overviewDoctor = overview?.doctor ?? {};
        return pickValue(overviewDoctor, ["_id", "id"]) || pickValue(overview, ["doctorId", "_id"]);
    }, [overview]);

    const handleDayToggle = (dayId) => {
        setSchedule(prev => ({
            ...prev,
            [dayId]: { ...prev[dayId], enabled: !prev[dayId].enabled }
        }));
    };

    const handleTimeChange = (dayId, field, value) => {
        setSchedule(prev => ({
            ...prev,
            [dayId]: { ...prev[dayId], [field]: value }
        }));
    };

    const applyToWeekdays = () => {
        // Get Monday's settings
        const mondaySettings = schedule[1];

        setSchedule(prev => ({
            ...prev,
            1: { ...mondaySettings, enabled: true },
            2: { ...mondaySettings, enabled: true },
            3: { ...mondaySettings, enabled: true },
            4: { ...mondaySettings, enabled: true },
            5: { ...mondaySettings, enabled: true },
        }));
        setSuccessMsg("Applied Monday's settings to all weekdays!");
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const handleSave = async () => {
        if (!token || !doctorId) {
            setErrorMsg("Doctor ID not found. Please refresh.");
            return;
        }

        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            // Transform to API payload
            const availability = Object.entries(schedule)
                .filter(([_, config]) => config.enabled)
                .map(([dayId, config]) => ({
                    dayOfWeek: parseInt(dayId),
                    startTime: config.start,
                    endTime: config.end,
                    slotDurationMinutes: parseInt(config.duration)
                }));

            await apiRequest(`/api/doctors/${doctorId}/availability/set`, {
                token,
                method: 'POST',
                body: { availability }
            });

            setSuccessMsg("Availability schedule saved successfully!");
        } catch (err) {
            console.error("Save availability error:", err);
            setErrorMsg(err.message || "Failed to save availability");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            className="space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
        >
            <SectionHeader
                kicker="Calendar & Availability"
                title="Weekly Schedule"
                subtitle="Set your availability for appointments"
            />

            <div className="rounded-[5px] border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[5px] bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    <p>
                        <span className="font-semibold">Quick Tip:</span> Set up Monday and click "Apply to Weekdays" to fast-track your setup.
                    </p>
                    <button
                        onClick={applyToWeekdays}
                        className="rounded-[5px] bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
                    >
                        Apply Mon to Weekdays
                    </button>
                </div>

                <div className="space-y-4">
                    {days.map((day) => {
                        const config = schedule[day.id];
                        return (
                            <div
                                key={day.id}
                                className={`rounded-[5px] border p-4 transition-all ${config.enabled
                                    ? "border-blue-200 bg-muted"
                                    : "border-border bg-card opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex w-32 items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.enabled}
                                            onChange={() => handleDayToggle(day.id)}
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className={`font-medium ${config.enabled ? "text-slate-900 dark:text-slate-100" : "text-slate-500"}`}>
                                            {day.label}
                                        </span>
                                    </div>

                                    {config.enabled && (
                                        <div className="flex flex-1 flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <label className="text-xs text-slate-500">Start</label>
                                                <input
                                                    type="time"
                                                    value={config.start}
                                                    onChange={(e) => handleTimeChange(day.id, "start", e.target.value)}
                                                    className="rounded-[5px] border border-slate-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-xs text-slate-500">End</label>
                                                <input
                                                    type="time"
                                                    value={config.end}
                                                    onChange={(e) => handleTimeChange(day.id, "end", e.target.value)}
                                                    className="rounded-[5px] border border-slate-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-xs text-slate-500">Duration (min)</label>
                                                <select
                                                    value={config.duration}
                                                    onChange={(e) => handleTimeChange(day.id, "duration", e.target.value)}
                                                    className="rounded-[5px] border border-slate-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                                                >
                                                    <option value="15">15 min</option>
                                                    <option value="20">20 min</option>
                                                    <option value="30">30 min</option>
                                                    <option value="45">45 min</option>
                                                    <option value="60">60 min</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {!config.enabled && (
                                        <span className="text-sm italic text-slate-400">Unavailable</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                    <div>
                        {successMsg && <span className="text-sm font-medium text-emerald-600">{successMsg}</span>}
                        {errorMsg && <span className="text-sm font-medium text-rose-600">{errorMsg}</span>}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="rounded-[5px] bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition"
                    >
                        {loading ? "Saving..." : "Save Schedule"}
                    </button>
                </div>
            </div>
        </motion.section>
    );
}

export function DashboardFollowUps() {
    return (
        <motion.section className="rounded-[5px] border border-border bg-card p-6 shadow-sm" variants={fadeUp} initial="hidden" animate="visible">
            <SectionHeader kicker="Follow-Up System" title="Follow-up Reminders" subtitle="Track patient follow-ups" />
            <p className="mt-4 text-sm text-slate-500">Follow-up system coming soon.</p>
        </motion.section>
    );
}

export function DashboardNotes() {
    return (
        <motion.section className="rounded-[5px] border border-border bg-card p-6 shadow-sm" variants={fadeUp} initial="hidden" animate="visible">
            <SectionHeader kicker="Consultation Notes" title="Notes & Records" subtitle="Patient consultation history" />
            <p className="mt-4 text-sm text-slate-500">Consultation notes coming soon.</p>
        </motion.section>
    );
}

export function DashboardPrescriptions() {
    return (
        <motion.section className="rounded-[5px] border border-border bg-card p-6 shadow-sm" variants={fadeUp} initial="hidden" animate="visible">
            <SectionHeader kicker="Prescription Writing" title="Create Prescriptions" subtitle="Digital prescription management" />
            <p className="mt-4 text-sm text-slate-500">Prescription module coming soon.</p>
        </motion.section>
    );
}

export function DashboardFinancial() {
    return (
        <motion.section className="rounded-[5px] border border-border bg-card p-6 shadow-sm" variants={fadeUp} initial="hidden" animate="visible">
            <SectionHeader kicker="Financial Tools" title="Revenue & Analytics" subtitle="Financial overview" />
            <p className="mt-4 text-sm text-slate-500">Financial tools coming soon.</p>
        </motion.section>
    );
}

export function DashboardLeads() {
    return (
        <motion.section className="rounded-[5px] border border-border bg-card p-6 shadow-sm" variants={fadeUp} initial="hidden" animate="visible">
            <SectionHeader kicker="Leads & Referrals" title="Business Growth" subtitle="Track leads and referrals" />
            <p className="mt-4 text-sm text-slate-500">Leads management coming soon.</p>
        </motion.section>
    );
}

export function DashboardChat() {
    const { token, user } = useOutletContext();
    const [rooms, setRooms] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [sidebarView, setSidebarView] = useState('chats'); // 'chats' | 'appointments'
    const messagesEndRef = React.useRef(null);

    // Fetch Rooms
    const fetchRooms = async () => {
        if (!token) return;
        try {
            setLoadingRooms(true);
            const response = await apiRequest("/api/chat/rooms", { token });
            const roomList = normalizeList(response?.data || response);
            // Ensure unique rooms by _id
            const uniqueRooms = Array.from(new Map(roomList.map(item => [item._id, item])).values());
            setRooms(uniqueRooms);
        } catch (err) {
            console.error("Fetch rooms error:", err);
        } finally {
            setLoadingRooms(false);
        }
    };

    // Fetch Appointments
    const fetchAppointments = async () => {
        if (!token) return;
        try {
            setLoadingAppointments(true);
            // Fetch confirmed appointments for upcoming list (strictly future)
            const response = await apiRequest("/api/doctors/dashboard/appointments?status=confirmed&range=upcoming&limit=20&sort=startTime", { token });
            const apptList = normalizeList(response?.data || response);
            setAppointments(apptList);
        } catch (err) {
            console.error("Fetch appointments error:", err);
        } finally {
            setLoadingAppointments(false);
        }
    };

    useEffect(() => {
        fetchRooms();
        fetchAppointments();
    }, [token]);

    // Fetch Messages when activeRoom changes
    useEffect(() => {
        if (!token || !activeRoom) return;

        const fetchMessages = async () => {
            try {
                setLoadingMessages(true);
                const response = await apiRequest(`/api/chat/rooms/${activeRoom._id}/messages`, { token });
                const msgs = normalizeList(response?.data || response).reverse();
                setMessages(msgs);

                await apiRequest(`/api/chat/rooms/${activeRoom._id}/read`, {
                    token,
                    method: 'PATCH'
                });
            } catch (err) {
                console.error("Fetch messages error:", err);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, [token, activeRoom]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeRoom || sending) return;

        try {
            setSending(true);
            const response = await apiRequest(`/api/chat/rooms/${activeRoom._id}/messages`, {
                token,
                method: 'POST',
                body: { body: newMessage }
            });

            const sentMsg = response?.data || response;
            setMessages(prev => [...prev, sentMsg]);
            setNewMessage("");

            // Update room list to show new message
            fetchRooms();

        } catch (err) {
            console.error("Send message error:", err);
            alert("Failed to send message");
        } finally {
            console.error("Start chat error:", err);
            alert(err.message || "Failed to start chat");
        }
    };

    const getOtherParticipant = (room) => room.patient;

    const getPatientName = (appt) => {
        return appt.patient?.userName || appt.patient?.name || "Unknown Patient";
    };

    return (
        <motion.section
            className="h-[calc(100vh-140px)] min-h-[600px] overflow-hidden rounded-[5px] border border-border bg-card shadow-sm flex"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
        >
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 border-r border-border flex flex-col bg-muted">
                {/* Sidebar Tabs */}
                <div className="flex border-b border-border bg-card">
                    <button
                        onClick={() => setSidebarView('chats')}
                        className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${sidebarView === 'chats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900 dark:text-slate-200'}`}
                    >
                        Chats
                    </button>
                    <button
                        onClick={() => setSidebarView('appointments')}
                        className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${sidebarView === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900 dark:text-slate-200'}`}
                    >
                        Upcoming
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto">
                    {sidebarView === 'chats' ? (
                        <>
                            {loadingRooms ? (
                                <div className="p-4 text-center text-sm text-slate-500"></div>
                            ) : rooms.length === 0 ? (
                                <div className="p-8 text-center">
                                    <p className="text-sm text-slate-500">No active conversations.</p>
                                    <button
                                        onClick={() => setSidebarView('appointments')}
                                        className="mt-2 text-xs text-blue-600 hover:underline"
                                    >
                                        Start a chat from Upcoming
                                    </button>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {rooms.map((room, idx) => {
                                        const other = getOtherParticipant(room);
                                        const isActive = activeRoom?._id === room._id;
                                        const hasUnread = room.doctorUnreadCount > 0;

                                        return (
                                            <button
                                                key={room._id || idx}
                                                onClick={() => setActiveRoom(room)}
                                                className={`w-full p-4 text-left hover:bg-card transition-colors flex gap-3 ${isActive ? 'bg-card border-l-4 border-blue-600 shadow-sm' : 'border-l-4 border-transparent'}`}
                                            >
                                                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {other?.userName?.charAt(0) || '?'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h4 className={`text-sm font-medium truncate ${hasUnread ? 'text-slate-900 dark:text-slate-100 font-bold' : 'text-slate-900 dark:text-slate-200'}`}>
                                                            {other?.userName || 'Unknown'}
                                                        </h4>
                                                        {room.lastMessage && (
                                                            <span className="text-[10px] text-slate-400 shrink-0">
                                                                {new Date(room.updatedAt).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-xs truncate ${hasUnread ? 'text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-500'}`}>
                                                        {room.lastMessage?.text || 'No messages yet'}
                                                    </p>
                                                    {room.appointment?.startTime && (
                                                        <div className="mt-1 flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded w-fit">
                                                            <span>📅</span>
                                                            <span>
                                                                {new Date(room.appointment.startTime).toLocaleString([], {
                                                                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                {hasUnread && (
                                                    <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-2"></div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {loadingAppointments ? (
                                <div className="p-4 text-center text-sm text-slate-500"></div>
                            ) : appointments.length === 0 ? (
                                <div className="p-8 text-center">
                                    <p className="text-sm text-slate-500">No upcoming appointments.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {appointments.map((appt, idx) => (
                                        <div key={appt.appointmentId || appt._id || idx} className="p-4 hover:bg-card transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                                                    {getPatientName(appt).charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                                        {getPatientName(appt)}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 truncate">
                                                        {appt.reason || "Consultation"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                                                <span>🕒</span>
                                                <span>
                                                    {new Date(appt.startTime).toLocaleString([], {
                                                        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => handleStartChat(appt)}
                                                className="w-full rounded-[5px] border border-blue-200 bg-blue-50 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                                            >
                                                Open Chat
                                            </button>
                                            <p className="mt-1 text-[10px] text-center text-slate-400">
                                                Portal opens at appointment time
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-card">
                {activeRoom ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                    {getOtherParticipant(activeRoom)?.userName?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{getOtherParticipant(activeRoom)?.userName}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-slate-500">Patient</p>
                                        {activeRoom.appointment?.startTime && (
                                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                Appt: {new Date(activeRoom.appointment.startTime).toLocaleString([], {
                                                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/50">
                            {loadingMessages ? (
                                <div className="text-center py-10 text-sm text-slate-500"></div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-10 text-sm text-slate-400">
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                messages.map((msg, idx) => {
                                    const senderId = msg.sender?._id || msg.sender;
                                    const myId = user?._id || user?.id;
                                    // Ensure we compare strings
                                    const isMe = String(senderId) === String(myId);

                                    if (idx === messages.length - 1) {
                                        console.log("Debug Message:", { msgId: msg._id, sender: msg.sender, senderId, myId, isMe });
                                    }

                                    return (
                                        <div key={msg._id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMe
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-card border border-border text-slate-800 rounded-bl-none shadow-sm'
                                                }`}>
                                                <p>{msg.body}</p>
                                                <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-border bg-card">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    disabled={sending}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || sending}
                                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {sending ? '...' : 'Send'}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-muted/30">
                        <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl mb-4">
                            💬
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Select a Conversation</h3>
                        <p className="text-sm text-slate-500 max-w-xs mt-2">
                            Choose a chat from the list or start a new one from the <b>Upcoming</b> tab.
                        </p>
                    </div>
                )}
            </div>
        </motion.section>
    );
}
