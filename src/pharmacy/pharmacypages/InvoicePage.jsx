import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import bellicon from "../assets/bellicon.png";
import { apiRequest } from "../../lib/api.js";
import { getPharmacySession, getPharmacyToken } from "../../lib/pharmacySession.js";
import html2pdf from "html2pdf.js";
import GlobalLoader from "@/GlobalLoader.jsx";


const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const formatAddress = (address) => {
  if (!address) return "Not provided";
  const parts = [
    address.addressLine1 ?? address.line1 ?? address.address,
    address.addressLine2 ?? address.line2,
    address.city,
    address.state,
    address.postalCode ?? address.pincode ?? address.zipCode,
  ];
  const filtered = parts.filter(Boolean);
  return filtered.length ? filtered.join(", ") : "Not provided";
};

const formatDateString = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const formatTimeString = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* ---------------------------------------------------------
   OKLCH safety + inline computed styles (NO CSS variables)
---------------------------------------------------------- */

function oklchToRgba(oklchStr) {
  // Only converts simple numeric OKLCH like: oklch(0.7 0.1 240 / 0.8)
  // If OKLCH contains var(...) or nested functions, we will DROP those props later.
  const inside = oklchStr.trim().replace(/^oklch\(/, "").replace(/\)$/, "").trim();
  const [beforeAlpha, alphaPart] = inside.split("/");
  const parts = beforeAlpha.trim().split(/\s+/);
  if (parts.length < 3) return null;

  let L = parts[0],
    C = parts[1],
    H = parts[2];

  let l = 0;
  if (typeof L === "string" && L.endsWith("%")) l = parseFloat(L) / 100;
  else l = parseFloat(L);

  const c = parseFloat(C);

  let h = 0;
  if (typeof H === "string" && H.endsWith("deg")) h = parseFloat(H);
  else h = parseFloat(H);

  if ([l, c, h].some((v) => Number.isNaN(v))) return null;

  let alpha = 1;
  if (alphaPart != null) {
    const a = alphaPart.trim();
    alpha = a.endsWith("%") ? parseFloat(a) / 100 : parseFloat(a);
    if (Number.isNaN(alpha)) alpha = 1;
    alpha = Math.min(1, Math.max(0, alpha));
  }

  const hr = (h * Math.PI) / 180;
  const a_ = c * Math.cos(hr);
  const b_ = c * Math.sin(hr);

  const l_ = l + 0.3963377774 * a_ + 0.2158037573 * b_;
  const m_ = l - 0.1055613458 * a_ - 0.0638541728 * b_;
  const s_ = l - 0.0894841775 * a_ - 1.2914855480 * b_;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  const toSrgb = (x) => {
    x = Math.min(1, Math.max(0, x));
    return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  };

  r = Math.round(toSrgb(r) * 255);
  g = Math.round(toSrgb(g) * 255);
  b = Math.round(toSrgb(b) * 255);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function replaceOklchInString(value) {
  if (!value || typeof value !== "string") return value;
  // If it contains var( inside oklch, conversion will fail -> handled by stripper.
  return value.replace(/oklch\(([^)]+)\)/g, (match) => oklchToRgba(match) ?? match);
}

/**
 * Copy computed styles to clone, but:
 * - SKIP custom properties (CSS variables) that start with "--"
 * - Convert simple oklch(...) to rgba(...)
 * - Remove all class names (so Tailwind rules are not parsed)
 */
function inlineComputedStylesNoVars(originalRoot, cloneRoot) {
  const origNodes = [originalRoot, ...originalRoot.querySelectorAll("*")];
  const cloneNodes = [cloneRoot, ...cloneRoot.querySelectorAll("*")];

  for (let i = 0; i < origNodes.length; i++) {
    const o = origNodes[i];
    const c = cloneNodes[i];
    if (!o || !c) continue;

    const cs = window.getComputedStyle(o);

    for (let j = 0; j < cs.length; j++) {
      const prop = cs[j];
      if (!prop || prop.startsWith("--")) continue; // ✅ skip CSS variables

      let val = cs.getPropertyValue(prop);
      const priority = cs.getPropertyPriority(prop);
      if (!val) continue;

      if (val.includes("oklch(")) val = replaceOklchInString(val);

      try {
        c.style.setProperty(prop, val, priority);
      } catch {
        // ignore
      }
    }

    c.removeAttribute("class");
  }
}

/**
 * Final cleanup: remove any inline style properties that still contain "oklch("
 * (usually from weird values, gradients, or nested functions)
 */
function stripAnyOklchInline(root) {
  const nodes = [root, ...root.querySelectorAll("*")];
  for (const el of nodes) {
    const style = el.style;
    if (!style) continue;

    // iterate backward because we may remove properties
    for (let i = style.length - 1; i >= 0; i--) {
      const prop = style[i];
      const val = style.getPropertyValue(prop);
      if (typeof val === "string" && val.includes("oklch(")) {
        style.removeProperty(prop);
      }
    }
  }
}

