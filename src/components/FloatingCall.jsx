import React from "react";
import { createPortal } from "react-dom";

export default function FloatingCall() {
  const phoneNumber = "+919837715111";

  const handleClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const button = (
    <button
      onClick={handleClick}
      aria-label="Call Now"
      style={{
        position: "fixed",
        bottom: "96px",
        right: "24px",
        zIndex: 99999,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#2563eb", // Tailwind blue-600
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37, 99, 235, 0.4)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.12)";
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(37, 99, 235, 0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37, 99, 235, 0.4)";
      }}
    >
      {/* Phone SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 24, height: 24 }}
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>

      {/* Pulse ring animation */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid #2563eb",
          animation: "call-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
          opacity: 0.5,
        }}
      />

      <style>{`
        @keyframes call-ping {
          0%   { transform: scale(1);   opacity: 0.5; }
          75%  { transform: scale(1.6); opacity: 0;   }
          100% { transform: scale(1.6); opacity: 0;   }
        }
      `}</style>
    </button>
  );

  return createPortal(button, document.body);
}
