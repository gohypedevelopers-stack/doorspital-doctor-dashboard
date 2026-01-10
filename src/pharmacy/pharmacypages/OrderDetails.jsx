import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PharmacyLayout, { PharmacyMenuToggle } from "../components/PharmacyLayout.jsx";
import bellicon from "../assets/bellicon.png";
import PharmacyProfileBadge from "../components/PharmacyProfileBadge.jsx";
import { apiRequest } from "../../lib/api.js";
import { getPharmacyToken } from "../../lib/pharmacySession.js";
import { useGlobalLoader } from "../../lib/global-loader-context.js";
import GlobalLoader from "@/GlobalLoader.jsx";


const statusOptions = [
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "ready_for_delivery", label: "Ready for Delivery" },
  { id: "out_for_delivery", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

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

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [error, setError] = useState("");
  const token = getPharmacyToken();
  const { showLoader, hideLoader } = useGlobalLoader();

  useEffect(() => {
    if (!token || !orderId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const fetchOrder = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiRequest(`/api/pharmacy/orders/${orderId}`, {
          token,
        });
        if (cancelled) return;
        setOrder(response?.data ?? null);
      } catch (err) {
        console.error("Failed to load order:", err);
        if (!cancelled) setError(err.message || "Unable to load order");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchOrder();
    return () => {
      cancelled = true;
    };
  }, [token, orderId]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    if (!orderId || !token) return;
    setStatusUpdating(true);
    showLoader();
    try {
      await apiRequest(`/api/pharmacy/orders/${orderId}/status`, {
        method: "PATCH",
        token,
        body: { status: newStatus },
      });
      setOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      console.error("Failed to update status:", err);
      setError(err.message || "Unable to update status");
    } finally {
      setStatusUpdating(false);
      hideLoader();
    }
  };

  const getSubtotal = () => {
    return order?.items?.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  if (loading) {
        return <GlobalLoader fullPage />;
    }

  if (!order) {
    return (
      <PharmacyLayout
        outerClassName="min-h-screen bg-[#1E293B] text-slate-900 dark:text-slate-100"
        mainClassName="flex-1 flex items-center justify-center px-4 py-12"
        header={({ openDrawer }) => (
          <header className="flex items-center justify-between border-b border-border bg-[#020817] px-4 sm:px-6 lg:px-10 py-1">
            <div className="flex items-center gap-3">
              <PharmacyMenuToggle onClick={openDrawer} />
              <h1 className="text-[20px] font-semibold text-slate-100 dark:text-slate-100">
                Order not found
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
        <div className="space-y-3 text-center">
          <p className="text-slate-500">Order not found.</p>
          <button
            onClick={() => navigate("/pharmacy/orders")}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-100"
          >
            <h1>Back to orders</h1>
          </button>
        </div>
      </PharmacyLayout>
    );
  }

  const orderTimestamp = order.createdAt ?? order.orderDate;
  const orderDateLabel = formatDateString(orderTimestamp);
  const orderTimeLabel = formatTimeString(orderTimestamp);
  const customerName =
    order.shippingAddress?.fullName ??
    order.user?.userName ??
    order.customerName ??
    "Customer";
  const customerPhone =
    order.shippingAddress?.phone ??
    order.user?.phone ??
    order.customerPhone ??
    "Not provided";
  const customerEmail =
    order.user?.email ??
    order.shippingAddress?.email ??
    "No email provided";
  const customerId =
    order.user?._id ??
    order.user?.id ??
    order.user?.userId ??
    order.customerId ??
    order.user?.customerId;
  const orderNotes =
    order.customerNote ??
    order.notes ??
    order.specialInstructions ??
    "No additional notes provided.";
  const paymentMethodLabel = order.paymentMethod?.toUpperCase() ?? "COD";
  const totalAmount = order.total ?? getSubtotal();

  return (
    <PharmacyLayout
      outerClassName="min-h-screen bg-[#1E293B] text-slate-900 dark:text-slate-100"
      mainClassName="flex-1 bg-[#1E293B] px-4 sm:px-6 lg:px-10 py-7"
      header={({ openDrawer }) => (
        <header className="flex items-center justify-between border-b border-border bg-card px-4 sm:px-6 lg:px-10 py-5">
          <div className="flex items-center gap-3">
            <PharmacyMenuToggle onClick={openDrawer} />
            <h1 className="text-[18px] font-semibold text-slate-900 dark:text-slate-100">
              Order #{orderId}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/pharmacy/orders/${orderId}/invoice`}
              className="rounded-2xl border border-emerald-200 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 transition hover:border-emerald-400 hover:bg-emerald-50"
            >
              Invoice
            </Link>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <img src={bellicon} alt="Notifications" />
            </button>
          </div>
        </header>
      )}
    >
            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
                {error}
              </div>
            )}

            <div className="rounded-xl bg-card p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-border space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[13px] text-slate-500">Customer</p>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{customerName}</p>
                  <p className="text-xs text-slate-400">
                    Order ref: {order.prescriptionId ?? order.orderId ?? order._id ?? orderId}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-sm text-slate-500">Status:</div>
                  <select
                    value={order.status || "pending"}
                    onChange={handleStatusChange}
                    disabled={statusUpdating}
                    className="rounded-xl border border-border bg-muted px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-500">
                    {statusUpdating ? "Updating..." : "Drag to change status"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-xs uppercase tracking-wide text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Date</span>
                  <span className="text-slate-900 dark:text-slate-100 lowercase font-semibold">{orderDateLabel}</span>
                  
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Time</span>
                  <span className="text-slate-900 dark:text-slate-100 lowercase font-semibold">{orderTimeLabel}</span>
                  
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <p className="text-[16px] font-semibold uppercase tracking-wide text-slate-500 text-center">
                    Order log
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Date</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{orderDateLabel}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Time</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{orderTimeLabel}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px] uppercase tracking-wide text-slate-500">Order ID</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-right">
                        {order.prescriptionId ?? order.orderId ?? order._id ?? orderId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted p-4">
                  <p className="text-[16px] font-semibold uppercase tracking-wide text-slate-500 text-center">
                    Customer info
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="text-slate-900 dark:text-slate-100 font-semibold">{customerName}</p>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">Phone</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{customerPhone}</p>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">Email</p>
                    <p className="text-sm text-slate-900 dark:text-slate-200">{customerEmail}</p>
                    {customerId && (
                      <>
                        <p className="text-[11px] uppercase tracking-wide text-slate-400">
                          Customer ID
                        </p>
                        <p className="text-sm text-slate-900 dark:text-slate-200">{customerId}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted p-4">
                  <p className="text-[16px] font-semibold uppercase tracking-wide text-slate-500 text-center">
                    Payment
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{paymentMethodLabel}</p>
                   <p className="text-slate-600">
  Payment Status:{" "}
  <span className="font-semibold text-white-900 dark:text-slate-100">
    {order.paymentStatus ?? "Pending"}
  </span>
</p>
                    <p className="text-slate-600">
                      Subtotal: 
                        <span className="font-semibold text-white-900 dark:text-slate-100">
{currencyFormatter.format(getSubtotal())}
</span>
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Total {currencyFormatter.format(totalAmount)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <p className="text-[16px] font-semibold uppercase tracking-wide text-slate-500 text-center">
                    Delivery address
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-slate-800">
                    <p className="text-slate-400">
                      {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}
                    </p>
                    <p className="text-slate-400">
                      {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                    </p>
                    {order.shippingAddress?.phone && (
                      <p className="text-slate-400">Phone: {order.shippingAddress?.phone}</p>
                    )}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <p className="text-[16px] font-semibold uppercase tracking-wide text-slate-500 text-center">
                    Delivery notes
                  </p>
                  <p className="mt-3 text-sm text-slate-900 dark:text-slate-200">{orderNotes}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-card shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-border mt-6">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-border bg-[#fbfcff] text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-6 py-4">Medicine</th>
                      <th className="px-6 py-4">Qty</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Sub-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).map((item) => (
                      <tr key={item.product?._id ?? item.product}>
                        <td className="px-6 py-3 text-slate-900 dark:text-slate-200">
                          {item.name || item.product?.name}
                        </td>
                        <td className="px-6 py-3">{item.quantity}</td>
                        <td className="px-6 py-3">{currencyFormatter.format(item.price)}</td>
                        <td className="px-6 py-3">
                          {currencyFormatter.format((item.price || 0) * (item.quantity || 0))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end border-t border-border p-6 text-sm">
                <div className="space-y-2 text-right">
                  <p className="text-slate-500">Subtotal: {currencyFormatter.format(getSubtotal())}</p>
                  <p className="text-slate-900 dark:text-slate-100 font-semibold">Total: {currencyFormatter.format(order.total ?? 0)}</p>
                </div>
              </div>
            </div>
    </PharmacyLayout>
  );
}


