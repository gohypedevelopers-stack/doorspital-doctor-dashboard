import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import bellicon from "../assets/bellicon.png";
import { apiRequest } from "../../lib/api.js";
import { getPharmacySession, getPharmacyToken } from "../../lib/pharmacySession.js";


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
const createDownloadContent = (innerHtml) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice</title>
        <style>
          body {
            background: white;
            font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
              sans-serif;
            color: #0f172a;
            padding: 48px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            padding: 8px 6px;
            border: 1px solid #e2e8f0;
          }
          h1,
          h2,
          h3,
          h4,
          p {
            margin: 0;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        ${innerHtml}
      </body>
    </html>
  `;
};

export default function InvoicePage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const token = getPharmacyToken();
  const session = getPharmacySession();
  const [order, setOrder] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleDownload = () => {
    if (!invoiceRef.current || !order) return;
    const invoiceNumber = order?.invoiceNumber ?? order?.orderId ?? order?._id ?? orderId;
     const html = createDownloadContent(invoiceRef.current.outerHTML);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `invoice-${invoiceNumber}.html`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6fafb] text-slate-900">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-slate-600">Preparing invoice...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f6fafb] text-slate-900">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-1 items-center justify-center">
            <div className="space-y-3 text-center">
              <p className="text-slate-500">Invoice not available.</p>
              <button
                onClick={() => navigate("/pharmacy/orders")}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Back to orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const customerName =
    order.shippingAddress?.fullName ??
    order.user?.userName ??
    order.customerName ??
    "Customer";
  const customerAddressBilling =
    order.billingAddress ?? order.shippingAddress ?? null;
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
  const totalDiscount =
    order.totalDiscount ?? order.discount ?? order.discountAmount ?? 0;
  const deliveryCharges =
    order.deliveryCharges ?? order.shippingCharges ?? order.shippingCost ?? 0;
  const grandTotal = order.total ?? subtotal - totalDiscount + deliveryCharges;
  const amountPaid =
    order.amountPaid ?? order.paidAmount ?? order.totalPaid ?? grandTotal;
  const balanceDue = Math.max(grandTotal - amountPaid, 0);

  const paymentMethod = (order.paymentMethod ?? "COD").toUpperCase();

  const returnPolicy =
    order.returnPolicy ??
    "Returns/refunds must be raised within 7 days with original invoice and packaging.";

  return (
    <div className="min-h-screen bg-[#f6fafb] text-slate-900">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-100 bg-white px-10 py-5">
            <div>
              <p className="text-[13px] text-slate-500">Invoice overview</p>
              <h1 className="text-[18px] font-semibold text-slate-900">
                Invoice #{invoiceNumber}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDownload}
                disabled={!order}
                className="relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(16,185,129,0.45)] transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Download invoice
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

            <div
              ref={invoiceRef}
              data-invoice-root
              className="mx-auto w-full max-w-5xl space-y-6 rounded-[32px] bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.07)] border border-slate-100"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Seller details
                  </p>
                  <p className="text-lg font-semibold text-slate-900">{sellerName}</p>
                  <p className="text-sm text-slate-600">{sellerAddress}</p>
                  <p className="text-sm text-slate-600">Phone: {sellerPhone}</p>
                  <p className="text-sm text-slate-600">Email: {sellerEmail}</p>
                  <p className="text-sm text-slate-600">Website: {sellerWebsite}</p>
                  <p className="text-sm text-slate-600">GST: {gstNumber}</p>
                </div>
                <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Invoice Date</span>
                    <span className="font-semibold text-slate-900">{invoiceDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Invoice Time</span>
                    <span className="font-semibold text-slate-900">{invoiceTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Order Number</span>
                    <span className="font-semibold text-slate-900">{order.orderId ?? order._id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Payment Status</span>
                    <span className="font-semibold text-slate-900">
                      {order.paymentStatus ?? "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Customer details
                </p>
                <div className="grid gap-4 pt-4 text-sm text-slate-700 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Customer name
                    </p>
                    <p className="text-base font-semibold text-slate-900">{customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Phone
                    </p>
                    <p className="text-sm text-slate-900">{customerPhone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Billing address
                    </p>
                    <p className="text-sm text-slate-900">
                      {formatAddress(customerAddressBilling)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Shipping address
                    </p>
                    <p className="text-sm text-slate-900">
                      {formatAddress(customerAddressShipping)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Email
                    </p>
                    <p className="text-sm text-slate-900">{customerEmail}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#f1f5f9] text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
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
                      item.product?._id ??
                      item._id ??
                      `${item.product ?? "item"}-${index}`;
                    return (
                      <tr
                        key={rowKey}
                        className="border-b border-slate-100 text-slate-700 last:border-0"
                      >
                        <td className="px-4 py-3 font-semibold text-slate-900">
                            {item.name || item.product?.name}
                          </td>
                          <td className="px-4 py-3">{quantity}</td>
                          <td className="px-4 py-3">{currencyFormatter.format(unitPrice)}</td>
                          <td className="px-4 py-3">{currencyFormatter.format(discount)}</td>
                          <td className="px-4 py-3">{currencyFormatter.format(taxAmount)}</td>
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {currencyFormatter.format(lineTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-3 text-sm text-slate-700">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Totals summary
                  </p>
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      {currencyFormatter.format(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total discount</span>
                    <span className="font-semibold text-slate-900">
                      {currencyFormatter.format(totalDiscount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery charges</span>
                    <span className="font-semibold text-slate-900">
                      {currencyFormatter.format(deliveryCharges)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="font-semibold text-slate-900">Grand total</span>
                    <span className="text-lg font-bold text-slate-900">
                      {currencyFormatter.format(grandTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Amount paid</span>
                    <span className="font-semibold text-slate-900">
                      {currencyFormatter.format(amountPaid)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Balance due</span>
                    <span className="font-semibold text-slate-900">
                      {currencyFormatter.format(balanceDue)}
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-3 text-sm text-slate-700">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Payment details
                  </p>
                  <div className="flex items-center justify-between">
                    <span>Method</span>
                    <span className="font-semibold text-slate-900">{paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <span className="font-semibold text-slate-900">
                      {order.paymentStatus ?? "Unknown"}
                    </span>
                  </div>
                  <div className="pt-3 text-sm text-slate-500">
                    Return / refund policy: {returnPolicy}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
