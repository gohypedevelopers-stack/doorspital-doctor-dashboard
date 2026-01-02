// src/pages/NewPrescriptionOrders.jsx

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PharmacyLayout, {
  PharmacyMenuToggle,
} from "../components/PharmacyLayout.jsx";
import { apiRequest } from "../../lib/api.js";
import { getPharmacyToken } from "../../lib/pharmacySession.js";
import { useGlobalLoader } from "../../lib/global-loader-context.js";

import bellicon from "../assets/bellicon.png";
import PharmacyProfileBadge from "../components/PharmacyProfileBadge.jsx";

const statusStyles = {
  Pending: "bg-slate-200 text-slate-600 dark:text-white-900",
  Processing: "bg-slate-200 text-slate-600 dark:text-white-900",
  "Ready for Delivery": "bg-slate-200 text-slate-600 dark:text-white-900",
  "Out for Delivery": "bg-slate-200 text-slate-600 dark:text-white-900",
  Delivered: "bg-slate-200 text-slate-600 dark:text-white-900",
  Cancelled: "bg-slate-200 text-slate-600 dark:text-white-900",
};

const friendlyStatusLabels = {
  pending: "Pending",
  processing: "Processing",
  ready_for_delivery: "Ready for Delivery",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const filterStatuses = [
  "pending",
  "processing",
  "ready_for_delivery",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const getStatusKey = (status) =>
  status ? status.toString().toLowerCase() : "pending";

const getStatusLabel = (status) => {
  if (!status) return "Pending";
  const raw = status.toString().toLowerCase();
  return (
    friendlyStatusLabels[raw] ??
    status
      .toString()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
};

function NewPrescriptionOrders() {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const pageSize = 15;
  const token = getPharmacyToken();
  const { showLoader, hideLoader } = useGlobalLoader();

  useEffect(() => {
    if (!token) {
      setOrders([]);
      return;
    }
    let cancelled = false;
    const fetchOrders = async () => {
      showLoader();
      setLoadingOrders(true);
      setErrorMessage("");
      try {
        const response = await apiRequest("/api/pharmacy/orders", { token });
        if (!cancelled) {
          // Response is paginated: { data: { items: [], pagination: {} } }
          const items = response?.data?.items ?? response?.data ?? [];
          setOrders(items);
        }
      } catch (error) {
        console.error("Unable to load pharmacy orders:", error);
        if (!cancelled) {
          setErrorMessage(error.message || "Unable to load orders.");
        }
      } finally {
        if (!cancelled) setLoadingOrders(false);
        hideLoader();
      }
    };
    fetchOrders();
    return () => {
      cancelled = true;
    };
  }, [token, hideLoader, showLoader]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderStatus = getStatusKey(order.status);
      const matchesFilter =
        activeFilter === "all" ? true : orderStatus === activeFilter;
      const patientName = (
        order.shippingAddress?.fullName ??
        order.user?.userName ??
        order.customerName ??
        ""
      )
        .toString()
        .toLowerCase();
      const orderIdLabel = (
        order.prescriptionId ??
        order.orderId ??
        order._id ??
        ""
      )
        .toString()
        .toLowerCase();
      const matchesSearch =
        normalizedSearch === "" ||
        patientName.includes(normalizedSearch) ||
        orderIdLabel.includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [orders, activeFilter, normalizedSearch]);

  const totalFiltered = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + pageSize
  );

  const statusCounts = useMemo(() => {
    return orders.reduce((acc, order) => {
      const key = getStatusKey(order.status);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [orders]);

  const goToPageDelta = (delta) => {
    setCurrentPage((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > totalPages) return totalPages;
      return next;
    });
  };

  return (
    <PharmacyLayout
      mainClassName="flex-1 overflow-y-auto bg-[#f4f8f7] px-4 sm:px-6 lg:px-10 py-7 dark:bg-[#1E293B]"
      header={({ openDrawer }) => (
        <header className="flex items-center justify-between border-b border-border bg-[#707888] px-4 sm:px-6 lg:px-10 py-1">
          <div className="flex items-center gap-3">
            <PharmacyMenuToggle onClick={openDrawer} />
            <h1 className="text-[20px] font-semibold text-slate-100 dark:text-slate-100">
              New Prescription Orders
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <img src={bellicon} alt="Notifications" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe9d6]">
              <PharmacyProfileBadge
                wrapperClassName="h-full w-full overflow-visible"
                imgClassName="rounded-xl"
              />
            </div>
          </div>
        </header>
      )}
    >
      {errorMessage && (
        <div className="mb-6 rounded-xl bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-700">
          {errorMessage}
        </div>
      )}
      {/* Search + Filters (two horizontal rows) */}
      <div className="mb-6 rounded-[32px] bg-card px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] space-y-6">
        {/* Row 1 - Search orders + search bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-4">
          <p className="text-[12px] font-medium text-slate-900 dark:text-slate-100 w-full lg:w-auto">
            Search orders:
          </p>

          <div className="w-full lg:max-w-md">
            <div className="flex items-center gap-3 rounded-2xl bg-[#f7fafc] px-5 py-4 shadow-[0_8px_25px_rgba(15,23,42,0.03)]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-sm">
                <span className="text-slate-400 text-lg">🔍 </span>
              </div>
              <input
                type="text"
                placeholder="Search by patient name or Order ID..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full border-none bg-transparent text-sm text-slate-900  placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Row 2 - Filter by status + chips */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-4">
          <p className="text-[12px] font-medium text-slate-900 dark:text-slate-100 w-full lg:w-auto">
            Filter by status:
          </p>

          <div className="flex flex-wrap justify-start gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={[
                "rounded-full px-4 py-2 text-[12px] font-semibold border transition",
                activeFilter === "all"
                  ? "bg-[#00b074] text-white border-[#00b074]"
                  : "bg-card text-slate-600 border-border hover:bg-muted/60",
              ].join(" ")}
            >
              All ({orders.length})
            </button>

            {filterStatuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={[
                  "rounded-full px-4 py-2 text-[12px] font-semibold border transition",
                  activeFilter === status
                    ? "bg-[#00b074] text-white border-[#00b074]"
                    : "bg-card text-slate-600 border-border hover:bg-muted/60",
                ].join(" ")}
              >
                {getStatusLabel(status)} ({statusCounts[status] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-card shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border bg-[#707888] text-[11px] font-semibold uppercase tracking-wide text-white-700 dark:text-white-100">
                <th className="px-8 py-4">Patient Name</th>
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Medicine Count</th>
                <th className="px-8 py-4">Order Time &amp; Type</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loadingOrders && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-16 text-center text-sm text-slate-500"
                  >
                    Loading orders...
                  </td>
                </tr>
              )}
              {!loadingOrders && paginatedOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-16 text-center text-sm text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
              {!loadingOrders &&
                paginatedOrders.map((order, idx) => {
                  const orderId = order._id ?? order.id ?? idx;
                  const patientName =
                    order.shippingAddress?.fullName ??
                    order.user?.userName ??
                    order.customerName ??
                    "Patient";
                  const prescriptionId =
                    order.prescriptionId ?? order.orderId ?? `ORD-${orderId}`;
                  const medicineCount =
                    order.items?.reduce(
                      (sum, item) => sum + (item.quantity ?? 0),
                      0
                    ) ?? 0;
                  const createdAt = order.createdAt
                    ? new Date(order.createdAt)
                    : null;
                  const timeLabel = createdAt
                    ? `${createdAt.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}, ${order.metadata?.deliveryType ?? "Home Delivery"}`
                    : "-";
                  const statusLabel = getStatusLabel(order.status);
                  const statusClass =
                    statusStyles[statusLabel] || "bg-[#E3E8EF] text-[#475569]";

                  return (
                    <tr
                      key={orderId}
                      className={
                        "text-slate-900 dark:text-slate-200 " +
                        (idx !== paginatedOrders.length - 1
                          ? "border-b border-border"
                          : "")
                      }
                    >
                      <td className="px-8 py-4 text-[13px]">{patientName}</td>
                      <td className="px-8 py-4 text-[13px] text-slate-500">
                        {prescriptionId}
                      </td>
                      <td className="px-8 py-4 text-[13px]">{medicineCount}</td>
                      <td className="px-8 py-4 text-[13px] text-slate-500">
                        {timeLabel}
                      </td>
                      <td className="px-8 py-4">
                        <span
                          className={`inline-flex rounded-xl px-3 py-1 text-[11px] font-semibold ${statusClass}`}
                        >
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <Link
                          to={`/pharmacy/orders/${orderId}`}
                          className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[#00b074] px-2 py-1 text-[8px] shadow-[0_8px_20px_rgba(0,176,116,0.45)] transition hover:bg-[#049662] sm:w-auto sm:px-3 sm:py-1 sm:text-[8px] md:px-3 md:py-1 md:text-sm lg:px-4 lg:py-2.5 lg:text-base"
                        >
                          View Order
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between rounded-b-[32px] border-t border-border px-8 py-4 text-[12px] text-slate-500">
          <span>
            Showing {paginatedOrders.length} of {totalFiltered} results
          </span>
          <div className="flex gap-2">
            <button
              className="rounded-xl border border-border px-5 py-1.5 text-[12px] text-slate-500 hover:bg-muted/60"
              onClick={() => goToPageDelta(-1)}
            >
              Previous
            </button>
            <button
              className="rounded-xl border border-border px-5 py-1.5 text-[12px] text-slate-500 hover:bg-muted/60"
              onClick={() => goToPageDelta(1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </PharmacyLayout>
  );
}

export default NewPrescriptionOrders;
