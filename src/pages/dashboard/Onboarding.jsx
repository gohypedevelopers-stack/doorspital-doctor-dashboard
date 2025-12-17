// src/pages/dashboard/Onboarding.jsx
import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { apiRequest } from "../../lib/api.js";
import GlobalLoader from "../../GlobalLoader";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
        rejected: "bg-rose-100 text-rose-700 border-rose-200",
        under_review: "bg-blue-100 text-blue-700 border-blue-200",
    };

    const label = status ? status.replace("_", " ").toUpperCase() : "UNKNOWN";
    const style = styles[status] || "bg-slate-100 text-slate-900 dark:text-slate-200 border-border";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${style}`}>
            {label}
        </span>
    );
};

const InfoCard = ({ title, children, icon }) => (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/50 flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <h3 className="font-semibold text-slate-800 dark:text-slate-300">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const DetailRow = ({ label, value }) => (
    <div className="mb-4 last:mb-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">{value || "—"}</p>
    </div>
);

const DocumentItem = ({ label, file, status }) => {
    const isUploaded = !!file;
    return (
        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted mb-3 last:mb-0">
            <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isUploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                    {isUploaded ? '✓' : '—'}
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>
                    {file && <p className="text-xs text-slate-500 truncate max-w-[200px]">{file.filename}</p>}
                </div>
            </div>
            {isUploaded ? (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Uploaded</span>
            ) : (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Pending</span>
            )}
        </div>
    );
};

export default function Onboarding() {
    const { token, overview } = useOutletContext();
    const navigate = useNavigate();
    const [verification, setVerification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [doctorId, setDoctorId] = useState(null);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (overview) {
            const overviewDoctor = overview?.doctor ?? {};
            // Try to find doctorId from various possible locations in overview
            const id = overviewDoctor._id || overviewDoctor.id || overview.doctorId || overview._id;
            setDoctorId(id);
        }
    }, [overview]);

    useEffect(() => {
        if (!token || !doctorId) return;

        const fetchVerification = async () => {
            try {
                setLoading(true);
                const response = await apiRequest(`/api/doctors/verification/${doctorId}`, {
                    token,
                    suppressErrorLog: true
                });
                // Check if data is null or empty (new backend returns 200 with data: null)
                if (response?.data === null || !response?.data) {
                    setShouldRedirect(true);
                } else {
                    setVerification(response?.data || response);
                }
            } catch (err) {
                // 404 means no verification - redirect to register
                if (err.message && (err.message.includes("404") || err.message.toLowerCase().includes("not found"))) {
                    setShouldRedirect(true);
                } else {
                    console.error("Verification load error:", err);
                    setError(err.message || "Failed to load verification details");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVerification();
    }, [token, doctorId]);

    // Redirect to register if no verification found
    useEffect(() => {
        if (shouldRedirect && !loading) {
            navigate('/register');
        }
    }, [shouldRedirect, loading, navigate]);

   

    if (error) {
        return (
            <div className="p-6 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
                <h3 className="font-bold mb-2">Error Loading Verification</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!verification) {
        // This will briefly show while redirecting
        return (
            <div className="flex flex-col items-center justify-center gap-3 min-h-[240px] text-center">
                <GlobalLoader />
                <p className="text-slate-500 text-sm">Redirecting to registration...</p>
            </div>
        );
    }

    const { personalDetails, registration, qualifications, identity, status } = verification;

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-6xl mx-auto pb-10"
        >
            {/* Header & Status Banner */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Verification Status</h1>
                    <p className="text-slate-500 mt-1">Manage and track your doctor verification process.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 font-medium">Current Status:</span>
                    <StatusBadge status={status} />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Personal Details */}
                <InfoCard title="Personal Details" icon="👤">
                    <div className="grid grid-cols-1 gap-y-4">
                        <DetailRow label="Full Name" value={personalDetails?.fullName} />
                        <DetailRow label="Email" value={personalDetails?.email} />
                        <DetailRow label="Phone" value={personalDetails?.phoneNumber} />
                        <DetailRow label="Location" value={`${personalDetails?.city || ''}, ${personalDetails?.state || ''}`} />
                    </div>
                </InfoCard>

                {/* Professional Info */}
                <InfoCard title="Professional Info" icon="👨‍⚕️">
                    <div className="grid grid-cols-1 gap-y-4">
                        <DetailRow label="Specialization" value={personalDetails?.medicalSpecialization} />
                        <DetailRow label="Experience" value={`${personalDetails?.yearsOfExperience || 0} Years`} />
                        <DetailRow label="Clinic/Hospital" value={personalDetails?.clinicHospitalName} />
                        <DetailRow label="Clinic Address" value={personalDetails?.clinicAddress} />
                    </div>
                </InfoCard>

                {/* Registration Details */}
                <InfoCard title="Registration" icon="📜">
                    <div className="grid grid-cols-1 gap-y-4">
                        <DetailRow label="Registration Number" value={registration?.registrationNumber} />
                        <DetailRow label="Council Name" value={registration?.councilName} />
                        <DetailRow label="Issue Date" value={registration?.issueDate ? new Date(registration.issueDate).toLocaleDateString() : ''} />
                    </div>
                </InfoCard>

                {/* Documents - Spans full width on mobile, 2 cols on large */}
                <div className="md:col-span-2 lg:col-span-3">
                    <InfoCard title="Submitted Documents" icon="📁">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DocumentItem
                                label="MBBS Certificate"
                                file={qualifications?.mbbsCertificate}
                            />
                            <DocumentItem
                                label="Registration Certificate"
                                file={registration?.registrationCertificate}
                            />
                            <DocumentItem
                                label="Government ID"
                                file={identity?.governmentId}
                            />
                            <DocumentItem
                                label="Selfie Verification"
                                file={verification?.selfieVerification?.selfie}
                            />
                            {qualifications?.mdMsBdsCertificate && (
                                <DocumentItem
                                    label="MD/MS/BDS Certificate"
                                    file={qualifications.mdMsBdsCertificate}
                                />
                            )}
                        </div>
                    </InfoCard>
                </div>
            </div>

            {/* Review Notes (if any) */}
            {verification.reviewNotes && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <span>📝</span> Reviewer Notes
                    </h3>
                    <p className="text-blue-800 text-sm">{verification.reviewNotes}</p>
                </div>
            )}
        </motion.div>
    );
}
