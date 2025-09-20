import React, { useMemo } from "react";
import OrdersToolbar from "../components/orders/OrdersToolbar";
import OrdersTable from "../components/orders/OrdersTable";
import OrdersPagination from "../components/orders/OrdersPagination";
import { ORDERS } from "../components/orders/mockData";
import "../components/orders/orders.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  toggleStatus,
  setPage,
  toggleSortDir,
} from "../store/ordersSlice";

const UserOrder = () => {
  const dispatch = useDispatch();
  const { query, status, page, sortDir } = useSelector((s) => s.orders);
  const filters = { status: new Set(status) };
  const pageSize = 10;

  const onToggleFilter = (_key, value) => dispatch(toggleStatus(value));

  // Derive filtered/sorted rows based on Redux-controlled UI state.
  // This memo recalculates only when query/filters/sortDir change.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = ORDERS.filter((r) => {
      const matchesQuery =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.user.toLowerCase().includes(q) ||
        r.project.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q);
      const matchesStatus =
        filters.status.size === 0 || filters.status.has(r.status);
      return matchesQuery && matchesStatus;
    });
    // Normalize human-friendly dates to sortable timestamps
    const parseDate = (d) => {
      const now = Date.now();
      if (/^just now$/i.test(d)) return now;
      if (/^a minute ago$/i.test(d)) return now - 60 * 1000;
      if (/^1 hour ago$/i.test(d)) return now - 60 * 60 * 1000;
      if (/^yesterday$/i.test(d)) return now - 24 * 60 * 60 * 1000;
      const t = Date.parse(d);
      return Number.isFinite(t) ? t : 0;
    };
    rows.sort((a, b) =>
      sortDir === "desc"
        ? parseDate(b.date) - parseDate(a.date)
        : parseDate(a.date) - parseDate(b.date)
    );
    return rows;
  }, [query, filters, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="orders-card">
      <p>Order List</p>
      {/* Toolbar: search, filter chips, sort toggle */}
      <OrdersToolbar
        query={query}
        onQuery={(v) => {
          dispatch(setQuery(v));
        }}
        filters={filters}
        onToggleFilter={onToggleFilter}
        sortDir={sortDir}
        onToggleDateSort={() => dispatch(toggleSortDir())}
      />
      {/* Data table and pagination */}
      <OrdersTable rows={pageRows} />
      <OrdersPagination
        page={page}
        pages={pages}
        onPage={(p) => dispatch(setPage(p))}
      />
    </div>
  );
};

export default UserOrder;
