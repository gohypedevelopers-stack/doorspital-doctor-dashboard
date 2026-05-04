import React from "react";
import { createPortal } from "react-dom";

export default function FloatingWhatsApp() {
  const phoneNumber = "919837715111";
  const message = "Hello, I have a question about Doorspitals.";

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const button = (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99999,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.12)";
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(37, 211, 102, 0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37, 211, 102, 0.4)";
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        style={{ width: 30, height: 30 }}
      >
        <path d="M16.003 0C7.163 0 0 7.163 0 16.003c0 2.824.74 5.476 2.03 7.786L.004 32l8.42-2.203A15.955 15.955 0 0 0 16.003 32C24.84 32 32 24.837 32 16.003 32 7.163 24.84 0 16.003 0zm0 29.284a13.25 13.25 0 0 1-6.75-1.843l-.484-.288-5.002 1.31 1.336-4.875-.316-.5A13.22 13.22 0 0 1 2.72 16.003c0-7.327 5.957-13.284 13.283-13.284 7.326 0 13.28 5.957 13.28 13.284 0 7.325-5.954 13.281-13.28 13.281zm7.277-9.937c-.4-.2-2.36-1.163-2.726-1.296-.367-.133-.635-.2-.904.2-.268.4-1.034 1.296-1.267 1.562-.233.266-.467.3-.867.1-2.09-1.046-3.612-1.89-5.016-3.868-.365-.515.366-.48 1.135-2.011.1-.2.05-.374-.05-.574-.1-.2-.904-2.175-1.237-2.982-.325-.784-.657-.676-.903-.688-.234-.011-.5-.014-.768-.014-.268 0-.703.1-1.068.5-.367.4-1.4 1.368-1.4 3.336 0 1.967 1.433 3.867 1.633 4.135.2.266 2.8 4.275 6.784 5.998.949.41 1.69.655 2.266.839.952.304 1.817.261 2.501.158.763-.115 2.36-.965 2.693-1.9.333-.935.333-1.734.233-1.9-.097-.167-.365-.267-.768-.467z" />
      </svg>

      {/* Pulse ring animation */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid #25D366",
          animation: "wa-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
          opacity: 0.5,
        }}
      />

      <style>{`
        @keyframes wa-ping {
          0%   { transform: scale(1);   opacity: 0.5; }
          75%  { transform: scale(1.6); opacity: 0;   }
          100% { transform: scale(1.6); opacity: 0;   }
        }
      `}</style>
    </button>
  );

  return createPortal(button, document.body);
}