export default function InvoicePage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const token = getPharmacyToken();
  const session = getPharmacySession();

  const [order, setOrder] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const invoiceRef = useRef(null);

  useEffect(() => {
    if (!token || !orderId) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [orderResponse, profileResponse] = await Promise.all([
          apiRequest(`/api/pharmacy/orders/${orderId}`, { token }),
          apiRequest("/api/pharmacy/profile", { token }),
        ]);
        if (cancelled) return;
        setOrder(orderResponse?.data ?? null);
        setProfile(profileResponse?.data ?? null);
      } catch (err) {
        console.error("Unable to load invoice:", err);
        if (!cancelled) setError(err.message || "Unable to load invoice details");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [token, orderId]);

  // ✅ Download ONLY invoiceRef part
  const handleDownload = async () => {
    if (!invoiceRef.current || !order || downloading) return;

    const invoiceNumber = order?.invoiceNumber ?? order?.orderId ?? order?._id ?? orderId;

    try {
      setDownloading(true);

      if (document.fonts?.ready) await document.fonts.ready;

      const original = invoiceRef.current;
      const clone = original.cloneNode(true);

      // Make clone independent from Tailwind CSS (and avoid oklch parsing)
      inlineComputedStylesNoVars(original, clone);
      stripAnyOklchInline(clone);

      // A4 wrapper
      const wrapper = document.createElement("div");
      wrapper.style.width = "210mm";
      wrapper.style.minHeight = "297mm";
      wrapper.style.padding = "12mm";
      wrapper.style.boxSizing = "border-box";
      wrapper.style.background = "#ffffff";
      wrapper.appendChild(clone);

      // page/table helpers
      const styleTag = document.createElement("style");
      styleTag.textContent = `
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        table { width: 100%; border-collapse: collapse; }
        thead { display: table-header-group; }
        tr, td, th { break-inside: avoid !important; page-break-inside: avoid !important; }
      `;
      wrapper.prepend(styleTag);

      // hidden host
      const host = document.createElement("div");
      host.style.position = "fixed";
      host.style.left = "-100000px";
      host.style.top = "0";
      host.style.background = "#fff";
      host.appendChild(wrapper);
      document.body.appendChild(host);

      const opt = {
        filename: `invoice-${invoiceNumber}.pdf`,
        margin: 0,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          backgroundColor: "#ffffff",
          scrollY: 0,
          useCORS: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      await html2pdf().set(opt).from(wrapper).save();
      document.body.removeChild(host);
    } catch (e) {
      console.error("PDF download failed:", e);
      setError("Unable to download invoice PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
        return <GlobalLoader fullPage />;
    }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f6fafb] text-slate-900 dark:text-slate-100">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-1 items-center justify-center">
            <div className="space-y-3 text-center">
              <p className="text-slate-500">Invoice not available.</p>
              <button
                onClick={() => navigate("/pharmacy/orders")}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-100"
              >
                Back to orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------- original data calculations (same as your code) ----------
  const customerName =
    order.shippingAddress?.fullName ??
    order.user?.userName ??
    order.customerName ??
    "Customer";

  const customerAddressBilling = order.billingAddress ?? order.shippingAddress ?? null;
  const customerAddressShipping = order.shippingAddress ?? null;

  const customerPhone =
    order.shippingAddress?.phone ?? order.user?.phone ?? order.customerPhone ?? "Not provided";

  const customerEmail =
    order.user?.email ?? order.shippingAddress?.email ?? order.customerEmail ?? "Not provided";

  const invoiceNumber = order.invoiceNumber ?? order.orderId ?? order._id ?? orderId;
  const invoiceDate = formatDateString(order.createdAt ?? order.orderDate);
  const invoiceTime = formatTimeString(order.createdAt ?? order.orderDate);

  const sellerName =
    profile?.storeName ?? session?.pharmacy?.storeName ?? "City Pharmacy";

  const hasStructuredAddress =
    profile?.address && typeof profile.address === "object" && Object.keys(profile.address).length;

  const sellerAddress = hasStructuredAddress
    ? formatAddress(profile.address)
    : profile?.storeAddress ?? "Not provided";

  const sellerPhone =
    profile?.phoneNumber ?? profile?.whatsappNumber ?? session?.user?.phone ?? "Not provided";

  const sellerEmail = session?.user?.email ?? profile?.ownerEmail ?? "info@doorspital.com";
  const sellerWebsite = profile?.website ?? "https://doorspital.com";
  const gstNumber = profile?.gstNumber ?? "Not set";

  const items = order.items ?? [];
  const subtotalFromItems = items.reduce((sum, item) => {
    const price = Number(item.price ?? 0);
    const quantity = Number(item.quantity ?? 0);
    return sum + price * quantity;
  }, 0);

  const subtotal = order.subtotal ?? subtotalFromItems;
  const totalDiscount = order.totalDiscount ?? order.discount ?? order.discountAmount ?? 0;
  const deliveryCharges = order.deliveryCharges ?? order.shippingCharges ?? order.shippingCost ?? 0;
  const grandTotal = order.total ?? subtotal - totalDiscount + deliveryCharges;
  const amountPaid = order.amountPaid ?? order.paidAmount ?? order.totalPaid ?? grandTotal;
  const balanceDue = Math.max(grandTotal - amountPaid, 0);

  const paymentMethod = (order.paymentMethod ?? "COD").toUpperCase();
  const returnPolicy =
    order.returnPolicy ??
    "Returns/refunds must be raised within 7 days with original invoice and packaging.";

  return (
    <div className="min-h-screen bg-[#f6fafb] text-slate-900 dark:text-slate-100">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border bg-card px-10 py-5">
            <div>
              <p className="text-[13px] text-slate-500">Invoice overview</p>
              <h1 className="text-[18px] font-semibold text-slate-900 dark:text-slate-100">
                Invoice #{invoiceNumber}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleDownload}
                disabled={!order || downloading}
                className="relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(16,185,129,0.45)] transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloading ? "Downloading..." : "Download invoice (PDF)"}
              </button>

              <button
                onClick={() => navigate(`/pharmacy/orders/${orderId}`)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
              >
                <img src={bellicon} alt="Notifications" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-[#f6fafb] px-10 py-7">
            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
                {error}
              </div>
            )}

            {/* ✅ ONLY THIS PART WILL DOWNLOAD */}
            <div
              ref={invoiceRef}
              data-invoice-root
              className="mx-auto w-full max-w-5xl space-y-6 rounded-[32px] bg-card p-8 shadow-[0_18px_45px_rgba(15,23,42,0.07)] border border-border"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Seller details
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{sellerName}</p>
                  <p className="text-sm text-slate-600">{sellerAddress}</p>
                  <p className="text-sm text-slate-600">Phone: {sellerPhone}</p>
                  <p className="text-sm text-slate-600">Email: {sellerEmail}</p>
                  <p className="text-sm text-slate-600">Website: {sellerWebsite}</p>
                  <p className="text-sm text-slate-600">GST: {gstNumber}</p>
                </div>

                <div className="space-y-3 rounded-2xl border border-border bg-muted p-5 text-sm text-slate-900 dark:text-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Invoice Date</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{invoiceDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Invoice Time</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{invoiceTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Order Number</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {order.orderId ?? order._id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Payment Status</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {order.paymentStatus ?? "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Customer details
                </p>
                <div className="grid gap-4 pt-4 text-sm text-slate-900 dark:text-slate-200 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Customer name
                    </p>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Phone</p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">{customerPhone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Billing address
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      {formatAddress(customerAddressBilling)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Shipping address
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      {formatAddress(customerAddressShipping)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Email</p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">{customerEmail}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-[#f1f5f9] text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Unit price</th>
                      <th className="px-4 py-3">Discount</th>
                      <th className="px-4 py-3">Tax amount</th>
                      <th className="px-4 py-3">Line total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      const quantity = Number(item.quantity ?? 0);
                      const unitPrice = Number(item.price ?? 0);
                      const discount = Number(item.discount ?? item.discountAmount ?? 0);
                      const taxAmount = Number(item.taxAmount ?? item.tax ?? 0);
                      const baseTotal = unitPrice * quantity;
                      const lineTotal = baseTotal - discount + taxAmount;

                      const rowKey =
                        item.product?._id ?? item._id ?? `${item.product ?? "item"}-${index}`;

                      return (
                        <tr
                          key={rowKey}
                          className="border-b border-border text-slate-900 dark:text-slate-200 last:border-0"
                        >
                          <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                            {item.name || item.product?.name}
                          </td>
                          <td className="px-4 py-3">{quantity}</td>
                          <td className="px-4 py-3">{currencyFormatter.format(unitPrice)}</td>
                          <td className="px-4 py-3">{currencyFormatter.format(discount)}</td>
                          <td className="px-4 py-3">{currencyFormatter.format(taxAmount)}</td>
                          <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                            {currencyFormatter.format(lineTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5 space-y-3 text-sm text-slate-900 dark:text-slate-200">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Totals summary
                  </p>
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {currencyFormatter.format(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total discount</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {currencyFormatter.format(totalDiscount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery charges</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {currencyFormatter.format(deliveryCharges)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Grand total</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {currencyFormatter.format(grandTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Amount paid</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {currencyFormatter.format(amountPaid)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Balance due</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {currencyFormatter.format(balanceDue)}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted p-5 space-y-3 text-sm text-slate-900 dark:text-slate-200">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Payment details
                  </p>
                  <div className="flex items-center justify-between">
                    <span>Method</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {order.paymentStatus ?? "Unknown"}
                    </span>
                  </div>
                  <div className="pt-3 text-sm text-slate-500">
                    Return / refund policy: {returnPolicy}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-slate-400">
                This is a computer-generated invoice.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
